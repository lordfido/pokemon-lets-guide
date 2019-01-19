const ncp = require('ncp').ncp;

const COMMON_PATH = 'src/assets/images/pokemon-images/';
const SOURCE_PATH = `./${COMMON_PATH}`;
const OUTPUT_PATH = `./dist/${COMMON_PATH}`;

ncp.limit = 16;

ncp(SOURCE_PATH, OUTPUT_PATH, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Images have been moved!');
});
