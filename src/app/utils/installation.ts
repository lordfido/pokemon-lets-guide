import { v1 as uuid } from 'uuid';
import { log } from '../../common/utils/logger';
import { INSTALLATION_ID, LANGUAGE } from '../../constants/cookies';

/**
 * If no installation ID available, create it
 */
const setInstallationId = () => {
  if (!getInstallationId()) {
    const value = uuid();
    log(`Setting InstallationID: <${value}>`);

    document.cookie = `${INSTALLATION_ID}=${value}`;
  }
};

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
 * If no language available, create it
 */
const setLanguageCookie = (value: string, override: boolean = false) => {
  if (!getLanguageCookie() || override) {
    log(`Setting Language: <${value}>`);

    document.cookie = `${LANGUAGE}=${value}`;
    location.reload();
  }
};

/**
 * Get language
 */
const getLanguageCookie = () => {
  const allCookies = document.cookie.split(';').map(c => {
    const cookie = c.split('=');
    return {
      name: cookie[0] ? cookie[0].trim() : '',
      value: cookie[1] ? cookie[1].trim() : '',
    };
  });

  const language = allCookies.find(c => c.name === LANGUAGE) || { name: LANGUAGE, value: '' };

  log(`Current Language: ${language && language.value}`);
  return language.value;
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
export const setInstallationData = ({ language }: IInstallationDataParameters) => {
  setInstallationId();
  setLanguageCookie(language.value, language.override);
};

export interface IInstallationData {
  installationId: string;
  language: string;
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
