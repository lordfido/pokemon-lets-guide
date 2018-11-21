import { AnyAction } from 'redux';

import { PokemonListState } from './pokemon-list.types';

const initialState: PokemonListState = {
  collection: [],
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'FETCH_POKEMON_SUCCESS':
      return {
        ...state,
        collection: action.payload.collection,
      };

    default:
      return state;
  }
};

export default reducer;
