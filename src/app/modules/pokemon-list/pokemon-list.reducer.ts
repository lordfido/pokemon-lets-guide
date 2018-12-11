import { AnyAction } from 'redux';
import { sortBy } from '../../utils/arrays';
import { getSortedStats, getTypeRelations } from '../../utils/pokemon';

import { paginationSize } from '../../../constants/features';
import { StatId } from '../../../constants/pokemon-stats';

import { ISearchState } from '../search/search.types';
import { IPokemon, IPokemonListState } from './pokemon-list.types';

const initialState: IPokemonListState = {
  collection: [],
  pagination: {
    first: 0,
    last: paginationSize,
  },
  sort: {
    order: 'asc',
    sortBy: 'id',
  },
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'FETCH_POKEMON_SUCCESS':
      return {
        ...state,
        collection: action.payload.collection,
      };

    case 'SORT_POKEMON_LIST':
      return {
        ...state,
        sort: action.payload.sort,
      };

    case 'LOAD_MORE':
      return {
        ...state,
        pagination: {
          first: 0,
          last: state.pagination.last + paginationSize,
        },
      };

    default:
      return state;
  }
};

// Pokemon List
// Get a list of pokemon (already filtered)
export const getPokemonList = (state: IPokemonListState, search: ISearchState) => {
  const { collection, pagination } = state;

  return collection
    .filter(pokemon => {
      // Filter list by name or number
      if (search.nameOrNumber) {
        if (
          search.nameOrNumber !== String(pokemon.nationalNumber) &&
          new RegExp(search.nameOrNumber.toLowerCase()).test(pokemon.name.toLowerCase()) === false
        ) {
          return false;
        }
      }

      // Filter list by included types
      if (search.includedTypes.length) {
        let shouldShow = false;
        search.includedTypes.forEach(type => {
          if (pokemon.types.ownTypes.findIndex(t => t === type) >= 0) {
            shouldShow = true;
          }
        });

        if (!shouldShow) {
          return false;
        }
      }

      // Filter list by excluded types
      if (search.excludedTypes.length) {
        let shouldSkip = false;
        search.excludedTypes.forEach(type => {
          if (pokemon.types.ownTypes.findIndex(t => t === type) >= 0) {
            shouldSkip = true;
          }
        });

        if (shouldSkip) {
          return false;
        }
      }

      // Filter list by strong against
      if (search.strongAgainst.length) {
        const relations = getTypeRelations(pokemon.types.ownTypes);

        let shouldSkip = true;
        search.strongAgainst.forEach(type => {
          const strongAgainst = relations.filter(relation => relation.id === type && relation.effectiveness < 1);
          if (strongAgainst.length) {
            shouldSkip = false;
          }
        });

        if (shouldSkip) {
          return false;
        }
      }

      // Filter list by weak against
      if (search.weakAgainst.length) {
        const relations = getTypeRelations(pokemon.types.ownTypes);

        let shouldSkip = true;
        search.weakAgainst.forEach(type => {
          const weakAgainst = relations.filter(relation => relation.id === type && relation.effectiveness > 1);
          if (weakAgainst.length) {
            shouldSkip = false;
          }
        });

        if (shouldSkip) {
          return false;
        }
      }

      // Filter list by the best stats
      if (search.bestStats.length) {
        // @ts-ignore
        const parsedStats = Object.keys(pokemon.baseStats).map((name: StatId) => ({
          name,
          value: pokemon.baseStats[name],
        }));

        const orderedStats = getSortedStats(parsedStats);

        let statMatches = true;
        search.bestStats.forEach((stat: StatId) => {
          if (orderedStats.slice(0, 3).findIndex(s => s === stat) < 0) {
            statMatches = false;
          }
        });

        if (!statMatches) {
          return false;
        }
      }

      // Filter list by the worst stats
      if (search.worstStats.length) {
        // @ts-ignore
        const parsedStats = Object.keys(pokemon.baseStats).map((name: StatId) => ({
          name,
          value: pokemon.baseStats[name],
        }));

        const orderedStats = getSortedStats(parsedStats, 'asc');

        let statMatches = true;
        search.worstStats.forEach((stat: StatId) => {
          if (orderedStats.slice(0, 3).findIndex(s => s === stat) < 0) {
            statMatches = false;
          }
        });

        if (!statMatches) {
          return false;
        }
      }

      // Filter by minimum CP
      if (typeof search.minBaseCP !== 'undefined' && search.minBaseCP.length) {
        if (pokemon.baseCP < parseInt(search.minBaseCP, 10)) {
          return false;
        }
      }

      // Filter by maximum CP
      if (typeof search.maxBaseCP !== 'undefined' && search.maxBaseCP.length) {
        if (pokemon.baseCP > parseInt(search.maxBaseCP, 10)) {
          return false;
        }
      }

      // Filter mega evolutions
      if (!search.showMegaevolutions && pokemon.megaEvolution) {
        return false;
      }

      // Filter alolan forms
      if (!search.showAlolanForms && pokemon.alolanForm) {
        return false;
      }

      return true;
    })
    .sort(sortBy(state.sort.sortBy, state.sort.order))
    .slice(pagination.first, pagination.last);
};

// Get pagination data for pokemon list
export const getPokemonListPagination = (state: IPokemonListState) => state.pagination;

// Get sorting options for pokemon list
export const getPokemonSortOptions = (state: IPokemonListState) => state.sort;

// Pokemon Details
// Get details of selected pokemon
export const getSelectedPokemon = (state: IPokemonListState) => (pokemonId: string) =>
  state.collection.find(pokemon => pokemon.id === pokemonId);

// Get pagination data for a particular pokemon (already filtered)
export const getPokemonPagination = (state: IPokemonListState, search: ISearchState) => (pokemonId: string) => {
  const samePokemon = (pokemon: IPokemon) => pokemon.id === pokemonId;

  // Select filtered collection or complete collection
  const collection =
    getPokemonList(state, search).findIndex(samePokemon) >= 0 ? getPokemonList(state, search) : state.collection;

  // Select pokemon position in that position
  const position = collection.findIndex(samePokemon);

  return {
    next: position < collection.length - 1 ? collection[position + 1] : collection[0],
    prev: position > 0 ? collection[position - 1] : collection[collection.length - 1],
  };
};

export default reducer;
