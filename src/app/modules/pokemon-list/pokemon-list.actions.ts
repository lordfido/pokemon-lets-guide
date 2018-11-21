import { Stats } from 'pokelab-lets-go';
import initialPokemon from '../../../common/apis/mocks';

import { createPokemonFromServer } from './pokemon-list.models';

import { ActionCreator } from '../../../definitions/action-creator';
import { PokemonStats } from './pokemon-list.types';

export const getPokemon: ActionCreator = () => dispatch => {
  // Get a list of IDs
  const pokemonIdList = Stats.getNationalIds();

  // Get stats for that ID
  const pokemonList = pokemonIdList.map(id => {
    const mockedPokemon = initialPokemon.find(pokemon => pokemon.id === id);

    const rawStats = Stats.getStats(id);

    const stats: PokemonStats = {
      hp: rawStats[0],
      attack: rawStats[1],
      defense: rawStats[2],
      spAttack: rawStats[3],
      spDefense: rawStats[4],
      speed: rawStats[5],
    };

    return {
      ...mockedPokemon,
      id,
      stats,
    };
  });

  // Send them to the store
  dispatch({
    type: 'FETCH_POKEMON_SUCCESS',
    payload: {
      collection: createPokemonFromServer(pokemonList),
    },
  });
};
