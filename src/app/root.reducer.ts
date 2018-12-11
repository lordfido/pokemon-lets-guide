import { combineReducers, Reducer } from 'redux';

// Import reducers
import pokemonReducer, * as pokemonSelectors from './modules/pokemon-list/pokemon-list.reducer';
import searchReducer, * as searchSelectors from './modules/search/search.reducer';

import { IRootState } from './root.types';

// Declare root reducer
const rootReducer: Reducer<IRootState> = combineReducers({
  pokemon: pokemonReducer,
  search: searchReducer,
});

// Custom selectors
// Pokemon List
export const getPokemonList = ({ pokemon, search }: IRootState) => pokemonSelectors.getPokemonList(pokemon, search);
export const getPokemonListPagination = ({ pokemon }: IRootState) => pokemonSelectors.getPokemonListPagination(pokemon);
export const getPokemonSortOptions = ({ pokemon }: IRootState) => pokemonSelectors.getPokemonSortOptions(pokemon);

// Pokemon details
export const getSelectedPokemon = ({ pokemon }: IRootState) => pokemonSelectors.getSelectedPokemon(pokemon);
export const getPokemonPagination = ({ pokemon, search }: IRootState) =>
  pokemonSelectors.getPokemonPagination(pokemon, search);

// Search filters
export const getFilters = ({ search }: IRootState) => searchSelectors.getFilters(search);

export default rootReducer;
