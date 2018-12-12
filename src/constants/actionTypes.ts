// Pokedex
export type PokedexActionType =
  | 'POKEDEX_LOAD_MORE'
  | 'POKEDEX_CREATE'
  | 'POKEDEX_SORT'
  | 'POKEDEX_FILTER'
  | 'POKEDEX_RESET_FILTERS';

export const POKEDEX_LOAD_MORE: PokedexActionType = 'POKEDEX_LOAD_MORE';
export const POKEDEX_CREATE: PokedexActionType = 'POKEDEX_CREATE';
export const POKEDEX_SORT: PokedexActionType = 'POKEDEX_SORT';

export const POKEDEX_FILTER: PokedexActionType = 'POKEDEX_FILTER';
export const POKEDEX_RESET_FILTERS: PokedexActionType = 'POKEDEX_RESET_FILTERS';
