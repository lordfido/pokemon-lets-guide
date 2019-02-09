import fs from 'fs';
import jsdom from 'jsdom';
import fetch from 'node-fetch';
import { Languages } from 'pokelab';
import { getVariantId, getVariantName } from '../src/app/utils/pokemon';

import { getMoves } from '../src/constants/moves/moves-list';
import { getMoveName } from '../src/constants/moves/moves-names';
import { getPokemonList } from '../src/constants/pokemon/pokemon-list';

const SCRAP_URL = 'https://rankedboost.com/pokemon-lets-go/:pokemon-slug:/';
// @ts-ignore
const ELEMENT_TO_SCRAP = 'RizzyTheGod';
const OUTPUT_MAP_FILE = './src/constants/pokemon/pokemon-moves-relations.ts';

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

// @ts-ignore
const moves = getMoves().map(({ id }) => ({
  id,
  name: getMoveName(id, Languages.All.findIndex(l => l === Languages.English)),
}));

// WRITE TS FILE
const relationsList: string[] = [];
// @ts-ignore
const addLineToRelationsListTs = (pokemonId: string, learnableMoves: Array<{ id: string; level: number | void }>) => {
  const lines = [
    '  {',
    `    moves: [${learnableMoves.map(m => JSON.stringify(m)).join(', ')}],`,
    `    pokemon: '${pokemonId}',`,
    '  },',
  ];

  relationsList.push(lines.join('\n'));
};

// @ts-ignore
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

const getSlug = (s: string) => s.toLowerCase().replace(/\ /g, '-');
pokemonList.slice(0, 1).forEach(({ id, name }) => {
  const url = SCRAP_URL.replace(':pokemon-slug:', getSlug(name));

  fetch(url)
    .then(res => res.text())
    .then(body => {
      const dom = new jsdom.JSDOM(body);
      const document = dom.window.document;

      const tables = Array.from(document.getElementsByClassName(ELEMENT_TO_SCRAP)).slice(2, 4);
      const rawMoves = tables[0];
      const rawTms = tables[1];

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

      addLineToRelationsListTs(id, learnableMoves);

      generatePokemonMovesTs();
    });
});
