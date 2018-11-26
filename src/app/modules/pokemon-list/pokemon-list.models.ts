import { Pokedex, Stats } from 'pokelab-lets-go';
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
  Pokedex.all
    .filter(pokemon => /Mega\ /.test(pokemon.name) === false)
    .map(pokemon => {
      const { nationalNumber, name: pName, types: pTypes, baseStats: pBaseStats, ...others } = pokemon;

      const id = Number(nationalNumber);
      const name = String(pName);
      const types = pTypes.map(type => String(type).toLowerCase());

      // @ts-ignore
      const baseStats: PokemonStats = {
        [HP_ID]: pBaseStats[Stats.HP],
        [ATTACK_ID]: pBaseStats[Stats.Attack],
        [DEFENSE_ID]: pBaseStats[Stats.Defense],
        [SPECIAL_ATTACK_ID]: pBaseStats[Stats.SpecialAttack],
        [SPECIAL_DEFENSE_ID]: pBaseStats[Stats.SpecialDefense],
        [SPEED_ID]: pBaseStats[Stats.Speed],
      };

      const baseCP =
        baseStats[ATTACK_ID] +
        baseStats[SPECIAL_ATTACK_ID] +
        baseStats[DEFENSE_ID] +
        baseStats[SPECIAL_DEFENSE_ID] +
        baseStats[HP_ID] +
        baseStats[SPEED_ID];

      return {
        id,
        name,
        types,
        baseStats,
        baseCP,
        others,
      };
    })

    // Create final Pokemon model
    .map(basePokemon => {
      const pokemonExtraInfo = pokemonExtraInfoList.find(pokemon => pokemon.id === basePokemon.id);

      /**
       * Mandatory data (always present, it came from PokeLab)
       */
      const id = Number(basePokemon.id);
      // @ts-ignore
      const relativeStats: PokemonStats = {
        [HP_ID]: getStatRatio(basePokemon.baseStats[HP_ID], INITIAL_MAX_STAT_VALUE) || 0,
        [ATTACK_ID]: getStatRatio(basePokemon.baseStats[ATTACK_ID], INITIAL_MAX_STAT_VALUE) || 0,
        [DEFENSE_ID]: getStatRatio(basePokemon.baseStats[DEFENSE_ID], INITIAL_MAX_STAT_VALUE) || 0,
        [SPEED_ID]: getStatRatio(basePokemon.baseStats[SPEED_ID], INITIAL_MAX_STAT_VALUE) || 0,
        [SPECIAL_DEFENSE_ID]: getStatRatio(basePokemon.baseStats[SPECIAL_DEFENSE_ID], INITIAL_MAX_STAT_VALUE) || 0,
        [SPECIAL_ATTACK_ID]: getStatRatio(basePokemon.baseStats[SPECIAL_ATTACK_ID], INITIAL_MAX_STAT_VALUE) || 0,
      };
      const suggestedStats = getSuggestedIVs(basePokemon.baseStats);

      /**
       * Additional data provided by other service
       */
      const name = basePokemon.name || String(pokemonExtraInfo ? pokemonExtraInfo.name : '');
      const description = String(pokemonExtraInfo ? pokemonExtraInfo.description : '');
      const pokedexEntry = String(pokemonExtraInfo ? pokemonExtraInfo.pokedexEntry : '');
      const avatar =
        pokemonExtraInfo && pokemonExtraInfo.avatar ? String(pokemonExtraInfo.avatar) : getAvatarFromId(basePokemon.id);

      // @ts-ignore
      const types: Array<PokemonType> =
        basePokemon.types && basePokemon.types.length
          ? basePokemon.types
          : pokemonExtraInfo && pokemonExtraInfo.types
          ? pokemonExtraInfo.types.filter(filterUnknownTypes).map(getType)
          : [];

      return {
        id,
        name,
        types,
        description,
        avatar,
        baseStats: basePokemon.baseStats,
        baseCP: basePokemon.baseCP,
        relativeStats,
        suggestedStats,
        pokedexEntry,
        others: basePokemon.others,
      };
    })

    // Sort collection
    .sort(sortBy('id', 'asc'));
