import { AnyAction } from 'redux';
import { getSortedStats } from '../../utils/pokemon';

import { StatId } from '../../../constants/pokemon-stats';

import { PokemonListState, Pokemon } from './pokemon-list.types';
import { SearchState } from '../search/search.types';
import { Type } from 'pokelab-lets-go/dist/cjs/types';
import { paginationSize } from '../../../constants/features';

const initialState: PokemonListState = {
  collection: [],
  pagination: {
    first: 0,
    last: paginationSize,
  },
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'FETCH_POKEMON_SUCCESS':
      return {
        ...state,
        collection: action.payload.collection,
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

export const getSelectedPokemon = (state: PokemonListState) => (pokemonId: number) =>
  state.collection.find(pokemon => pokemon.id === pokemonId);

// Get a list of pokemon (already filtered)
export const getPokemonList = (state: PokemonListState, search: SearchState) => {
  const { collection, pagination } = state;

  return collection
    .filter(pokemon => {
      // Filter list by name or number
      if (search.nameOrNumber) {
        if (
          new RegExp(search.nameOrNumber.toLowerCase()).test(String(pokemon.id)) === false &&
          new RegExp(search.nameOrNumber.toLowerCase()).test(pokemon.name.toLowerCase()) === false
        ) {
          return false;
        }
      }

      // Filter list by included types
      if (search.includedTypes && search.includedTypes.length) {
        let shouldShow = false;
        search.includedTypes.forEach(type => {
          if (pokemon.types.ownTypes.findIndex(t => t === type) >= 0) {
            shouldShow = true;
          }
        });

        if (!shouldShow) return false;
      }

      // Filter list by excluded types
      if (search.excludedTypes && search.excludedTypes.length) {
        let shouldSkip = false;
        search.excludedTypes.forEach(type => {
          if (pokemon.types.ownTypes.findIndex(t => t === type) >= 0) {
            shouldSkip = true;
          }
        });

        if (shouldSkip) return false;
      }

      // Filter list by the best stats
      if (search.bestStats && search.bestStats.length) {
        // @ts-ignore
        const parsedStats = Object.keys(pokemon.baseStats).map((name: StatId) => ({
          name,
          value: pokemon.baseStats[name],
        }));

        const orderedStats = getSortedStats(parsedStats);

        let statMatches = true;
        search.bestStats.forEach((stat: StatId) => {
          if (orderedStats.slice(0, search.bestStats.length).findIndex(s => s === stat) < 0) {
            statMatches = false;
          }
        });

        if (!statMatches) return false;
      }

      // Filter list by the worst stats
      if (search.worstStats && search.worstStats.length) {
        // @ts-ignore
        const parsedStats = Object.keys(pokemon.baseStats).map((name: StatId) => ({
          name,
          value: pokemon.baseStats[name],
        }));

        const orderedStats = getSortedStats(parsedStats, 'asc');

        let statMatches = true;
        search.worstStats.forEach((stat: StatId) => {
          if (orderedStats.slice(0, search.worstStats.length).findIndex(s => s === stat) < 0) {
            statMatches = false;
          }
        });

        if (!statMatches) return false;
      }

      if (!search.showMegaevolutions && pokemon.megaEvolution) return false;

      if (!search.showAlolanForms && pokemon.alolanForm) return false;

      return true;
    })
    .slice(pagination.first, pagination.last);
};

// Get pagination data for a particular pokemon (already filtered)
export const getPokemonPagination = (state: PokemonListState, search: SearchState) => (pokemonId: number) => {
  const samePokemon = (pokemon: Pokemon) => pokemon.id === pokemonId;

  // Select filtered collection or complete collection
  const collection =
    getPokemonList(state, search).findIndex(samePokemon) >= 0 ? getPokemonList(state, search) : state.collection;

  // Select pokemon position in that position
  const position = collection.findIndex(samePokemon);

  return {
    prev: position > 0 ? collection[position - 1] : collection[collection.length - 1],
    next: position < collection.length - 1 ? collection[position + 1] : collection[0],
  };
};

export default reducer;
