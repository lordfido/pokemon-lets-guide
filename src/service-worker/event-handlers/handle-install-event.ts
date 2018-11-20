import { log } from '../../common/utils/logger';
import { cacheName, cachedAssets } from '../constants';

const handler = async () => {
  log('SW Installed');
  const cachedFiles = await caches.open(cacheName);

  log('Precaching some assets', cachedAssets);
  return cachedFiles.addAll(cachedAssets);
};

/**
 * TS TODO: Find RequestEvent or ExtendableEvent definition
 */
const handleInstallEvent = (event: any) => {
  event.waitUntil(handler());
};

export default handleInstallEvent;
