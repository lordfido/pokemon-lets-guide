const packageJson = require('../../package.json');
const name: string = packageJson.name;
const version: string = packageJson.version;

export const cacheNamePrefix = `${name}-`;
export const cacheName = `${cacheNamePrefix}${version}`;
export const cachedAssets = [];
