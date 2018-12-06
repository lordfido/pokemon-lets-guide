import { Pokedex, Stats, Types } from 'pokelab-lets-go';
import { sortBy } from './arrays';
import pokemonExtraInfoList from '../../common/apis/mocks';

import {
  INITIAL_MAX_STAT_VALUE,
  MAX_STAT_VALUE,
  StatId,
  ATTACK_ID,
  DEFENSE_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  HP_ID,
  SPEED_ID,
  MAX_IV_VALUE,
} from '../../constants/pokemon-stats';

import { PokemonStats, Pokemon, RichPokemon, TypeRelations } from '../modules/pokemon-list/pokemon-list.types';
import { Type } from 'pokelab-lets-go/dist/cjs/types';

const getStatRatio = (value: number, max: number = MAX_STAT_VALUE): number => value / max;

export const getPaddedId = (pokemonId: number): string => {
  let number = String(pokemonId);

  if (pokemonId < 10) number = `00${pokemonId}`;
  else if (pokemonId < 100) number = `0${pokemonId}`;

  return number;
};

export const getAvatarFromId = (pokemonId: number): string =>
  `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getPaddedId(pokemonId)}.png`;

export const getBaseCP = (stats: PokemonStats): number =>
  stats[ATTACK_ID] +
  stats[SPECIAL_ATTACK_ID] +
  stats[DEFENSE_ID] +
  stats[SPECIAL_DEFENSE_ID] +
  stats[HP_ID] +
  stats[SPEED_ID];

export const getSortedStats = (stats: [{ name: StatId; value: number }], order = 'desc'): Array<StatId> =>
  stats.sort(sortBy('value', order)).map(stat => stat.name);

const generateSuggestedIVSample = (perfectIVs: number, order: Array<StatId>): PokemonStats => {
  const stats = {
    [ATTACK_ID]: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
    [DEFENSE_ID]: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
    [SPECIAL_ATTACK_ID]: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
    [SPECIAL_DEFENSE_ID]: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
    [HP_ID]: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
    [SPEED_ID]: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
  };

  const statsToOverwrite = order.slice(0, perfectIVs);
  statsToOverwrite.forEach(stat => {
    stats[stat] = getStatRatio(MAX_IV_VALUE, MAX_IV_VALUE);
  });

  // @ts-ignore
  return stats;
};

export const getSuggestedIVs = (stats: PokemonStats): Array<PokemonStats> => {
  // @ts-ignore
  const parsedStats = Object.keys(stats).map((name: StatId) => ({
    name,
    value: stats[name],
  }));

  const orderedStats = getSortedStats(parsedStats);

  const suggestedIVs = [
    generateSuggestedIVSample(1, orderedStats),
    generateSuggestedIVSample(2, orderedStats),
    generateSuggestedIVSample(3, orderedStats),
    generateSuggestedIVSample(4, orderedStats),
    generateSuggestedIVSample(5, orderedStats),
  ];

  return suggestedIVs;
};

export const removeSpecialForms = (pokemon: Pokedex.PokemonSheet) =>
  /Mega\ /.test(pokemon.name) === false && /Alolan/.test(pokemon.name) === false;

export const createPokemonFromPokeLab = (pokemon: Pokedex.PokemonSheet): Pokemon => {
  const { nationalNumber, name: pName, types: pTypes, baseStats: pBaseStats } = pokemon;

  // Get the ID
  const id = Number(nationalNumber);

  // Get the name
  const name = String(pName);

  // Get pokemon types
  const types = {
    ownTypes: pTypes,
    relations: [] as Array<TypeRelations>,
  };

  // Get base stats
  const baseStats: PokemonStats = {
    hp: pBaseStats[Stats.HP],
    attack: pBaseStats[Stats.Attack],
    defense: pBaseStats[Stats.Defense],
    spAttack: pBaseStats[Stats.SpecialAttack],
    spDefense: pBaseStats[Stats.SpecialDefense],
    speed: pBaseStats[Stats.Speed],
  };

  const alolanForm = pokemon.isAlolan
    ? {
        name: pokemon.name,
        avatar: '',
      }
    : undefined;

  const megaEvolution = pokemon.megaEvolvedWith
    ? {
        name: pokemon.name,
        avatar: '',
        evolvesWith: pokemon.megaEvolvedWith,
      }
    : undefined;

  return {
    id,
    name,
    types,
    baseStats,
    alolanForm,
    megaEvolution,
  };
};

export const getRichPokemon = (basePokemon: Pokemon): RichPokemon => {
  // Get some hardcoded data
  const pokemonExtraInfo = pokemonExtraInfoList.find(pokemon => pokemon.id === basePokemon.id);

  // Get the ID
  const id = Number(basePokemon.id);

  // Get pokemon short description
  const description = String(pokemonExtraInfo ? pokemonExtraInfo.description : '');

  // Get pokedex entry (text)
  const pokedexEntry = String(pokemonExtraInfo ? pokemonExtraInfo.pokedexEntry : '');

  // Get an avatar
  const avatar = getAvatarFromId(basePokemon.id);

  // Get pokemon type strengths and weaknesses
  const relations: Array<TypeRelations> = [];

  // Loop through each one of current pokemon's types
  basePokemon.types.ownTypes.forEach((defendingType: Type) => {
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

  // Get base CP
  const baseCP = getBaseCP(basePokemon.baseStats);

  // Get relative stats (for charts)
  const relativeStats: PokemonStats = {
    hp: getStatRatio(basePokemon.baseStats[HP_ID], INITIAL_MAX_STAT_VALUE) || 0,
    attack: getStatRatio(basePokemon.baseStats[ATTACK_ID], INITIAL_MAX_STAT_VALUE) || 0,
    defense: getStatRatio(basePokemon.baseStats[DEFENSE_ID], INITIAL_MAX_STAT_VALUE) || 0,
    spAttack: getStatRatio(basePokemon.baseStats[SPECIAL_ATTACK_ID], INITIAL_MAX_STAT_VALUE) || 0,
    spDefense: getStatRatio(basePokemon.baseStats[SPECIAL_DEFENSE_ID], INITIAL_MAX_STAT_VALUE) || 0,
    speed: getStatRatio(basePokemon.baseStats[SPEED_ID], INITIAL_MAX_STAT_VALUE) || 0,
  };

  // Get suggested stats
  const suggestedStats: Array<PokemonStats> = [];
  // const suggestedStats = getSuggestedIVs(basePokemon.baseStats);

  return {
    ...basePokemon,
    id,
    description,
    pokedexEntry,
    avatar,
    types,
    baseCP,
    relativeStats,
    suggestedStats,
  };
};
