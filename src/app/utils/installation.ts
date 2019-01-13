import { v1 as uuid } from 'uuid';
import { getCookie, setCookie } from '../../common/utils/cookies';
import { log } from '../../common/utils/logger';

import { GAME_LANGUAGE, INSTALLATION_ID, UI_LANGUAGE } from '../../constants/cookies';

/**
 * Get Installation ID
 */
const getInstallationId = () => {
  const allCookies = document.cookie.split(';').map(c => {
    const cookie = c.split('=');
    return {
      name: cookie[0] ? cookie[0].trim() : '',
      value: cookie[1] ? cookie[1].trim() : '',
    };
  });

  const installationId = allCookies.find(c => c.name === INSTALLATION_ID) || { name: INSTALLATION_ID, value: '' };

  log(`Current InstallationId: ${installationId && installationId.value}`);
  return installationId.value;
};

/**
 * If no installation ID available, create it
 */
const setInstallationId = (override: boolean = false) => {
  if (!getInstallationId() || override) {
    const value = uuid();
    log(`Setting InstallationID: <${value}>`);

    setCookie(INSTALLATION_ID, value);
  }
};

/**
 * Get game language
 */
const getGameLanguageCookie = () => {
  const language = getCookie(GAME_LANGUAGE);

  log(`Current Game Language: ${language}`);
  return language;
};

/**
 * If no game language available, create it
 */
const setGameLanguageCookie = (value: string, override: boolean = false) => {
  if (!getGameLanguageCookie() || override) {
    log(`Setting Game Language: <${value}>`);

    setCookie(GAME_LANGUAGE, value);
    location.reload();
  }
};

/**
 * Get ui language
 */
const getUiLanguageCookie = () => {
  const language = getCookie(UI_LANGUAGE);

  log(`Current UI Language: ${language}`);
  return language;
};

/**
 * If no ui language available, create it
 */
const setUiLanguageCookie = (value: string, override: boolean = false) => {
  if (!getUiLanguageCookie() || override) {
    log(`Setting UI Language: <${value}>`);

    setCookie(UI_LANGUAGE, value);
    location.reload();
  }
};

interface IInstallationDataParameters {
  gameLanguage?: {
    value: string;
    override?: boolean;
  };
  uiLanguage?: {
    value: string;
    override?: boolean;
  };
}

/**
 * Set installation data:
 * - Installation id
 * - Language
 */
export const setInstallationData = ({ gameLanguage, uiLanguage }: IInstallationDataParameters) => {
  setInstallationId();

  if (gameLanguage) {
    setGameLanguageCookie(gameLanguage.value, gameLanguage.override);
  }

  if (uiLanguage) {
    setUiLanguageCookie(uiLanguage.value, uiLanguage.override);
  }
};

export interface IInstallationData {
  gameLanguage: string | void;
  installationId: string;
  uiLanguage: string | void;
}

/**
 * Get installation data:
 * - Installation id
 * - Language
 */
export const getInstallationData = () => {
  const data: IInstallationData = {
    gameLanguage: getGameLanguageCookie(),
    installationId: getInstallationId(),
    uiLanguage: getUiLanguageCookie(),
  };

  return data;
};
