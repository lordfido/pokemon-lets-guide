/* eslint-disable no-console */
import { isProduction } from './platforms';

const packageJson = require('../../../package.json');

const shouldDebug = !isProduction();
const prefix = packageJson.displayName;

export const info = (...args: any[]) => {
  // tslint:disable-next-line no-console
  console.info(`[${prefix}]: `, ...args);
};

export const log = (...args: any[]) => {
  if (shouldDebug) {
    // tslint:disable-next-line no-console
    console.log(`[${prefix}]: `, ...args);
  }
};

export const warn = (...args: any[]) => {
  if (shouldDebug) {
    // tslint:disable-next-line no-console
    console.warn(`[${prefix}]: `, ...args);
  }
};

export const error = (...args: any[]) => {
  if (shouldDebug) {
    // tslint:disable-next-line no-console
    console.error(`[${prefix}]: `, ...args);
  }
};
