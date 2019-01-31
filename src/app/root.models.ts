import { CSSProperties } from 'react-jss';
import { combineReducers } from 'redux';

import movesReducer from './modules/moves/moves.reducer';
import pokedexReducer from './modules/pokedex/pokedex.reducer';

import { IMovesState } from './modules/moves/moves.models';
import { IPokedexState } from './modules/pokedex/pokedex.models';

export interface IDefaultAction {
  type: string;
  payload?: any;
}

export interface IRootState {
  moves: IMovesState;
  pokedex: IPokedexState;
}

export const createRootReducer = () =>
  combineReducers({
    moves: movesReducer,
    pokedex: pokedexReducer,
  });

export interface ISheet {
  [key: string]: CSSProperties<any>;
}
