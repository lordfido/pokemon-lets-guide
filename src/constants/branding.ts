const packageJson = require('../../package.json');

export const APP_NAME: string = packageJson.displayName;
export const APP_DESC: string = packageJson.description;

export const APP_COLOR = '#000000';

export const APP_WEB: string = packageJson.homepage;
export const APP_DOMAIN = APP_WEB.replace('https://www.', '');
export const APP_REPOSITORY: string = `https://www.${packageJson.repository
  .replace('git@', '')
  .replace('.git', '')
  .replace(':', '/')}`;

export const ANALYTICS_ID = 'UA-41472956-25';
