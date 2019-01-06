import { History } from 'history';
import analyticsApi from '../../common/apis/analytics';
import { error, log } from '../../common/utils/logger';
import { ANALTYICS_INIT, SW_INIT, SW_FINISHED } from '../../constants/metrics/actions';
import { SW_LOAD } from '../../constants/metrics/categories';

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
  const analyticsInit = analyticsApi.getTimer(ANALTYICS_INIT);
  const initTimer = new Date().getTime();

  analyticsApi.logTiming({
    action: SW_INIT,
    category: SW_LOAD,
    value: initTimer - analyticsInit,
  });

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
      const finishTimer = new Date().getTime();

      analyticsApi.logTiming({
        action: SW_FINISHED,
        category: SW_LOAD,
        value: finishTimer - initTimer,
      });

      log('Service worker has been registered');
    })
    .catch(err => {
      const errorTimer = new Date().getTime();

      analyticsApi.logTiming({
        action: SW_FINISHED,
        category: SW_LOAD,
        label: 'Error',
        value: errorTimer - initTimer,
      });

      error('There was an error while registering the Service Worker', err);
    });
};

export default registerServiceWorker;
