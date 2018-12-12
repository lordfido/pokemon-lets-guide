// Import reducers
import * as pokedexSelectors from './modules/pokedex/pokedex.reducer';

import { createRootReducer, IRootState } from './root.models';

// Declare root reducer
const rootReducer = createRootReducer();

// Custom selectors
// Pokemon List
export const getPokemonList = ({ pokedex }: IRootState) => pokedexSelectors.getPokemonList(pokedex);
export const getPokemonListPagination = ({ pokedex }: IRootState) => pokedexSelectors.getPokemonListPagination(pokedex);
export const getPokemonSortOptions = ({ pokedex }: IRootState) => pokedexSelectors.getPokemonSortOptions(pokedex);

// Pokemon details
export const getSelectedPokemon = ({ pokedex }: IRootState) => pokedexSelectors.getSelectedPokemon(pokedex);
export const getPokemonPagination = ({ pokedex }: IRootState) => pokedexSelectors.getPokemonPagination(pokedex);

// Search filters
export const getFilters = ({ pokedex }: IRootState) => pokedexSelectors.getFilters(pokedex);

export default rootReducer;
