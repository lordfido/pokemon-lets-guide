import { combineReducers, Reducer } from 'redux';

// Import reducers
import pokemonReducer, * as pokemonSelectors from './modules/pokemon-list/pokemon-list.reducer';

import { RootState } from './root.types';

// Declare root reducer
const rootReducer: Reducer<RootState> = combineReducers({
  pokemon: pokemonReducer,
});

// Custom selectors
export const getPokemonList = ({ pokemon }: RootState) => pokemonSelectors.getPokemonList(pokemon);
export const getSelectedPokemon = ({ pokemon }: RootState) => pokemonSelectors.getSelectedPokemon(pokemon);
export const getPokemonPagination = ({ pokemon }: RootState) => pokemonSelectors.getPokemonPagination(pokemon);

export default rootReducer;
