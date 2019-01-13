export type SkillCategory = 'physical' | 'special' | 'status';

const PHYSICAL: SkillCategory = 'physical';
const SPECIAL: SkillCategory = 'special';
const STATUS: SkillCategory = 'status';

export const getCategories = () => [PHYSICAL, SPECIAL, STATUS];
