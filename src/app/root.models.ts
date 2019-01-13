import { CSSProperties } from 'react-jss';
import { combineReducers } from 'redux';

import pokedexReducer from './modules/pokedex/pokedex.reducer';
import skillsReducer from './modules/skills/skills.reducer';

import { IPokedexState } from './modules/pokedex/pokedex.models';
import { ISkillsState } from './modules/skills/skills.models';

export interface IDefaultAction {
  type: string;
  payload?: any;
}

export interface IRootState {
  pokedex: IPokedexState;
  skills: ISkillsState;
}

export const createRootReducer = () =>
  combineReducers({
    pokedex: pokedexReducer,
    skills: skillsReducer,
  });

export interface ISheet {
  [key: string]: CSSProperties;
}

export type CssSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
