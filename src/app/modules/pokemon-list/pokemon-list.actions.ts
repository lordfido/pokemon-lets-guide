import { CreatePokemonCollectionFromPokeLab } from './pokemon-list.models';

import { ActionCreator } from '../../../definitions/action-creator';

export const getPokemon: ActionCreator = () => dispatch => {
  // Send them to the store
  dispatch({
    type: 'FETCH_POKEMON_SUCCESS',
    payload: {
      collection: CreatePokemonCollectionFromPokeLab(),
    },
  });
};

interface Sort {
  sortBy: string;
  order: string;
}
export const sortPokemonList: ActionCreator = (sort: Sort) => dispatch => {
  dispatch({
    type: 'SORT_POKEMON_LIST',
    payload: {
      sort,
    },
  });
};

export const loadMore: ActionCreator = () => dispatch => {
  dispatch({
    type: 'LOAD_MORE',
  });
};
