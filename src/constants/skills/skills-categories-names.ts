import { SkillCategory } from './skills-categories';

import { getGameTranslation } from '../../app/utils/translations';

export const getCategoryName = (category: SkillCategory) => getGameTranslation(`category-${category}`);
