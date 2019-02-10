// @ts-ignore
import fs from 'fs';
import jsdom from 'jsdom';
import fetch from 'node-fetch';
import request from 'request';
import { getVariantId, getVariantName } from '../src/app/utils/pokemon';

import { getPokemonList } from '../src/constants/pokemon/pokemon-list';

// CONSTANTS
const SHOULD_DOWNLOAD_SPRITES = false;
const SCRAP_URL = 'https://rankedboost.com/pokemon-lets-go/pokedex/';
const ELEMENT_TO_SCRAP = 'table.table-best-pokemon-pq';
const IMAGES_DOWNLOAD_PATH = './src/assets/images/pokemon-sprites/';
const OUTPUT_MAP_FILE = './src/constants/pokemon/pokemon-sprites.ts';

const pokemonList: Array<{
  fileName: string;
  id: string;
}> = [];

// Get map between IDs and fileNames
getPokemonList().forEach(pokemon => {
  const { isAlolan, isMega, name, nationalNumber, variant } = pokemon;

  const fileName = getVariantName({
    isAlolan,
    isMega,
    name,
    variant: 'megaVariant' in pokemon ? pokemon.megaVariant : variant,
  })
    .toLowerCase()
    .replace(/\ /g, '-')
    .replace("'", '')
    .replace('.', '')
    .replace('♂', 'm')
    .replace('♀', 'f')
    .concat('.png');

  const id = getVariantId({
    id: nationalNumber,
    isAlolan,
    isMega,
    variant: 'megaVariant' in pokemon ? pokemon.megaVariant : variant,
  });

  // tslint:disable:no-console
  console.log(`Adding URL for <${id}|${fileName}>`);

  pokemonList.push({
    fileName: /-alolan/.test(fileName) ? `alolan-${fileName.replace('-alolan', '')}` : fileName,
    id,
  });
});

// WRITE TS FILE
const pokemonSpritesMap: string[] = [];
const addLineToTs = (id: string, fileName: string) => {
  pokemonSpritesMap.push(`  '${id}': require('${IMAGES_DOWNLOAD_PATH.replace('./src', '../..')}${fileName}'),`);
};

const generateImageSpritesMapsTs = () => {
  const beginning = [
    "import { IPokemonWithBaseCP } from '../../app/modules/pokedex/pokedex.models';",
    '',
    'const pokemonSprites: { [key: string]: string } = {',
  ];
  const ending = [
    '};',
    '',
    "export const getPokemonSprite = ({ id }: IPokemonWithBaseCP) => pokemonSprites[id] || '';",
    '',
  ];

  const content = [beginning.join('\n'), pokemonSpritesMap.sort().join('\n'), ending.join('\n')].join('\n');
  fs.writeFileSync(OUTPUT_MAP_FILE, content);
};

// DOWNLOAD IMAGES
const download = (url: string, fileName: string, callback: () => void) =>
  SHOULD_DOWNLOAD_SPRITES
    ? request.head(url, () =>
        request(url)
          .pipe(fs.createWriteStream(fileName))
          .on('close', callback)
      )
    : callback();

const parseFileName = (url: string) => {
  const urlParts = url.split('/');
  const rawFileName = urlParts[urlParts.length - 1];
  const fileName = rawFileName.toLowerCase().replace('pokemon-lets-go-', '');

  return fileName;
};

const downloadImages = (array: string[]) => {
  const downloads: Array<Promise<string>> = [];

  array.forEach(image => {
    const fileName = parseFileName(image);

    downloads.push(
      new Promise(resolve => {
        download(image, IMAGES_DOWNLOAD_PATH + fileName, () => {
          // tslint:disable:no-console
          console.log('Image downloaded: ', fileName);

          const selectedPokemon = pokemonList.find(pokemon => pokemon.fileName === fileName);
          if (typeof selectedPokemon !== 'undefined') {
            addLineToTs(selectedPokemon.id, selectedPokemon.fileName);
          }

          resolve(fileName);
        });
      })
    );
  });

  Promise.all(downloads).then(() => {
    // tslint:disable:no-console
    console.log('All images have been downloaded');
    generateImageSpritesMapsTs();

    // tslint:disable:no-console
    console.log('File has been generated: ', OUTPUT_MAP_FILE);
  });
};

// PARSE TABLE
const getSprite = (td: Element) => {
  if (td.firstElementChild && td.firstElementChild.firstElementChild) {
    const elem = td.firstElementChild.firstElementChild as HTMLImageElement;
    return elem.src;
  }

  return undefined;
};

const parseRow = (row: Element) => (row.firstElementChild ? getSprite(row.firstElementChild) : undefined);

const parseTable = (table: Element) => Array.from(table.children[2].children).map(parseRow);

fetch(SCRAP_URL)
  .then(res => res.text())
  .then(body => {
    const dom = new jsdom.JSDOM(body);
    const document = dom.window.document;

    const table = document.querySelector(ELEMENT_TO_SCRAP);
    const images = table ? (parseTable(table).filter(img => !!img) as string[]) : [];
    downloadImages(images);
  })
  .catch(error => {
    throw Error(error);
  });
