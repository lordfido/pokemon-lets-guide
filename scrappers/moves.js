// @ts-ignore
const fetch = require('node-fetch');
const fs = require('fs');
const jsdom = require('jsdom');
const pokeUtils = require('./utils.js');

const SCRAP_URL = 'https://pokemondb.net/move/all';
const ELEMENT_TO_SCRAP = 'table#moves';
const OUTPUT_MAP_FILE = './src/constants/moves/moves-list.ts';
const OUTPUT_NAMES_FILE = './src/constants/moves/moves-names.ts';

// WRITE TS FILE
const movesList = [];
const addLineToMoveListTs = ({ accuracy, category, effect, id, power, pp, type }) => {
  const lines = [
    '  {',
    `    accuracy: ${accuracy},`,
    `    category: ${category ? `'${category}'` : undefined},`,
    `    effect: "${effect}",`,
    `    id: '${id}',`,
    `    power: ${power},`,
    `    pp: ${pp},`,
    `    type: '${type}',`,
    '  },',
  ];

  movesList.push(lines.join('\n'));
};

const generateMovesMapTs = () => {
  const beginning = [
    "import { IScrappedMove } from '../../app/modules/moves/moves.models';",
    '',
    'const moves: IScrappedMove[] = [',
  ];
  const ending = ['];', '', 'export const getMoves = () => moves;', ''];

  const content = [beginning.join('\n'), movesList.join('\n'), ending.join('\n')].join('\n');
  fs.writeFileSync(OUTPUT_MAP_FILE, content);
};

const moveNamesList = [];
const addLineToMoveNamesTs = ({ id, name }) => {
  const lines = [`  '${id}': ["", "${name}", "", "", "", "", "", ""],`];

  moveNamesList.push(lines.join('\n'));
};

const generateMoveNamesTs = () => {
  const beginning = [
    'interface ITranslationsCollection {',
    '  [token: string]: [string, string, string, string, string, string, string, string];',
    '}',
    '',
    'const moveNames: ITranslationsCollection = {',
  ];
  const ending = [
    '};',
    '',
    "export const getMoveName = (id: string, locale: number) => moveNames[id][locale] || '';",
    '',
  ];

  const content = [beginning.join('\n'), moveNamesList.join('\n'), ending.join('\n')].join('\n');
  fs.writeFileSync(OUTPUT_NAMES_FILE, content);
};

const getLinkLabel = td => td.firstElementChild && td.firstElementChild.innerHTML;

const getImageTitle = td => td.firstElementChild && td.firstElementChild.title;

const getNumber = td => {
  const rawContent = td.innerHTML;
  const number = parseInt(rawContent, 10);

  return rawContent == number ? number : undefined;
};

const getTmNumber = td => {
  const rawContent = td.innerHTML;
  const filteredContent = rawContent ? rawContent.replace('TM', '') : undefined;
  const number = parseInt(filteredContent, 10);

  return filteredContent == number ? number : undefined;
};

const getContent = td => td.innerHTML;

const parseRow = row => ({
  name: getLinkLabel(row.children[0]),
  type: getLinkLabel(row.children[1]),
  category: getImageTitle(row.children[2]) || undefined,
  power: getNumber(row.children[3]),
  accuracy: getNumber(row.children[4]),
  pp: getNumber(row.children[5]),
  tm: getTmNumber(row.children[6]),
  effect: getContent(row.children[7]),
  probability: getNumber(row.children[8]),
});

const parseTable = table => Array.from(table.children[1].children).map(parseRow);

fetch(SCRAP_URL)
  .then(res => res.text())
  .then(body => {
    const dom = new jsdom.JSDOM(body);
    const document = dom.window.document;

    const table = document.querySelector(ELEMENT_TO_SCRAP);
    const moves = parseTable(table);

    moves.forEach((move, index) => {
      const id = pokeUtils.getPaddedId(index + 1);
      addLineToMoveListTs({ ...move, id });
      addLineToMoveNamesTs({ ...move, id });
    });

    generateMovesMapTs();
    generateMoveNamesTs();
  })
  .catch(error => {
    throw Error(error);
  });
