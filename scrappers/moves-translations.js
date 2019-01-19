const jsdom = require('jsdom');
const fetch = require('node-fetch');

const SCRAP_URL = 'https://pokemondb.net/move/:slug';
const ELEMENT_TO_SCRAP = 'div.resp-scroll > table.vitals-table';

const languageOrders = {
  Japanese: 0,
  English: 1,
  German: 2,
  Spanish: 3,
  French: 4,
  Italian: 5,
  Korean: 6,
  Chinese: 7,
};

const parseTable = table => {
  const languages = Array.from(table.children[0].children);
  const translations = {};

  // Add detected translations
  languages.forEach(row => {
    const lang = row.children[0].innerHTML;
    const translation = row.children[1].innerHTML;

    translations[languageOrders[lang]] = translation;
  });

  // Use empty cases for undefined ones
  Object.keys(languageOrders).forEach(key => {
    if (!translations[languageOrders[key]]) {
      translations[languageOrders[key]] = '';
    }
  });

  return translations;
};

const parseName = name =>
  name
    .toLowerCase()
    .replace(/\ /g, '-')
    .replace(/\,/g, '')
    .replace(/\'/g, '');

const getTranslations = (id, name) =>
  new Promise((resolve, reject) => {
    const slug = parseName(name);
    const url = SCRAP_URL.replace(':slug', slug);

    fetch(url)
      .then(res => res.text())
      .then(body => {
        const dom = new jsdom.JSDOM(body);
        const document = dom.window.document;

        const table = document.querySelector(ELEMENT_TO_SCRAP);
        console.log(`Scrapping table for <${id}:${slug}>`, !!table);
        const translations = parseTable(table);

        resolve({ id, translations });
      })
      .catch(error => {
        reject(error, id, name);
      });
  });

module.exports = getTranslations;
