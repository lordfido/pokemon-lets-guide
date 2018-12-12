import { v1 as uuid } from 'uuid';
import { getCookie, setCookie } from '../../common/utils/cookies';
import { log } from '../../common/utils/logger';

import { INSTALLATION_ID, LANGUAGE } from '../../constants/cookies';

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
 * Get language
 */
const getLanguageCookie = () => {
  const language = getCookie(LANGUAGE);

  log(`Current Language: ${language}`);
  return language;
};

/**
 * If no language available, create it
 */
const setLanguageCookie = (value: string, override: boolean = false) => {
  if (!getLanguageCookie() || override) {
    log(`Setting Language: <${value}>`);

    setCookie(LANGUAGE, value);
    location.reload();
  }
};

interface IInstallationDataParameters {
  language: {
    value: string;
    override?: boolean;
  };
}

/**
 * Set installation data:
 * - Installation id
 * - Language
 */
export const setInstallationData = ({ language: { value, override } }: IInstallationDataParameters) => {
  setInstallationId();
  setLanguageCookie(value, override);
};

export interface IInstallationData {
  installationId: string;
  language: string | void;
}

/**
 * Get installation data:
 * - Installation id
 * - Language
 */
export const getInstallationData = () => {
  const data: IInstallationData = {
    installationId: getInstallationId(),
    language: getLanguageCookie(),
  };

  return data;
};
