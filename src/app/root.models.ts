import { combineReducers } from 'redux';

import pokedexReducer from './modules/pokedex/pokedex.reducer';

import { IPokedexState } from './modules/pokedex/pokedex.models';

export interface IDefaultAction {
  type: string;
  payload?: any;
}

export interface IRootState {
  pokedex: IPokedexState;
}

export const createRootReducer = () =>
  combineReducers({
    pokedex: pokedexReducer,
  });
