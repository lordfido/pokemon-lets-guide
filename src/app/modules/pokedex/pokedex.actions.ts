import { ActionCreator } from '../../../definitions/action-creator';
import { createPokemonCollectionFromPokeLab } from './pokedex.models';

interface IUpdateArgs {
  filter: string;
  value: string | string[] | boolean;
}

export const updateFilters: ActionCreator = ({ filter, value }: IUpdateArgs) => dispatch => {
  const parsedValue = value === 'on' ? true : value === 'off' ? false : value;

  dispatch({
    payload: {
      filter,
      value: parsedValue,
    },
    type: 'UPDATE_FILTER',
  });
};

export const resetFilters: ActionCreator = () => dispatch => {
  dispatch({
    type: 'RESET_FILTERS',
  });
};

export const getPokemon: ActionCreator = () => dispatch => {
  // Send them to the store
  dispatch({
    payload: {
      collection: createPokemonCollectionFromPokeLab(),
    },
    type: 'FETCH_POKEMON_SUCCESS',
  });
};

interface ISort {
  sortBy: string;
  order: string;
}

export const sortPokemonList: ActionCreator = (sort: ISort) => dispatch => {
  dispatch({
    payload: {
      sort,
    },
    type: 'SORT_POKEMON_LIST',
  });
};

export const loadMore: ActionCreator = () => dispatch => {
  dispatch({
    type: 'LOAD_MORE',
  });
};
