import { History } from 'history';
import { log, error } from '../../common/utils/logger';

const serviceWorkerUrl = './sw.js';

let router: History;

// Compatibility
let areServiceWorkerSupported = false;

const setServiceWorkerSupport = (areSupported: boolean) => {
  areServiceWorkerSupported = areSupported;
  log(`Setting <areServiceWorkerSupported> to <${areSupported}>`);
};

export const getServiceWorkerSupport = () => areServiceWorkerSupported;

/**
 * Register a service worker to handle some push events
 */
const registerServiceWorker = (history: History) => {
  // If browser is not compatible
  if (!navigator.serviceWorker) {
    return;
  }

  // Stores React router
  router = history;

  setServiceWorkerSupport(true);

  // Register the worker
  log('Registering service worker');
  navigator.serviceWorker
    .register(serviceWorkerUrl)
    .then(() => {
      log('Service worker has been registered');
    })
    .catch(err => {
      error('There was an error while registering the Service Worker', err);
    });
};

export default registerServiceWorker;
