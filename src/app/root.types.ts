import { PokemonListState } from './modules/pokemon-list/pokemon-list.types';
import { SearchState } from './modules/search/search.types';

export interface DefaultAction {
  type: string;
  payload?: any;
}

export interface RootState {
  pokemon: PokemonListState;
  search: SearchState;
}
