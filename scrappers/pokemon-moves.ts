import fs from 'fs';
import jsdom from 'jsdom';
import fetch from 'node-fetch';
import translate from './pokemon-moves-translations';

import { IScrappedMove } from '../src/app/modules/moves/moves.models';
import { getPaddedId } from '../src/app/utils/pokemon';

const SCRAP_URL = 'https://pokemondb.net/move/all';
const ELEMENT_TO_SCRAP = 'table#moves';
const OUTPUT_MAP_FILE = './src/constants/moves/moves-list.ts';
const OUTPUT_NAMES_FILE = './src/constants/moves/moves-names.ts';

// WRITE TS FILE
const movesList: string[] = [];
const addLineToMoveListTs = ({ accuracy, category, effect, id, power, pp, probability, tm, type }: IScrappedMove) => {
  const lines = [
    '  {',
    `    accuracy: ${accuracy},`,
    `    category: ${category ? `'${category}'` : undefined},`,
    `    effect: "${effect}",`,
    `    id: '${id}',`,
    `    power: ${power},`,
    `    pp: ${pp},`,
    `    probability: ${probability},`,
    `    tm: ${tm},`,
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

const moveNamesList: { [key: string]: string } = {};
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

  const sortedMoveNameList: string[] = [];
  Object.keys(moveNamesList)
    .sort()
    .forEach(key => {
      sortedMoveNameList.push(moveNamesList[key]);
    });

  const content = [beginning.join('\n'), sortedMoveNameList.join('\n'), ending.join('\n')].join('\n');
  fs.writeFileSync(OUTPUT_NAMES_FILE, content);
};

const getLinkLabel = (td: Element) => td.firstElementChild && td.firstElementChild.innerHTML;

const getImageTitle = (td: Element) => {
  if (td.firstElementChild) {
    const img = td.firstElementChild as HTMLImageElement;
    return img.title;
  }

  return undefined;
};

const getNumber = (td: Element) => {
  const rawContent = td.innerHTML;
  const n = parseInt(rawContent, 10);

  // @ts-ignore
  // tslint:disable:triple-equals
  return rawContent == n ? n : undefined;
};

const getTmNumber = (td: Element): number | undefined => {
  const rawContent = td.innerHTML;
  const filteredContent = rawContent ? rawContent.replace('TM', '') : undefined;
  const n = filteredContent ? parseInt(filteredContent, 10) : undefined;

  // @ts-ignore
  // tslint:disable:triple-equals
  return filteredContent == n ? n : undefined;
};

const getContent = (td: Element) => td.innerHTML;

const parseRow = (row: Element) => ({
  accuracy: getNumber(row.children[4]),
  category: getImageTitle(row.children[2]) || undefined,
  effect: getContent(row.children[7]),
  name: getLinkLabel(row.children[0]),
  power: getNumber(row.children[3]),
  pp: getNumber(row.children[5]),
  probability: getNumber(row.children[8]),
  tm: getTmNumber(row.children[6]),
  type: getLinkLabel(row.children[1]),
});

const parseTable = (table: Element) => Array.from(table.children[1].children).map(parseRow);

fetch(SCRAP_URL)
  .then(res => res.text())
  .then(body => {
    const dom = new jsdom.JSDOM(body);
    const document = dom.window.document;

    const table = document.querySelector(ELEMENT_TO_SCRAP);
    const moves = table ? parseTable(table) : [];
    const translations: Array<Promise<void>> = [];

    moves.forEach((move, index) => {
      const id = getPaddedId((index + 1).toString());
      addLineToMoveListTs({ ...move, id });

      // Generate a new promise for each skill move
      translations.push(
        translate(id, move.name)
          .then(({ translationId, translatedNames }) => {
            const lines = [
              `  '${translationId}': ["${translatedNames['0']}", "${translatedNames['1']}", "${
                translatedNames['2']
              }", "${translatedNames['3']}", "${translatedNames['4']}", "${translatedNames['5']}", "${
                translatedNames['6']
              }", "${translatedNames['7']}"],`,
            ];

            moveNamesList[id] = lines.join('\n');
          })
          .catch((error: { error: string; id: string; name: string }) => {
            // tslint:disable:no-console
            console.error(`Translation for <${error.id}:${move.name}> failed: ${error.error}`);
            const lines = [
              `  '${error.id}': ["(${move.name})", "(${move.name})", "(${move.name})", "(${move.name})", "(${
                move.name
              })", "(${move.name})", "(${move.name})", "(${move.name})"],`,
            ];

            moveNamesList[error.id] = lines.join('\n');
          })
      );
    });

    generateMovesMapTs();

    Promise.all(translations).then(() => {
      generateMoveNamesTs();
    });
  })
  .catch(error => {
    throw Error(error);
  });
