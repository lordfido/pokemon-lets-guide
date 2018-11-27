import { isProduction, isPre } from '../common/utils/platforms';

export const restoreLastRoute = false;
export const cacheOnDemand = true || isProduction() || isPre();

export const paginationSize = 24;
