import { MovesCategory } from './moves-categories';

import { getGameTranslation } from '../../app/utils/translations';

export const getMovesCategoryName = (category: MovesCategory) => getGameTranslation(`category-${category}`);
