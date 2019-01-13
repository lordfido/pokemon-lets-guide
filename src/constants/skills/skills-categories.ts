export type SkillCategory = 'Physical' | 'Special' | 'Status';

const PHYSICAL: SkillCategory = 'Physical';
const SPECIAL: SkillCategory = 'Special';
const STATUS: SkillCategory = 'Status';

export const getCategories = () => [PHYSICAL, SPECIAL, STATUS];

export const Categories = {
  Phisical: PHYSICAL,
  Special: SPECIAL,
  Status: STATUS,
};
