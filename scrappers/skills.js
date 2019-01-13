// @ts-ignore
const fetch = require('node-fetch');
const fs = require('fs');
const jsdom = require('jsdom');

const URL = 'https://pokemondb.net/move/all';
const IDENTIFIER = 'table#moves';
const filePath = './src/constants/skills/';
const fileName = 'skills-list.json';

const generateJson = json => {
  fs.writeFileSync(filePath + fileName, JSON.stringify(json));
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

const parseRow = row => {
  const cells = row.children;

  return {
    name: getLinkLabel(cells[0]),
    type: getLinkLabel(cells[1]),
    category: getImageTitle(cells[2]),
    power: getNumber(cells[3]),
    accuracy: getNumber(cells[4]),
    pp: getNumber(cells[5]),
    tm: getTmNumber(cells[6]),
    effect: getContent(cells[7]),
    probability: getNumber(cells[8]),
  };
};

const parseTable = table => Array.from(table.children[1].children).map(parseRow);

fetch(URL)
  .then(res => res.text())
  .then(body => {
    const dom = new jsdom.JSDOM(body);
    const document = dom.window.document;

    const table = document.querySelector(IDENTIFIER);
    const json = parseTable(table);
    generateJson(json);
  })
  .catch(error => {
    throw Error(error);
  });
