// Import reducers
import * as movesSelectors from './modules/moves/moves.reducer';
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

// Moves
export const getMoves = ({ moves }: IRootState, isPaginated?: boolean) => movesSelectors.getMoves(moves, isPaginated);
export const getRawMoves = ({ moves }: IRootState) => movesSelectors.getRawMoves(moves);
export const getMovesPagination = ({ moves }: IRootState) => movesSelectors.getMovesPagination(moves);
export const getMovesSortOptions = ({ moves }: IRootState) => movesSelectors.getMovesSortOptions(moves);
export const getMovesFilters = ({ moves }: IRootState) => movesSelectors.getMovesFilters(moves);
export const getSelectedMove = ({ moves }: IRootState) => movesSelectors.getSelectedMove(moves);
export const getMovePagination = ({ moves }: IRootState) => movesSelectors.getMovePagination(moves);

export default rootReducer;
