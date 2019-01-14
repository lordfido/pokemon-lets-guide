// @ts-ignore
const fetch = require('node-fetch');
const fs = require('fs');
const jsdom = require('jsdom');
const request = require('request');
const Pokelab = require('pokelab');
const pokeUtils = require('./utils.js');

// CONSTANTS
const URL = 'https://rankedboost.com/pokemon-lets-go/pokedex/';
const IDENTIFIER = 'table.table-best-pokemon-pq';
const imagesPath = './src/assets/images/pokemon-sprites/';
const tsPathName = './src/constants/pokemon/pokemon-sprites-2.ts';
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
      .replace('♂', 'm')
      .replace('♀', 'f')
      .concat('.png'),
  });
});

// WRITE TS FILE
const tsInitContent =
  "import { IPokemonWithBaseCP } from '../../app/modules/pokedex/pokedex.models';const pokemonSprites: { [key: string]: string } = {";
const tsFinalContent = "};export const getPokemonSprite = ({ id }: IPokemonWithBaseCP) => pokemonSprites[id] || '';";

const pokemonSpritesMap = [];
const addLineToTs = ({ id, fileName }) => {
  pokemonSpritesMap.push(`'${id}': require('${imagesPath.replace('./src', '../..')}${fileName}')`);
};

const generateJson = () => {
  const parsedMap = pokemonSpritesMap.sort().toString();
  const content = tsInitContent + parsedMap + tsFinalContent;
  fs.writeFileSync(tsPathName, content);
};

// DOWNLOAD IMAGES
const download = (url, fileName, callback) =>
  request.head(url, () =>
    request(url)
      .pipe(fs.createWriteStream(fileName))
      .on('close', callback)
  );

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
        download(image, imagesPath + fileName, () => {
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

    console.log('File has been generated: ', tsPathName);
  });
};

// PARSE TABLE
const getSprite = td => td.firstElementChild.firstElementChild.src;

const parseRow = row => getSprite(row.firstElementChild);

const parseTable = table =>
  Array.from(table.children[2].children)
    // .splice(0, 24)
    .map(parseRow);

fetch(URL)
  .then(res => res.text())
  .then(body => {
    const dom = new jsdom.JSDOM(body);
    const document = dom.window.document;

    const table = document.querySelector(IDENTIFIER);
    const images = parseTable(table);
    downloadImages(images);
  })
  .catch(error => {
    throw Error(error);
  });
