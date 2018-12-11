import { CreatePokemonCollectionFromPokeLab } from './pokemon-list.models';

import { ActionCreator } from '../../../definitions/action-creator';

export const getPokemon: ActionCreator = () => dispatch => {
  // Send them to the store
  dispatch({
    payload: {
      collection: CreatePokemonCollectionFromPokeLab(),
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
