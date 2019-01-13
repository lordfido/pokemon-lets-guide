import { Categories, SkillCategory } from './skills-categories';

const categoryIcons = {
  [Categories.Phisical]: require('../../assets/images/category-icons/phisical.png'),
  [Categories.Special]: require('../../assets/images/category-icons/special.png'),
  [Categories.Status]: require('../../assets/images/category-icons/status.png'),
};

export const getCategoryIcon = (category: SkillCategory): string => categoryIcons[category];
