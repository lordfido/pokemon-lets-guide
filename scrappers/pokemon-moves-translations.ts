import jsdom from 'jsdom';
import fetch from 'node-fetch';

const SCRAP_URL = 'https://pokemondb.net/move/:slug';
const ELEMENT_TO_SCRAP = 'div.resp-scroll > table.vitals-table';

const languageOrders: { [key: string]: number } = {
  Chinese: 7,
  English: 1,
  French: 4,
  German: 2,
  Italian: 5,
  Japanese: 0,
  Korean: 6,
  Spanish: 3,
};

const parseTable = (table: Element) => {
  const languages = Array.from(table.children[0].children);
  const translations: { [key: string]: string } = {};

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

const parseName = (name: string) =>
  name
    .toLowerCase()
    .replace(/\ /g, '-')
    .replace(/\,/g, '')
    .replace(/\'/g, '');

const getTranslations = (
  id: string,
  name: string | null
): Promise<{
  translationId: string;
  translatedNames: { [key: string]: string };
}> =>
  new Promise((resolve, reject) => {
    if (!name) {
      return reject({ error: 'No name for this translation', id, name });
    }

    const slug = parseName(name);
    const url = SCRAP_URL.replace(':slug', slug);

    fetch(url)
      .then(res => res.text())
      .then(body => {
        const dom = new jsdom.JSDOM(body);
        const document = dom.window.document;

        const table = document.querySelector(ELEMENT_TO_SCRAP);
        // tslint:disable:no-console
        console.log(`Scrapping table for <${id}:${slug}>`, !!table);
        const translatedNames = table ? parseTable(table) : {};

        resolve({ translationId: id, translatedNames });
      })
      .catch(error => {
        reject({ error, id, name });
      });
  });

export default getTranslations;
