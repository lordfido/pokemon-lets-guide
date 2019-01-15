// @ts-ignore
const fetch = require('node-fetch');
const fs = require('fs');
const jsdom = require('jsdom');
const request = require('request');
const Pokelab = require('pokelab');
const pokeUtils = require('./utils.js');

// CONSTANTS
const SHOULD_DOWNLOAD_IMAGES = false;
const SCRAP_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
const IMAGES_DOWNLOAD_PATH = './src/assets/images/pokemon-images/';
const OUTPUT_MAP_FILE = './src/constants/pokemon/pokemon-images.ts';
const pokemonList = [];
const ROUNDS = 16;
const TIMEOUT = 1.5; // Minutes

// Get map between IDs and fileNames
Pokelab.Pokedex.All.filter(pokemon => !pokemon.variant || /Partner/.test(pokemon.variant) < 0).forEach(pokemon => {
  const id = pokeUtils.getVariantId({
    ...pokemon,
    variant: pokemon.variant || pokemon.megaVariant,
    id: pokeUtils.getPaddedId(pokemon.nationalNumber),
  });

  pokemonList.push({
    id,
    fileName: id.concat('.png'),
  });
});

// WRITE TS FILE
const pokemonSpritesMap = [];
const addLineToTs = ({ id, fileName }) => {
  pokemonSpritesMap.push(`  '${id}': require('${IMAGES_DOWNLOAD_PATH.replace('./src', '../..')}${fileName}'),`);
};

const generateImagesMapTs = () => {
  const beginning = [
    "import { IPokemonWithBaseCP } from '../../app/modules/pokedex/pokedex.models';",
    '',
    'const pokemonImages: { [key: string]: string } = {',
  ];
  const ending = [
    '};',
    '',
    'export const getPokemonImage = ({ id }: IPokemonWithBaseCP): string | void => pokemonImages[id];',
    '',
  ];

  const content = [beginning.join('\n'), pokemonSpritesMap.sort().join('\n'), ending.join('\n')].join('\n');
  fs.writeFileSync(OUTPUT_MAP_FILE, content);
};

// DOWNLOAD IMAGES
const download = (url, fileName, callback) =>
  SHOULD_DOWNLOAD_IMAGES
    ? request.head(url, () =>
        request(url)
          .pipe(fs.createWriteStream(fileName))
          .on('close', callback)
      )
    : callback();

const downloadImages = pokemonList => {
  const timers = [];

  console.log('Starting script');

  const generateTimer = index =>
    new Promise(resolveTimer => {
      console.log(`Setting timer #${index + 1}`);

      setTimeout(
        () => {
          const timerNo = index + 1;
          const idx = timerNo - 1;
          const downloads = [];

          const portion = parseInt(pokemonList.length / ROUNDS, 10);
          const start = portion * idx;
          const end = start + portion;

          console.log(`Executting timer #${timerNo}, starts at <${start}>, finish at <${end}>`);
          const arrayPortion = pokemonList.slice(start, end);

          arrayPortion.forEach(selectedPokemon => {
            const image = SCRAP_URL.concat(selectedPokemon.fileName);

            downloads.push(
              new Promise(resolveDownload => {
                download(image, IMAGES_DOWNLOAD_PATH + selectedPokemon.fileName, () => {
                  console.log('Image downloaded: ', selectedPokemon.fileName);

                  addLineToTs(selectedPokemon);
                  resolveDownload(selectedPokemon.fileName);
                });
              })
            );
          });

          Promise.all(downloads).then(() => {
            console.log(`Timer #${index + 1} completed!`);
            resolveTimer();
          });
        },
        SHOULD_DOWNLOAD_IMAGES ? TIMEOUT * 1000 * 60 * index : 0
      );
    });

  for (let x = 0; x < ROUNDS; x++) {
    timers.push(generateTimer(x));
  }

  Promise.all(timers).then(() => {
    console.log('All timers have been completed');

    generateImagesMapTs();
    console.log('File has been generated: ', OUTPUT_MAP_FILE);
  });
};

downloadImages(pokemonList);
