import { isPre, isProduction } from '../common/utils/platforms';

export const restoreLastRoute = false;
export const cacheOnDemand = isProduction() || isPre();

export const paginationSize = 24;
export const filtersEnabled = true;

export const showStatsInPokedex = true;
