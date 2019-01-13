// @ts-ignore
const fetch = require('node-fetch');
const fs = require('fs');
const jsdom = require('jsdom');
const request = require('request');

const URL = 'https://rankedboost.com/pokemon-lets-go/pokedex/';
const IDENTIFIER = 'table.table-best-pokemon-pq';
const imagesPath = './src/assets/images/pokemon-sprites/';

const download = (url, filename, callback) => {
  request.head(url, () => {
    request(url)
      .pipe(fs.createWriteStream(filename))
      .on('close', callback);
  });
};

const parseImageName = url => {
  const urlParts = url.split('/');
  const rawImageName = urlParts[urlParts.length - 1];
  const imageName = rawImageName.toLowerCase().replace('pokemon-lets-go-', '');

  return imageName;
};

const downloadImages = array => {
  array.forEach(image => {
    const imageName = parseImageName(image);

    download(image, imagesPath + imageName, () => {});
  });
};

const getSprite = td => td.firstElementChild.firstElementChild.src;

const parseRow = row => getSprite(row.firstElementChild);

const parseTable = table => Array.from(table.children[2].children).map(parseRow);

fetch(URL)
  .then(res => res.text())
  .then(body => {
    const dom = new jsdom.JSDOM(body);
    const document = dom.window.document;

    const table = document.querySelector(IDENTIFIER);
    const images = parseTable(table);
    downloadImages(images);
  })
  .catch(error => {
    throw Error(error);
  });
