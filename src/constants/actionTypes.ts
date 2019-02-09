// Pokedex
export type PokedexActionType =
  | 'POKEDEX_CREATE'
  | 'POKEDEX_FILTER'
  | 'POKEDEX_LOAD_MORE'
  | 'POKEDEX_RESET_FILTERS'
  | 'POKEDEX_SORT'
  | 'POKEDEX_UPDATE_RELATIONS';

export const POKEDEX_CREATE: PokedexActionType = 'POKEDEX_CREATE';
export const POKEDEX_FILTER: PokedexActionType = 'POKEDEX_FILTER';
export const POKEDEX_LOAD_MORE: PokedexActionType = 'POKEDEX_LOAD_MORE';
export const POKEDEX_RESET_FILTERS: PokedexActionType = 'POKEDEX_RESET_FILTERS';
export const POKEDEX_SORT: PokedexActionType = 'POKEDEX_SORT';
export const POKEDEX_UPDATE_RELATIONS: PokedexActionType = 'POKEDEX_UPDATE_RELATIONS';

// Moves
export type MovesActionType =
  | 'MOVES_CREATE'
  | 'MOVES_FILTER'
  | 'MOVES_LOAD_MORE'
  | 'MOVES_RESET_FILTERS'
  | 'MOVES_SORT'
  | 'MOVES_UPDATE_RELATIONS';

export const MOVES_CREATE: MovesActionType = 'MOVES_CREATE';
export const MOVES_FILTER: MovesActionType = 'MOVES_FILTER';
export const MOVES_LOAD_MORE: MovesActionType = 'MOVES_LOAD_MORE';
export const MOVES_RESET_FILTERS: MovesActionType = 'MOVES_RESET_FILTERS';
export const MOVES_SORT: MovesActionType = 'MOVES_SORT';
export const MOVES_UPDATE_RELATIONS: MovesActionType = 'MOVES_UPDATE_RELATIONS';
