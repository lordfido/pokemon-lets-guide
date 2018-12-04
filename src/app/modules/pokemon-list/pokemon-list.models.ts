import { Pokedex, Stats, Types } from 'pokelab-lets-go';
import pokemonExtraInfoList from '../../../common/apis/mocks';
import { sortBy } from '../../utils/arrays';
import { getAvatarFromId, getStatRatio, getSuggestedIVs } from '../../utils/pokemon-stats';

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

import { Pokemon, PokemonStats, TypeRelations } from './pokemon-list.types';

export const CreatePokemonCollectionFromPokeLab = (): Array<Pokemon> =>
  Pokedex.All.filter(pokemon => /Mega\ /.test(pokemon.name) === false)
    .map(pokemon => {
      const { nationalNumber, name: pName, types: pTypes, baseStats: pBaseStats, ...others } = pokemon;

      // Get the ID
      const id = Number(nationalNumber);

      // Get the name
      const name = String(pName);

      // Get pokemon types
      const pokemonTypes: Array<PokemonType> = [];
      pTypes.forEach(type => {
        if (type && getType(type)) {
          pokemonTypes.push(type);
        }
      });

      const types = {
        ownTypes: pokemonTypes,
        strengths: [] as Array<TypeRelations>,
        weaknesses: [] as Array<TypeRelations>,
      };

      // Get base stats
      // @ts-ignore
      const baseStats: PokemonStats = {
        [HP_ID]: pBaseStats[Stats.HP],
        [ATTACK_ID]: pBaseStats[Stats.Attack],
        [DEFENSE_ID]: pBaseStats[Stats.Defense],
        [SPECIAL_ATTACK_ID]: pBaseStats[Stats.SpecialAttack],
        [SPECIAL_DEFENSE_ID]: pBaseStats[Stats.SpecialDefense],
        [SPEED_ID]: pBaseStats[Stats.Speed],
      };

      // Get base CP
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

    // Add additional data not provided by PokeLab
    .map(basePokemon => {
      // Get some hardcoded data
      const pokemonExtraInfo = pokemonExtraInfoList.find(pokemon => pokemon.id === basePokemon.id);

      // Get the ID
      const id = Number(basePokemon.id);

      // Get pokemon short description
      const description = String(pokemonExtraInfo ? pokemonExtraInfo.description : '');

      // Get pokedex entry (text)
      const pokedexEntry = String(pokemonExtraInfo ? pokemonExtraInfo.pokedexEntry : '');

      // Get an avatar
      const avatar =
        pokemonExtraInfo && pokemonExtraInfo.avatar ? String(pokemonExtraInfo.avatar) : getAvatarFromId(basePokemon.id);

      // Get pokemon type strengths and weaknesses
      const relations: Array<TypeRelations> = [];

      // Loop through each one of current pokemon's types
      basePokemon.types.ownTypes.forEach(defendingType => {
        // Loop through all available pokemon types
        Types.All.forEach(attackingType => {
          // Get the effectiveness of this combination
          const effectiveness = Types.getEffectiveness(attackingType, defendingType);

          // If relation is 1:1, go to the next one
          if (effectiveness === 1) {
            return;
          }

          // If the relation is not 1:1, check if that relation already exists
          const relationIndex = relations.findIndex(r => r.id === attackingType);

          // If relation exists, update it
          if (relationIndex >= 0) {
            relations[relationIndex].effectiveness = relations[relationIndex].effectiveness * effectiveness;

            // If it doesn't exist, create it
          } else {
            relations.push({
              id: attackingType,
              effectiveness,
            });
          }
        });
      });

      const types = {
        ...basePokemon.types,
        relations: relations.filter(r => r.effectiveness !== 1).sort(sortBy('effectiveness')),
      };

      // Get relative stats (for charts)
      // @ts-ignore
      const relativeStats: PokemonStats = {
        [HP_ID]: getStatRatio(basePokemon.baseStats[HP_ID], INITIAL_MAX_STAT_VALUE) || 0,
        [ATTACK_ID]: getStatRatio(basePokemon.baseStats[ATTACK_ID], INITIAL_MAX_STAT_VALUE) || 0,
        [DEFENSE_ID]: getStatRatio(basePokemon.baseStats[DEFENSE_ID], INITIAL_MAX_STAT_VALUE) || 0,
        [SPEED_ID]: getStatRatio(basePokemon.baseStats[SPEED_ID], INITIAL_MAX_STAT_VALUE) || 0,
        [SPECIAL_DEFENSE_ID]: getStatRatio(basePokemon.baseStats[SPECIAL_DEFENSE_ID], INITIAL_MAX_STAT_VALUE) || 0,
        [SPECIAL_ATTACK_ID]: getStatRatio(basePokemon.baseStats[SPECIAL_ATTACK_ID], INITIAL_MAX_STAT_VALUE) || 0,
      };

      // Get suggested stats
      const suggestedStats = getSuggestedIVs(basePokemon.baseStats);

      return {
        ...basePokemon,
        id,
        description,
        pokedexEntry,
        avatar,
        types,
        relativeStats,
        suggestedStats,
      };
    })

    // Sort collection
    .sort(sortBy('id', 'asc'));
