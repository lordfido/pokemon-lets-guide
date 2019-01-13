// Pokedex
export type PokedexActionType =
  | 'POKEDEX_CREATE'
  | 'POKEDEX_FILTER'
  | 'POKEDEX_LOAD_MORE'
  | 'POKEDEX_RESET_FILTERS'
  | 'POKEDEX_SORT';

export const POKEDEX_CREATE: PokedexActionType = 'POKEDEX_CREATE';
export const POKEDEX_FILTER: PokedexActionType = 'POKEDEX_FILTER';
export const POKEDEX_LOAD_MORE: PokedexActionType = 'POKEDEX_LOAD_MORE';
export const POKEDEX_RESET_FILTERS: PokedexActionType = 'POKEDEX_RESET_FILTERS';
export const POKEDEX_SORT: PokedexActionType = 'POKEDEX_SORT';

// Skills
export type SkillsActionType =
  | 'SKILLS_CREATE'
  | 'SKILLS_FILTER'
  | 'SKILLS_LOAD_MORE'
  | 'SKILLS_RESET_FILTERS'
  | 'SKILLS_SORT';

export const SKILLS_CREATE: SkillsActionType = 'SKILLS_CREATE';
export const SKILLS_FILTER: SkillsActionType = 'SKILLS_FILTER';
export const SKILLS_LOAD_MORE: SkillsActionType = 'SKILLS_LOAD_MORE';
export const SKILLS_RESET_FILTERS: SkillsActionType = 'SKILLS_RESET_FILTERS';
export const SKILLS_SORT: SkillsActionType = 'SKILLS_SORT';
