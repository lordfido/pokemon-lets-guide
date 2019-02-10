import { ActionCreator } from '../../../definitions/action-creator';

import {
  POKEDEX_CREATE,
  POKEDEX_FILTER,
  POKEDEX_LOAD_MORE,
  POKEDEX_RESET_FILTERS,
  POKEDEX_SORT,
  POKEDEX_UPDATE_RELATIONS,
} from '../../../constants/actionTypes';
import { getPokemonMovesRelation } from '../../../constants/pokemon/pokemon-moves-relations';

import { createPokemonCollectionFromPokeLab } from './pokedex.models';

interface IFilters {
  name: string;
  value: string | string[] | boolean;
}

interface ISort {
  sortBy: string;
  order: string;
}

export const createPokedex: ActionCreator = () => dispatch => {
  // Send them to the store
  dispatch({
    payload: {
      collection: createPokemonCollectionFromPokeLab(),
    },
    type: POKEDEX_CREATE,
  });
};

export const filterPokedex: ActionCreator = (filters: IFilters[]) => dispatch => {
  dispatch({
    payload: { filters },
    type: POKEDEX_FILTER,
  });
};

export const loadMorePokedex: ActionCreator = () => dispatch => {
  dispatch({
    type: POKEDEX_LOAD_MORE,
  });
};

export const resetPokedexFilters: ActionCreator = () => dispatch => {
  dispatch({
    type: POKEDEX_RESET_FILTERS,
  });
};

export const sortPokedex: ActionCreator = (sort: ISort) => dispatch => {
  dispatch({
    payload: {
      sort,
    },
    type: POKEDEX_SORT,
  });
};

export const updatePokedexRelations: ActionCreator = () => dispatch => {
  dispatch({
    payload: {
      relations: getPokemonMovesRelation(),
    },
    type: POKEDEX_UPDATE_RELATIONS,
  });
};
