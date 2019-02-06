import { sortBy } from '../../utils/arrays';
import { strongAgainstProvidedTypes, weakAgainstProvidedTypes } from '../../utils/pokemon-moves';

import {
  MOVES_CREATE,
  MOVES_FILTER,
  MOVES_LOAD_MORE,
  MOVES_RESET_FILTERS,
  MOVES_SORT,
} from '../../../constants/actionTypes';
import { paginationSize } from '../../../constants/features';

import { IMovesAction, IMovesState, IRichMove, movesInitialState } from './moves.models';

const reducer = (state = movesInitialState, action: IMovesAction): IMovesState => {
  switch (action.type) {
    case MOVES_CREATE:
      return {
        ...state,
        collection: action.payload.collection,
      };

    case MOVES_FILTER:
      const newFilters = {
        ...state.filters,
      };

      if (action.payload && action.payload.filters) {
        action.payload.filters.forEach((filter: { name: string; value: string | string[] | boolean }) => {
          // @ts-ignore
          newFilters[filter.name] = filter.value;
        });
      }

      return {
        ...state,
        filters: newFilters,
      };

    case MOVES_LOAD_MORE:
      return {
        ...state,
        pagination: {
          first: 0,
          last: state.pagination.last + paginationSize,
        },
      };

    case MOVES_RESET_FILTERS:
      return {
        ...state,
        filters: {
          ...movesInitialState.filters,
        },
      };

    case MOVES_SORT:
      return {
        ...state,
        sort: action.payload.sort,
      };

    default:
      return state;
  }
};

// Get a list of moves (already filtered)
export const getMoves = (state: IMovesState, isPaginated: boolean = true) => {
  const { collection, filters, pagination } = state;

  return collection
    .filter(move => {
      // Filter list by name
      if (filters.nameOrId) {
        if (new RegExp(filters.nameOrId).test(move.name) === false) {
          return false;
        }
      }

      // Filter list by included types
      if (filters.includedTypes.length) {
        let shouldShow = false;
        filters.includedTypes.forEach(type => {
          if (move.types.ownType === type) {
            shouldShow = true;
          }
        });

        if (!shouldShow) {
          return false;
        }
      }

      // Filter list by excluded types
      if (filters.excludedTypes.length) {
        let shouldSkip = false;
        filters.excludedTypes.forEach(type => {
          if (move.types.ownType === type) {
            shouldSkip = true;
          }
        });

        if (shouldSkip) {
          return false;
        }
      }

      // Filter list by strong against
      if (filters.strongAgainst.length) {
        const isStrongAgainstFilteredTypes = strongAgainstProvidedTypes(filters.strongAgainst, move);

        if (!isStrongAgainstFilteredTypes) {
          return false;
        }
      }

      // Filter list by weak against
      if (filters.weakAgainst.length) {
        const isWeakAgainstFilteredTypes = weakAgainstProvidedTypes(filters.weakAgainst, move);

        if (!isWeakAgainstFilteredTypes) {
          return false;
        }
      }

      // Filter by accuracy
      if (typeof filters.accuracy !== 'undefined') {
        if (move.accuracy && (move.accuracy < filters.accuracy[0] || move.accuracy > filters.accuracy[1])) {
          return false;
        }
      }

      // Filter by power
      if (typeof filters.power !== 'undefined') {
        if (move.power && (move.power < filters.power[0] || move.power > filters.power[1])) {
          return false;
        }
      }

      // Filter by pp
      if (typeof filters.pp !== 'undefined') {
        if (move.pp && (move.pp < filters.pp[0] || move.pp > filters.pp[1])) {
          return false;
        }
      }

      // Filter by probability
      if (typeof filters.probability !== 'undefined') {
        if (
          move.probability &&
          (move.probability < filters.probability[0] || move.probability > filters.probability[1])
        ) {
          return false;
        }
      }

      // Filter by category
      if (typeof filters.category !== 'undefined' && filters.category) {
        if (move.category !== filters.category) {
          return false;
        }
      }

      return true;
    })
    .sort(sortBy(state.sort.sortBy, state.sort.order))
    .slice(pagination.first, isPaginated ? pagination.last : state.collection.length);
};

// Get a complete list of moves (without paginate, order or filter)
export const getRawMoves = (state: IMovesState) => state.collection;

// Get pagination data for moves list
export const getMovesPagination = (state: IMovesState) => state.pagination;

// Get sorting options for moves list
export const getMovesSortOptions = (state: IMovesState) => state.sort;

// Returns all filters
export const getMovesFilters = (state: IMovesState) => state.filters;

// Move Details
// Get details of selected pokemon
export const getSelectedMove = (state: IMovesState) => (moveId: string) =>
  state.collection.find(move => move.id === moveId);

// Get pagination data for a particular pokemon (already filtered)
export const getMovePagination = (state: IMovesState) => (moveId: string) => {
  const sameMove = (move: IRichMove) => move.id === moveId;

  // Select filtered collection or complete collection
  const filteredCollection = getMoves(state, false);
  const collection = filteredCollection.findIndex(sameMove) >= 0 ? filteredCollection : state.collection;

  // Select pokemon position in that position
  const position = collection.findIndex(sameMove);

  return {
    next: position < collection.length - 1 ? collection[position + 1] : collection[0],
    prev: position > 0 ? collection[position - 1] : collection[collection.length - 1],
  };
};

export default reducer;
