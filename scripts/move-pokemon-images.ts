import { ncp } from 'ncp';

const COMMON_PATH = 'src/assets/images/pokemon-images/';
const SOURCE_PATH = `./${COMMON_PATH}`;
const OUTPUT_PATH = `./dist/${COMMON_PATH}`;

ncp(SOURCE_PATH, OUTPUT_PATH, err => {
  if (err) {
    // tslint:disable:no-console
    return console.error(err);
  }

  // tslint:disable:no-console
  console.log('Images have been moved!');
});
