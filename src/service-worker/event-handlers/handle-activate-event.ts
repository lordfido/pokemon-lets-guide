import { log } from '../../common/utils/logger';
import { cacheOnDemand } from '../../constants/features';
import { cacheName } from '../constants';

const handler = async () => {
  log('SW Activated');

  const savedCaches = await caches.keys();
  log('Opening saved caches', savedCaches);

  const filteredCaches = cacheOnDemand ? savedCaches.filter(savedCache => savedCache !== cacheName) : savedCaches;

  log(`${cacheOnDemand ? 'Deleting other caches' : 'Deleting all caches'}`, filteredCaches);
  Promise.all(filteredCaches.map(savedCache => caches.delete(savedCache)));
};

const handleActivateEvent = (event: any) => {
  event.waitUntil(handler());
};

export default handleActivateEvent;
