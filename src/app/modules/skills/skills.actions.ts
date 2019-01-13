import { ActionCreator } from '../../../definitions/action-creator';

import {
  SKILLS_CREATE,
  SKILLS_FILTER,
  SKILLS_LOAD_MORE,
  SKILLS_RESET_FILTERS,
  SKILLS_SORT,
} from '../../../constants/actionTypes';

import { createSkillsCollectionFromPokeLab } from './skills.models';

interface IFilters {
  name: string;
  value: string | string[] | boolean;
}

interface ISort {
  sortBy: string;
  order: string;
}

export const createSkills: ActionCreator = () => dispatch => {
  // Send them to the store
  dispatch({
    payload: {
      collection: createSkillsCollectionFromPokeLab(),
    },
    type: SKILLS_CREATE,
  });
};

export const filterSkills: ActionCreator = (filters: IFilters[]) => dispatch => {
  dispatch({
    payload: { filters },
    type: SKILLS_FILTER,
  });
};

export const loadMoreSkills: ActionCreator = () => dispatch => {
  dispatch({
    type: SKILLS_LOAD_MORE,
  });
};

export const resetSkillsFilters: ActionCreator = () => dispatch => {
  dispatch({
    type: SKILLS_RESET_FILTERS,
  });
};

export const sortSkills: ActionCreator = (sort: ISort) => dispatch => {
  dispatch({
    payload: {
      sort,
    },
    type: SKILLS_SORT,
  });
};
