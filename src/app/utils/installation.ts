import { v1 as uuid } from 'uuid';
import { log } from '../../common/utils/logger';
import { INSTALLATION_ID } from '../../constants/cookies';

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
 * Set installation data:
 * - Installation id
 */
export const setInstallationData = () => {
  setInstallationId();
};

export interface InstallationData {
  installationId: string;
}

/**
 * Get installation data:
 * - Installation id
 */
export const getInstallationData = () => {
  const data: InstallationData = {
    installationId: getInstallationId(),
  };

  return data;
};
