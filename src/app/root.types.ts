import { IPokemonListState } from './modules/pokemon-list/pokemon-list.types';
import { ISearchState } from './modules/search/search.types';

export interface IDefaultAction {
  type: string;
  payload?: any;
}

export interface IRootState {
  pokemon: IPokemonListState;
  search: ISearchState;
}
