// @ts-ignore
const fetch = require('node-fetch');
const fs = require('fs');
const jsdom = require('jsdom');
const pokeUtils = require('./utils.js');

const SCRAP_URL = 'https://pokemondb.net/move/all';
const ELEMENT_TO_SCRAP = 'table#moves';
const OUTPUT_MAP_FILE = './src/constants/moves/moves-list.ts';

// WRITE TS FILE
const movesList = [];
const addLineToMoveListTs = ({ accuracy, category, effect, id, name, power, pp, type }) => {
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

const generateJson = () => {
  const beginning = [
    "import { IMoveWithType } from '../../app/modules/moves/moves.models';",
    '',
    'const moves: IMoveWithType[] = [',
  ];
  const ending = ['];', '', 'export const getMoves = () => moves;', ''];

  const content = [beginning.join('\n'), movesList.sort(pokeUtils.sortBy('id')).join('\n'), ending.join('\n')].join(
    '\n'
  );
  fs.writeFileSync(OUTPUT_MAP_FILE, content);
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
      addLineToMoveListTs({ ...move, id: index + 1 });
    });

    generateJson();
  })
  .catch(error => {
    throw Error(error);
  });
