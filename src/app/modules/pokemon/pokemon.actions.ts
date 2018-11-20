import initialPokemon from '../../../common/apis/mocks';

import { createPokemonFromServer } from './pokemon.models';

import { ActionCreator } from '../../../definitions/action-creator';

export const getPokemon: ActionCreator = () => dispatch => {
  dispatch({
    type: 'FETCH_POKEMON_SUCCESS',
    payload: {
      collection: createPokemonFromServer(initialPokemon),
    },
  });
};
