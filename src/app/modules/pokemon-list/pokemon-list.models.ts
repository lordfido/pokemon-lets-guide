import { Stats } from 'pokelab-lets-go';
import pokemonExtraInfoList from '../../../common/apis/mocks';
import { sortBy } from '../../utils/arrays';
import { getAvatarFromId, filterUnknownTypes, getStatRatio, getSuggestedIVs } from '../../utils/pokemon-stats';

import { getType, PokemonType } from '../../../constants/pokemon-types';
import {
  INITIAL_MAX_STAT_VALUE,
  HP_ID,
  ATTACK_ID,
  DEFENSE_ID,
  SPEED_ID,
  SPECIAL_DEFENSE_ID,
  SPECIAL_ATTACK_ID,
} from '../../../constants/pokemon-stats';

import { Pokemon, PokemonStats } from './pokemon-list.types';

export const CreatePokemonCollectionFromPokeLab = (): Array<Pokemon> =>
  // Get a List of Pokemon IDs
  Stats.getNationalIds()
    // Add stats to each pokemon
    .map(id => {
      const rawStats = Stats.getStats(id);

      // @ts-ignore
      const stats: PokemonStats = {
        [HP_ID]: rawStats[Stats.HP],
        [ATTACK_ID]: rawStats[Stats.ATTACK],
        [DEFENSE_ID]: rawStats[Stats.DEFENSE],
        [SPECIAL_ATTACK_ID]: rawStats[Stats.SPECIAL_ATTACK],
        [SPECIAL_DEFENSE_ID]: rawStats[Stats.SPECIAL_DEFENSE],
        [SPEED_ID]: rawStats[Stats.SPEED],
      };

      return {
        id,
        stats,
      };
    })

    // Remove pokemon without id or stats
    .filter(pokemon => pokemon.id && pokemon.stats)

    // Create final Pokemon model
    .map(basePokemon => {
      const pokemonExtraInfo = pokemonExtraInfoList.find(pokemon => pokemon.id === basePokemon.id);

      /**
       * Mandatory data (always present, it came from PokeLab)
       */

      const id = Number(basePokemon.id);
      // @ts-ignore
      const stats: PokemonStats = {
        [HP_ID]: getStatRatio(basePokemon.stats.hp, INITIAL_MAX_STAT_VALUE) || 0,
        [ATTACK_ID]: getStatRatio(basePokemon.stats.attack, INITIAL_MAX_STAT_VALUE) || 0,
        [DEFENSE_ID]: getStatRatio(basePokemon.stats.defense, INITIAL_MAX_STAT_VALUE) || 0,
        [SPEED_ID]: getStatRatio(basePokemon.stats.speed, INITIAL_MAX_STAT_VALUE) || 0,
        [SPECIAL_DEFENSE_ID]: getStatRatio(basePokemon.stats.spDefense, INITIAL_MAX_STAT_VALUE) || 0,
        [SPECIAL_ATTACK_ID]: getStatRatio(basePokemon.stats.spAttack, INITIAL_MAX_STAT_VALUE) || 0,
      };
      const suggested = getSuggestedIVs(basePokemon.stats);

      /**
       * Additional data provided by other service
       */
      const name = String(pokemonExtraInfo ? pokemonExtraInfo.name : '');
      const description = String(pokemonExtraInfo ? pokemonExtraInfo.description : '');
      const pokedexEntry = String(pokemonExtraInfo ? pokemonExtraInfo.pokedexEntry : '');
      const avatar =
        pokemonExtraInfo && pokemonExtraInfo.avatar ? String(pokemonExtraInfo.avatar) : getAvatarFromId(basePokemon.id);

      // @ts-ignore
      const types: Array<PokemonType> =
        pokemonExtraInfo && pokemonExtraInfo.types
          ? pokemonExtraInfo.types.filter(filterUnknownTypes).map(getType)
          : [];

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

    // Sort collection
    .sort(sortBy('id', 'asc'));
