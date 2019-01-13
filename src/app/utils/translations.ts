import { Languages } from 'pokelab';
import { warn } from '../../common/utils/logger';
import { getInstallationData } from './installation';

import { gameTranslations, uiTranslations } from '../../constants/translations';

/**
 * A map with the index of each language in our Translations object
 */
const languagesIndex = {
  chinese: Languages.All.findIndex(l => l === Languages.Chinese), // 7
  english: Languages.All.findIndex(l => l === Languages.English), // 1
  french: Languages.All.findIndex(l => l === Languages.French), // 4
  german: Languages.All.findIndex(l => l === Languages.German), // 2
  italian: Languages.All.findIndex(l => l === Languages.Italian), // 5
  japanese: Languages.All.findIndex(l => l === Languages.Japanese), // 0
  korean: Languages.All.findIndex(l => l === Languages.Korean), // 6
  spanish: Languages.All.findIndex(l => l === Languages.Spanish), // 3
};

// Set default locale
let selectedGameLocale = languagesIndex.english;
let selectedUiLocale = languagesIndex.english;

/**
 * This method will set the selected locale based on an ISO code
 * @example setLocale('en-GB');
 * @example setLocale('es-ES');
 */
export const setLocale = (iso: string | void, elements: 'game' | 'ui') => {
  switch (iso) {
    case 'en-EN':
    case 'en-GB':
      if (elements === 'game') {
        selectedGameLocale = languagesIndex.english;
      } else {
        selectedUiLocale = languagesIndex.english;
      }
      break;

    case 'es-AR':
    case 'es-EC':
    case 'es-ES':
    case 'es-MX':
      if (elements === 'game') {
        selectedGameLocale = languagesIndex.spanish;
      } else {
        selectedUiLocale = languagesIndex.spanish;
      }
      break;

    default:
      if (elements === 'game') {
        selectedGameLocale = languagesIndex.english;
      } else {
        selectedUiLocale = languagesIndex.english;
      }
  }
};

/**
 * Get selected locale
 */
export const getLocale = (elements: 'game' | 'ui') => (elements === 'game' ? selectedGameLocale : selectedUiLocale);

const getTranslation = (token: string, elements: 'game' | 'ui', variable?: string, locale?: number) => {
  const Translations = elements === 'game' ? gameTranslations : uiTranslations;

  // Token doesn't exists
  if (!Translations[token]) {
    warn(`No translation for <${token}>`);
    return `No translation for <${token}>`;
  }

  // Specified locale
  if (locale) {
    // Specified locale translation doesn't exists
    if (!Translations[token][locale]) {
      warn(`No <${Languages.All[locale]}> translation for <${token}>`);
      return (
        Translations[token][languagesIndex.english].replace(':var:', variable || '') ||
        `No <${Languages.All[locale]}> translation for <${token}>`
      );
    }

    return Translations[token][locale].replace(':var:', variable || '');
  }

  // Default locale
  const selectedLocale = elements === 'game' ? selectedGameLocale : selectedUiLocale;
  if (!Translations[token][selectedLocale]) {
    // Default locale translation doesn't exists
    warn(`No <${Languages.All[selectedLocale]}> translation for <${token}>`);
    return (
      Translations[token][languagesIndex.english].replace(':var:', variable || '') ||
      `No <${Languages.All[selectedLocale]}> translation for <${token}>`
    );
  }

  return Translations[token][selectedLocale].replace(':var:', variable || '');
};

/**
 * This methods will get copies in the default or specified language
 * @example getTranslation('demo-token');
 * @example getTranslation('demo-token-with-variable', 'My variable value'); // Replace a variable located in the token with 'My variable value'
 * @example getTranslation('demo-token', undefined, 3); // Displays the text always in spanish
 */
export const getGameTranslation = (token: string, variable?: string, locale?: number) =>
  getTranslation(token, 'game', variable, locale);

export const getUiTranslation = (token: string, variable?: string, locale?: number) =>
  getTranslation(token, 'ui', variable, locale);

/**
 * Relation between language names and their ISOs
 */
export const languageISOs = [
  // { name: Languages.Japanese, iso: 'jp-JP' },
  { name: Languages.English, iso: 'en-GB' },
  // { name: Languages.German, iso: 'de-DE' },
  { name: Languages.Spanish, iso: 'es-ES' },
  // { name: Languages.French, iso: 'fr-FR' },
  // { name: Languages.Italian, iso: 'it-IT' },
  // { name: Languages.Korean, iso: 'kr-KR' },
  // { name: Languages.Chinese, iso: 'ch-CH' },
];

// When this file has ben read, update the default locales based on persisted ones
const currentGameLanguage = getInstallationData().gameLanguage;
const currentUiLanguage = getInstallationData().uiLanguage;
setLocale(currentGameLanguage, 'game');
setLocale(currentUiLanguage, 'ui');
