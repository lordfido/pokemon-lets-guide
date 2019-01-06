const packageJson = require('../../package.json');

export const APP_NAME = packageJson.displayName;
export const APP_DESC = packageJson.description;

export const APP_COLOR = '#000000';

export const APP_DOMAIN = 'letsguide.app';

export const APP_WEB = `https://www.${APP_DOMAIN}`;
export const APP_REPOSITORY = packageJson.repository;

export const ANALYTICS_ID = 'UA-41472956-25';
