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
  token?: string;
  p256dh?: string;
  auth?: string;
}

/**
 * Get installation data:
 * - Installation id
 * - Push subscription token
 * - Push subscription keys
 */
export const getInstallationData = () => {
  const data: InstallationData = {
    installationId: getInstallationId(),
  };

  const subscription = getPushSubscription();
  if (typeof subscription !== 'undefined') {
    data.token = subscription.endpoint;
    data.p256dh = subscription.keys.p256dh;
    data.auth = subscription.keys.auth;
  }

  return data;
};
