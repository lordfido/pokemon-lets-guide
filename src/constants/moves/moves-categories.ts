export type MovesCategory = 'Physical' | 'Special' | 'Status';

const PHYSICAL: MovesCategory = 'Physical';
const SPECIAL: MovesCategory = 'Special';
const STATUS: MovesCategory = 'Status';

export const getMovesCategories = () => [PHYSICAL, SPECIAL, STATUS];

export const MovesCategories = {
  Phisical: PHYSICAL,
  Special: SPECIAL,
  Status: STATUS,
};
