import { ActionCreator } from '../../../definitions/action-creator';

import {
  SKILLS_CREATE,
  SKILLS_FILTER,
  SKILLS_LOAD_MORE,
  SKILLS_RESET_FILTERS,
  SKILLS_SORT,
} from '../../../constants/actionTypes';

import { createSkillsCollectionFromPokeLab } from './skills.models';

export const createPokedex: ActionCreator = () => dispatch => {
  // Send them to the store
  dispatch({
    payload: {
      collection: createSkillsCollectionFromPokeLab(),
    },
    type: SKILLS_CREATE,
  });
};

interface ISort {
  sortBy: string;
  order: string;
}

export const sortPokedex: ActionCreator = (sort: ISort) => dispatch => {
  dispatch({
    payload: {
      sort,
    },
    type: SKILLS_SORT,
  });
};

export const loadMorePokedex: ActionCreator = () => dispatch => {
  dispatch({
    type: SKILLS_LOAD_MORE,
  });
};

interface IFilters {
  name: string;
  value: string | string[] | boolean;
}

export const filterPokedex: ActionCreator = (filters: IFilters[]) => dispatch => {
  dispatch({
    payload: { filters },
    type: SKILLS_FILTER,
  });
};

export const resetPokedexFilters: ActionCreator = () => dispatch => {
  dispatch({
    type: SKILLS_RESET_FILTERS,
  });
};
