import fs from 'fs';
import jsdom from 'jsdom';
import fetch from 'node-fetch';
import { Languages } from 'pokelab';
import { getVariantId, getVariantName } from '../src/app/utils/pokemon';

import { getMoves } from '../src/constants/moves/moves-list';
import { getMoveName } from '../src/constants/moves/moves-names';
import { getPokemonList } from '../src/constants/pokemon/pokemon-list';

const SCRAP_URL = 'https://rankedboost.com/pokemon-lets-go/:pokemon-slug:/';
const ELEMENT_TO_SCRAP = 'RizzyTheGod';
const OUTPUT_MAP_FILE = './src/constants/pokemon/pokemon-moves-relations.ts';
const ROUNDS = 16;
const TIMEOUT = 0.1; // Minutes

const pokemonList = getPokemonList().map(pokemon => {
  const { name, nationalNumber, isAlolan, isMega, variant } = pokemon;

  return {
    id: getVariantId({
      id: nationalNumber,
      isAlolan,
      isMega,
      variant: 'megaVariant' in pokemon ? pokemon.megaVariant : variant,
    }),
    name: getVariantName({ name, isAlolan, isMega, variant: 'megaVariant' in pokemon ? pokemon.megaVariant : variant }),
  };
});

const moves = getMoves().map(({ id }) => ({
  id,
  name: getMoveName(id, Languages.All.findIndex(l => l === Languages.English)),
}));

// WRITE TS FILE
const relationsList: string[] = [];
const addLineToRelationsListTs = (pokemonId: string, learnableMoves: Array<{ id: string; level: number | void }>) => {
  const lines = [
    '  {',
    `    moves: [${learnableMoves.map(m => JSON.stringify(m)).join(', ')}],`,
    `    pokemon: '${pokemonId}',`,
    '  },',
  ];

  relationsList.push(lines.join('\n'));
};

const generatePokemonMovesTs = () => {
  const beginning = [
    "import { IPokemonMovesRelation } from '../../app/modules/pokedex/pokedex.models';",
    '',
    'const relations: IPokemonMovesRelation[] = [',
  ];
  const ending = ['];', '', 'export const getPokemonMovesRelation = () => relations;', ''];

  const content = [beginning.join('\n'), relationsList.join('\n'), ending.join('\n')].join('\n');
  fs.writeFileSync(OUTPUT_MAP_FILE, content);
};

const parseRow = (row: Element) => {
  const level = row.children[0].innerHTML;

  return {
    level: /TM/.test(level) ? undefined : Number(level),
    name: row.children[1].innerHTML,
  };
};

const parseTable = (table: Element) =>
  Array.from(table.children[0].children)
    .slice(1)
    .map(parseRow);

const getSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/\ /g, '-')
    .replace("'", '')
    .replace('♀', 'F')
    .replace('♂', 'M');

const downloadMovesRelations = () => {
  const timers = [];

  const generateTimer = (index: number) =>
    new Promise(resolveTimer => {
      setTimeout(() => {
        const timerNo = index + 1;
        const idx = timerNo - 1;
        const downloads: Array<Promise<void>> = [];

        const portion = Math.round(pokemonList.length / ROUNDS);
        const start = portion * idx;
        const end = start + portion;

        const arrayPortion = pokemonList.slice(start, end);

        arrayPortion.forEach(selectedPokemon => {
          const rawSlug = getSlug(selectedPokemon.name);
          const slug = /alolan/.test(rawSlug) ? `alolan-${rawSlug.replace('-alolan', '')}` : rawSlug;

          const url = SCRAP_URL.replace(':pokemon-slug:', slug);

          // tslint:disable:no-console
          console.log(`Fetching ${url}`);

          downloads.push(
            fetch(url)
              .then(res => res.text())
              .then(body => {
                const dom = new jsdom.JSDOM(body);
                const document = dom.window.document;

                const tables = Array.from(document.getElementsByClassName(ELEMENT_TO_SCRAP));
                const rawMoves = tables.slice(tables.length - 2)[0];
                const rawTms = tables.slice(tables.length - 2)[1];

                const parsedMoves = parseTable(rawMoves);
                const parsedTms = parseTable(rawTms);
                const learnableMoves = [...parsedMoves, ...parsedTms]
                  .map(move => {
                    const selectedMove = moves.find(m => m.name === move.name);

                    return selectedMove
                      ? {
                          id: selectedMove.id,
                          level: move.level,
                        }
                      : undefined;
                  })
                  .filter(m => typeof m !== 'undefined') as Array<{ id: string; level: number | void }>;

                addLineToRelationsListTs(selectedPokemon.id, learnableMoves);
              })
              .catch(error => {
                // tslint:disable:no-console
                console.log('New error', url, error);
              })
          );
        });

        Promise.all(downloads).then(() => {
          resolveTimer();
        });
      }, TIMEOUT * 1000 * 60 * index);
    });

  for (let x = 0; x < ROUNDS; x++) {
    timers.push(generateTimer(x));
  }

  Promise.all(timers).then(() => {
    // tslint:disable:no-console
    console.log('All timers have been completed');

    generatePokemonMovesTs();
    // tslint:disable:no-console
    console.log('File has been generated: ', OUTPUT_MAP_FILE);
  });
};

downloadMovesRelations();
