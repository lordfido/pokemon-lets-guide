// Import reducers
import * as pokedexSelectors from './modules/pokedex/pokedex.reducer';

import { createRootReducer, IRootState } from './root.models';

// Declare root reducer
const rootReducer = createRootReducer();

// Custom selectors
// Pokedex
export const getPokedex = ({ pokedex }: IRootState, isPaginated?: boolean) =>
  pokedexSelectors.getPokedex(pokedex, isPaginated);
export const getRawPokedex = ({ pokedex }: IRootState) => pokedexSelectors.getRawPokedex(pokedex);
export const getPokedexPagination = ({ pokedex }: IRootState) => pokedexSelectors.getPokedexPagination(pokedex);
export const getPokedexSortOptions = ({ pokedex }: IRootState) => pokedexSelectors.getPokedexSortOptions(pokedex);
export const getPokedexFilters = ({ pokedex }: IRootState) => pokedexSelectors.getPokedexFilters(pokedex);
export const getSelectedPokemon = ({ pokedex }: IRootState) => pokedexSelectors.getSelectedPokemon(pokedex);
export const getPokemonPagination = ({ pokedex }: IRootState) => pokedexSelectors.getPokemonPagination(pokedex);

export default rootReducer;
