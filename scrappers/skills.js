// @ts-ignore
const fetch = require('node-fetch');
const fs = require('fs');
const jsdom = require('jsdom');

const generateJson = json => {
  fs.writeFileSync('./scrapped_data/skills.json', JSON.stringify(json));
};

const getLinkLabel = td => td.children[0] && td.children[0].innerHTML;

const getImageTitle = td => td.children[0] && td.children[0].title;

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

fetch('https://pokemondb.net/move/all')
  .then(res => res.text())
  .then(body => {
    const dom = new jsdom.JSDOM(body);
    const document = dom.window.document;

    const skillsTable = document.getElementById('moves');

    // const sampleRow = parseRow(skillsTable.children[1].children[6]);
    // console.log(sampleRow);

    const finalJson = parseTable(skillsTable);
    generateJson(finalJson);
  })
  .catch(error => {
    throw Error(error);
  });
