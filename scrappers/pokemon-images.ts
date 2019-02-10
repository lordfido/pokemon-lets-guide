import fs from 'fs';
import request from 'request';
import { getVariantId } from '../src/app/utils/pokemon';
import { getPokemonList } from '../src/constants/pokemon/pokemon-list';

// CONSTANTS
const SHOULD_DOWNLOAD_IMAGES = false;
const SCRAP_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
const IMAGES_DOWNLOAD_PATH = '/src/assets/images/pokemon-images/';
const OUTPUT_MAP_FILE = './src/constants/pokemon/pokemon-images.ts';
const ROUNDS = 16;
const TIMEOUT = 0.1; // Minutes

const pokemonList: Array<{
  fileName: string;
  id: string;
}> = [];

// Get map between IDs and fileNames
getPokemonList().forEach(pokemon => {
  const { isAlolan, isMega, nationalNumber, variant } = pokemon;

  const id = getVariantId({
    id: nationalNumber,
    isAlolan,
    isMega,
    variant: 'megaVariant' in pokemon ? pokemon.megaVariant : variant,
  });

  pokemonList.push({
    fileName: id.concat('.png'),
    id,
  });
});

// WRITE TS FILE
const pokemonSpritesMap: string[] = [];
const addLineToTs = (id: string, fileName: string) => {
  pokemonSpritesMap.push(`  '${id}': isDev() ? '${SCRAP_URL}${fileName}' : '${IMAGES_DOWNLOAD_PATH}${fileName}',`);
};

const generateImagesMapTs = () => {
  const beginning = [
    "import { IPokemon, IPokemonWithBaseCP } from '../../app/modules/pokedex/pokedex.models';",
    "import { isDev } from '../../common/utils/platforms';",
    '',
    'const pokemonImages: { [key: string]: string } = {',
  ];
  const ending = [
    '};',
    '',
    "export const getPokemonImage = ({ id }: IPokemon | IPokemonWithBaseCP) => pokemonImages[id] || '';",
    '',
  ];

  const content = [beginning.join('\n'), pokemonSpritesMap.sort().join('\n'), ending.join('\n')].join('\n');
  fs.writeFileSync(OUTPUT_MAP_FILE, content);
};

// DOWNLOAD IMAGES
const download = (url: string, fileName: string, callback: () => void) =>
  SHOULD_DOWNLOAD_IMAGES
    ? request.head(url, () =>
        request(url)
          .pipe(fs.createWriteStream(fileName))
          .on('close', callback)
      )
    : callback();

const downloadImages = () => {
  const timers = [];

  // tslint:disable:no-console
  console.log('Starting script');

  const generateTimer = (index: number) =>
    new Promise(resolveTimer => {
      // tslint:disable:no-console
      console.log(`Setting timer #${index + 1}`);

      setTimeout(
        () => {
          const timerNo = index + 1;
          const idx = timerNo - 1;
          const downloads: Array<Promise<string>> = [];

          const portion = Math.round(pokemonList.length / ROUNDS);
          const start = portion * idx;
          const end = start + portion;

          // tslint:disable:no-console
          console.log(`Executting timer #${timerNo}, starts at <${start}>, finish at <${end}>`);
          const arrayPortion = pokemonList.slice(start, end);

          arrayPortion.forEach(selectedPokemon => {
            const image = SCRAP_URL.concat(selectedPokemon.fileName);

            downloads.push(
              new Promise(resolveDownload => {
                download(image, IMAGES_DOWNLOAD_PATH + selectedPokemon.fileName, () => {
                  // tslint:disable:no-console
                  console.log('Image downloaded: ', selectedPokemon.fileName);

                  addLineToTs(selectedPokemon.id, selectedPokemon.fileName);
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

downloadImages();
