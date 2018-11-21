import { sortBy } from '../../utils/arrays';
import { getAvatarFromId, filterUnknownTypes, getStatRatio, getSuggestedIVs } from '../../utils/pokemon-stats';

import { getType } from '../../../constants/pokemon-types';
import { INITIAL_MAX_STAT_VALUE } from '../../../constants/pokemon-stats';

import { Pokemon } from './pokemon-list.types';

export const createPokemonFromServer = (collection: Array<any>): Array<Pokemon> =>
  collection
    .filter(pokemon => pokemon.id && pokemon.stats)
    .map(pokemon => {
      // Mandatory
      const id = Number(pokemon.id);

      // Some strings
      const name = String(pokemon.name || '');
      const description = String(pokemon.description || '');
      const pokedexEntry = String(pokemon.pokedexEntry || '');
      const avatar = pokemon.avatar ? String(pokemon.avatar) : getAvatarFromId(pokemon.id);

      // Types related
      const types = pokemon.types ? pokemon.types.filter(filterUnknownTypes).map(getType) : [];

      // Stats related
      const stats = {
        hp: getStatRatio(pokemon.stats.hp, INITIAL_MAX_STAT_VALUE) || 0,
        attack: getStatRatio(pokemon.stats.attack, INITIAL_MAX_STAT_VALUE) || 0,
        defense: getStatRatio(pokemon.stats.defense, INITIAL_MAX_STAT_VALUE) || 0,
        speed: getStatRatio(pokemon.stats.speed, INITIAL_MAX_STAT_VALUE) || 0,
        spDefense: getStatRatio(pokemon.stats.spDefense, INITIAL_MAX_STAT_VALUE) || 0,
        spAttack: getStatRatio(pokemon.stats.spAttack, INITIAL_MAX_STAT_VALUE) || 0,
      };
      const suggested = getSuggestedIVs(pokemon.stats);

      // Evolving related

      // Catching related

      return {
        id,
        name,
        types,
        description,
        avatar,
        stats,
        suggested,
        pokedexEntry,
      };
    })
    .sort(sortBy('id', 'asc'));
