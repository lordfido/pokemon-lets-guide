import { MovesConfigKeys } from './configs/moves';
import { PokedexConfigKeys } from './configs/pokedex';

export type LocalStorageModule = 'pokedex' | 'moves';

export const POKEDEX_MODULE: LocalStorageModule = 'pokedex';
export const MOVES_MODULE: LocalStorageModule = 'moves';

export type LocalStorageName = PokedexConfigKeys | MovesConfigKeys;
