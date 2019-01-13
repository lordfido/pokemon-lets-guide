import { getUiTranslation } from '../../app/utils/translations';

import { IVID } from './pokemon-ivs';

/**
 * Returns a IV Range name based in a IVId
 */
export const getIVName = (id: IVID) => getUiTranslation(`iv-${id}`);
