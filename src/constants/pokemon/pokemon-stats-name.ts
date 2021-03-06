import { getGameTranslation } from '../../app/utils/translations';

import { StatId } from './pokemon-stats';

/**
 * Returns a Stat name based in a StatId
 */
export const getStatName = (id: StatId) => getGameTranslation(`stat-${id}`);
