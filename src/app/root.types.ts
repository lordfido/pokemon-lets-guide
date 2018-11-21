import { PokemonListState } from './modules/pokemon-list/pokemon-list.types';

export interface DefaultAction {
  type: string;
  payload?: any;
}

export interface RootState {
  pokemon: PokemonListState;
}
