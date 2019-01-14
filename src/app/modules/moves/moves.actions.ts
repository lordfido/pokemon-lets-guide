import { ActionCreator } from '../../../definitions/action-creator';

import {
  MOVES_CREATE,
  MOVES_FILTER,
  MOVES_LOAD_MORE,
  MOVES_RESET_FILTERS,
  MOVES_SORT,
} from '../../../constants/actionTypes';

import { createMovesCollectionFromPokeLab } from './moves.models';

interface IFilters {
  name: string;
  value: string | string[] | boolean;
}

interface ISort {
  sortBy: string;
  order: string;
}

export const createMoves: ActionCreator = () => dispatch => {
  // Send them to the store
  dispatch({
    payload: {
      collection: createMovesCollectionFromPokeLab(),
    },
    type: MOVES_CREATE,
  });
};

export const filterMoves: ActionCreator = (filters: IFilters[]) => dispatch => {
  dispatch({
    payload: { filters },
    type: MOVES_FILTER,
  });
};

export const loadMoreMoves: ActionCreator = () => dispatch => {
  dispatch({
    type: MOVES_LOAD_MORE,
  });
};

export const resetMovesFilters: ActionCreator = () => dispatch => {
  dispatch({
    type: MOVES_RESET_FILTERS,
  });
};

export const sortMoves: ActionCreator = (sort: ISort) => dispatch => {
  dispatch({
    payload: {
      sort,
    },
    type: MOVES_SORT,
  });
};
