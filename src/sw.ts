import { log } from './common/utils/logger';

import handleActivateEvent from './service-worker/event-handlers/handle-activate-event';
import handleFetchEvent from './service-worker/event-handlers/handle-fetch-event';
import handleInstallEvent from './service-worker/event-handlers/handle-install-event';

log('Setting up listener for <install>');
self.addEventListener('install', handleInstallEvent);

log('Setting up listener for <activate>');
self.addEventListener('activate', handleActivateEvent);

log('Setting up listener for <fetch>');
self.addEventListener('fetch', handleFetchEvent);
