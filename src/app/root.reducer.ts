import { combineReducers, Reducer } from 'redux';

// Import reducers
import pokemonReducer, * as pokemonSelectors from './modules/pokemon-list/pokemon-list.reducer';
import searchReducer, * as searchSelectors from './modules/search/search.reducer';

import { RootState } from './root.types';

// Declare root reducer
const rootReducer: Reducer<RootState> = combineReducers({
  pokemon: pokemonReducer,
  search: searchReducer,
});

// Custom selectors
export const getSelectedPokemon = ({ pokemon }: RootState) => pokemonSelectors.getSelectedPokemon(pokemon);
export const getPokemonList = ({ pokemon, search }: RootState) => pokemonSelectors.getPokemonList(pokemon, search);
export const getPokemonPagination = ({ pokemon, search }: RootState) =>
  pokemonSelectors.getPokemonPagination(pokemon, search);

export default rootReducer;
