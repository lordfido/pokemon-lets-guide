import { sortBy } from './arrays';

import { getType } from '../../constants/pokemon-types';
import {
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

import { PokemonStats } from '../modules/pokemon-list/pokemon-list.types';

export const getStatRatio = (value: number, max: number = MAX_STAT_VALUE): number => value / max;

export const getStatAbsolute = (ratio: number, max: number = MAX_STAT_VALUE): number => ratio * max;

export const filterUnknownTypes = (pokemonType: string): boolean => !!getType(pokemonType);

export const getPaddedId = (pokemonId: number): string => {
  let number = String(pokemonId);

  if (pokemonId < 10) number = `00${pokemonId}`;
  else if (pokemonId < 100) number = `0${pokemonId}`;

  return number;
};

export const getAvatarFromId = (pokemonId: number): string =>
  `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getPaddedId(pokemonId)}.png`;

const getSortedStats = (stats: [{ name: StatId; value: number }]): Array<StatId> =>
  stats.sort(sortBy('value', 'desc')).map(stat => stat.name);

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
