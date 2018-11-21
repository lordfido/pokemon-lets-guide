import { sortBy } from '../../utils/arrays';
import { getAvatarFromId, filterUnknownTypes, getStatRatio, getSuggestedIVs } from '../../utils/pokemon-stats';

import { getType } from '../../../constants/pokemon-types';
import { INITIAL_MAX_STAT_VALUE } from '../../../constants/pokemon-stats';

import { Pokemon } from './pokemon-list.types';

export const createPokemonFromServer = (collection: Array<any>): Array<Pokemon> =>
  collection
    .filter(pokemon => typeof pokemon.id !== undefined && typeof pokemon.stats !== undefined)
    .map(pokemon => ({
      id: Number(pokemon.id),
      name: String(pokemon.name || ''),
      types: typeof pokemon.types !== 'undefined' ? pokemon.types.filter(filterUnknownTypes).map(getType) : [],
      description: String(pokemon.description || ''),

      avatar: pokemon.avatar ? String(pokemon.avatar) : getAvatarFromId(pokemon.id),

      stats: {
        hp: getStatRatio(pokemon.stats.hp, INITIAL_MAX_STAT_VALUE) || 0,
        attack: getStatRatio(pokemon.stats.attack, INITIAL_MAX_STAT_VALUE) || 0,
        defense: getStatRatio(pokemon.stats.defense, INITIAL_MAX_STAT_VALUE) || 0,
        speed: getStatRatio(pokemon.stats.speed, INITIAL_MAX_STAT_VALUE) || 0,
        spDefense: getStatRatio(pokemon.stats.spDefense, INITIAL_MAX_STAT_VALUE) || 0,
        spAttack: getStatRatio(pokemon.stats.spAttack, INITIAL_MAX_STAT_VALUE) || 0,
      },
      suggested: getSuggestedIVs(pokemon.stats),

      pokedexEntry: String(pokemon.pokedexEntry || ''),
    }))
    .sort(sortBy('id', 'asc'));
