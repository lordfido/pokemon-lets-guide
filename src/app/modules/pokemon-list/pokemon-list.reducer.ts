import { AnyAction } from 'redux';

import { PokemonListState, Pokemon } from './pokemon-list.types';

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

export const getPokemonList = (state: PokemonListState) => state.collection;
export const getSelectedPokemon = (state: PokemonListState) => (pokemonId: number) =>
  state.collection.find(pokemon => pokemon.id === pokemonId);
export const getPokemonPagination = (state: PokemonListState) => (pokemonId: number) => {
  const position = state.collection.findIndex(pokemon => pokemon.id === pokemonId);

  if (position === 0) {
    return {
      next: state.collection[position + 1],
      prev: state.collection[state.collection.length - 1],
    };
  }

  if (position === state.collection.length - 1) {
    return {
      next: state.collection[0],
      prev: state.collection[position - 1],
    };
  }

  return {
    next: state.collection[position + 1],
    prev: state.collection[position - 1],
  };
};

export default reducer;
