// @ts-ignore
const fetch = require('node-fetch');
const fs = require('fs');
const jsdom = require('jsdom');
const request = require('request');
const Pokelab = require('pokelab');
const pokeUtils = require('./utils.js');

// CONSTANTS
const SHOULD_DOWNLOAD_SPRITES = false;
const SCRAP_URL = 'https://rankedboost.com/pokemon-lets-go/pokedex/';
const ELEMENT_TO_SCRAP = 'table.table-best-pokemon-pq';
const IMAGES_DOWNLOAD_PATH = './src/assets/images/pokemon-sprites/';
const OUTPUT_MAP_FILE = './src/constants/pokemon/pokemon-sprites.ts';
const pokemonList = [];

// Get map between IDs and fileNames
Pokelab.Pokedex.All.filter(pokemon => !pokemon.variant || /Partner/.test(pokemon.variant) < 0).forEach(pokemon => {
  pokemonList.push({
    id: pokeUtils.getVariantId({
      ...pokemon,
      variant: pokemon.variant || pokemon.megaVariant,
      id: pokeUtils.getPaddedId(pokemon.nationalNumber),
    }),
    fileName: pokeUtils
      .getVariantName({
        ...pokemon,
        variant: pokemon.variant || pokemon.megaVariant,
      })
      .toLowerCase()
      .replace(/\ /g, '-')
      .replace("'", '')
      .replace('.', '')
      .replace('♂', 'm')
      .replace('♀', 'f')
      .concat('.png'),
  });
});

// WRITE TS FILE
const pokemonSpritesMap = [];
const addLineToTs = ({ id, fileName }) => {
  pokemonSpritesMap.push(`  '${id}': require('${IMAGES_DOWNLOAD_PATH.replace('./src', '../..')}${fileName}'),`);
};

const generateJson = () => {
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
const download = (url, fileName, callback) =>
  SHOULD_DOWNLOAD_SPRITES
    ? request.head(url, () =>
        request(url)
          .pipe(fs.createWriteStream(fileName))
          .on('close', callback)
      )
    : callback();

const parseFileName = url => {
  const urlParts = url.split('/');
  const rawFileName = urlParts[urlParts.length - 1];
  const fileName = rawFileName.toLowerCase().replace('pokemon-lets-go-', '');

  return fileName;
};

const downloadImages = array => {
  const downloads = [];

  array.forEach(image => {
    const fileName = parseFileName(image);

    downloads.push(
      new Promise(resolve => {
        download(image, IMAGES_DOWNLOAD_PATH + fileName, () => {
          console.log('Image downloaded: ', fileName);

          const selectedPokemon = pokemonList.find(pokemon => pokemon.fileName === fileName);
          if (typeof selectedPokemon !== 'undefined') {
            addLineToTs(selectedPokemon);
          }

          resolve(fileName);
        });
      })
    );
  });

  Promise.all(downloads).then(() => {
    console.log('All images have been downloaded');
    generateJson();

    console.log('File has been generated: ', OUTPUT_MAP_FILE);
  });
};

// PARSE TABLE
const getSprite = td => td.firstElementChild.firstElementChild.src;

const parseRow = row => getSprite(row.firstElementChild);

const parseTable = table =>
  Array.from(table.children[2].children)
    // .splice(0, 24)
    .map(parseRow);

fetch(SCRAP_URL)
  .then(res => res.text())
  .then(body => {
    const dom = new jsdom.JSDOM(body);
    const document = dom.window.document;

    const table = document.querySelector(ELEMENT_TO_SCRAP);
    const images = parseTable(table);
    downloadImages(images);
  })
  .catch(error => {
    throw Error(error);
  });
