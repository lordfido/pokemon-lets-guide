import { MovesCategories, MovesCategory } from './moves-categories';

const movesCategoryIcons = {
  [MovesCategories.Phisical]: require('../../assets/images/moves-category-icons/phisical.png'),
  [MovesCategories.Special]: require('../../assets/images/moves-category-icons/special.png'),
  [MovesCategories.Status]: require('../../assets/images/moves-category-icons/status.png'),
};

export const getMovesCategoryIcon = (movesCategory: MovesCategory): string => movesCategoryIcons[movesCategory];
