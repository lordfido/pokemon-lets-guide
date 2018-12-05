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

export const loadMore: ActionCreator = () => dispatch => {
  dispatch({
    type: 'LOAD_MORE',
  });
};
