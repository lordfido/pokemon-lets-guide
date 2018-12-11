import { Pokedex, Stats, Types } from 'pokelab-lets-go';
import { MegaStone } from 'pokelab-lets-go/dist/cjs/items';
import { sortBy } from './arrays';
import { getTranslation } from './translations';

import pokemonExtraInfoList from '../../common/apis/mocks';

import { MAX_IV_VALUE } from '../../constants/pokemon-ivs';
import {
  ATTACK_ID,
  DEFENSE_ID,
  HP_ID,
  MAX_INITIAL_STAT_VALUE,
  MAX_STAT_VALUE,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
  StatId,
} from '../../constants/pokemon-stats';

import { PokemonType } from '../../constants/pokemon-types';
import {
  IPokemonStats,
  IPokemonWithBaseCP,
  IRichPokemon,
  ITypeRelations,
} from '../modules/pokemon-list/pokemon-list.types';

/**
 * Based on a value and a max value, returns a number between 0 and 1
 * @example getStatRatio(150, 300); // Will return 0.5
 */
const getStatRatio = (value: number, max: number = MAX_STAT_VALUE): number => value / max;

/**
 * Based on a pokemon national ID, this will return a string with 3 digits
 * @example getPaddedId('10'); Will return '010'
 */
export const getPaddedId = (pokemonId: string): string => {
  let id = String(pokemonId);

  if (pokemonId.length === 1) {
    id = `00${pokemonId}`;
  } else if (pokemonId.length === 2) {
    id = `0${pokemonId}`;
  }

  return id;
};

/**
 * Based in a pokemon ID, and an object that makes that pokemon evolve,
 * generates a new ID matching www.pokemon.com patterns, so we can fetch
 * its avatar
 *
 * @example getMegaevolutionId('006'); // Will return '006'
 * @example getMegaevolutionId('006', 'CharizarditeY'); // Will return '006_f3'
 */
const getMegaevolutionId = (id: string, evolvesWith?: MegaStone) => {
  if (!evolvesWith) {
    return id;
  }

  const megaOptions = [
    {
      form: 'f2',
      name: 'X',
    },
    {
      form: 'f3',
      name: 'Y',
    },
  ];

  for (const index in megaOptions) {
    if (megaOptions[index]) {
      const option = megaOptions[index];
      if (new RegExp(option.name).test(evolvesWith)) {
        return `${id}_${option.form}`;
      }
    }
  }

  return `${id}_${megaOptions[0].form}`;
};

/**
 * Based in a pokemon name, and an object that makes that pokemon evolve,
 * generates a new ID matching www.pokemon.com patterns, so we can fetch
 * its avatar
 *
 * @example getMegaevolutionName('Charizard'); // Will return 'Charizard'
 * @example getMegaevolutionName('Venusaur', 'Venusaurite'); // Will return 'Mega Venusaur'
 * @example getMegaevolutionName('Charizard', 'CharizarditeY'); // Will return 'Mega Charizard Y'
 */
const getMegaevolutionName = (name: string, evolvesWith?: MegaStone) => {
  if (!evolvesWith) {
    return name;
  }

  const megaOptions = ['X', 'Y'];
  for (const index in megaOptions) {
    if (megaOptions[index]) {
      const option = megaOptions[index];
      if (new RegExp(option).test(evolvesWith)) {
        return `Mega ${name} ${option}`;
      }
    }
  }

  return `Mega ${name}`;
};

/**
 * Fetch the avatar of selected pokemon from www.pokemon.com
 */
export const getAvatarFromId = (pokemonId: string): string =>
  `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getPaddedId(pokemonId)}.png`;

interface IGetCPArguments {
  stats: IPokemonStats;
  level?: number;
  ivs?: IPokemonStats;
  avs?: number;
}
/**
 * This formula calculates the CP of a pokemon, based on its Level, Stats and AVs
 */
const getCombatPoints = ({ stats, level = 100, ivs, avs = 0 }: IGetCPArguments): number => {
  const keepItSimple = true;

  if (keepItSimple) {
    const simpleCP =
      stats[ATTACK_ID] +
      stats[SPECIAL_ATTACK_ID] +
      stats[DEFENSE_ID] +
      stats[SPECIAL_DEFENSE_ID] +
      stats[HP_ID] +
      stats[SPEED_ID];

    return simpleCP;
  }

  // floor(((HP+Atk+Def+SAtk+SDef+Spd) * Level * 6 / 100) + (TotalAVs * ((Level / 4) / 100 + 2)))
  const allStats =
    stats[ATTACK_ID] +
    stats[SPECIAL_ATTACK_ID] +
    stats[DEFENSE_ID] +
    stats[SPECIAL_DEFENSE_ID] +
    stats[HP_ID] +
    stats[SPEED_ID];

  return Math.floor((allStats * level * 6) / 100 + avs * (level / 4 / 100 + 2));
};

type GetSortedStatsStats = Array<{ name: StatId; value: number }>;
type GetSortedStatsOrder = 'asc' | 'desc';

/**
 * Returns ordered stats
 */
export const getSortedStats = (stats: GetSortedStatsStats, order: GetSortedStatsOrder = 'desc'): StatId[] =>
  stats.sort(sortBy('value', order)).map(stat => stat.name);

/**
 * Given a number of `perfectIVs` desired, and the `stats` ordered, will generate a map with
 * the ones that should be perfect when capturing the pokemon
 */
const generateSuggestedIVSample = (perfectIVs: number, order: StatId[]): IPokemonStats => {
  const stats = {
    attack: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
    defense: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
    hp: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
    spAttack: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
    spDefense: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
    speed: getStatRatio(MAX_IV_VALUE / 2, MAX_IV_VALUE),
  };

  const statsToOverwrite = order.slice(0, perfectIVs);
  statsToOverwrite.forEach(stat => {
    stats[stat] = getStatRatio(MAX_IV_VALUE, MAX_IV_VALUE);
  });

  return stats;
};

/**
 * Given a pokemon `stats`, will generate an array with 5 cases, each one with
 * that number of perfect IVs, so you can know wich IVs are more important to
 * selected pokemon
 */
export const getSuggestedIVs = (stats: IPokemonStats): IPokemonStats[] => {
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

/**
 * Based on PokeLab's data, will generate a model that fits into Let's Guide requirements
 */
export const createPokemonFromPokeLab = (pokemon: Pokedex.IPokemonSheet): IPokemonWithBaseCP => {
  const { nationalNumber, name: pName, types: pTypes, baseStats: pBaseStats } = pokemon;

  // Get pokemon types
  const types = {
    ownTypes: pTypes,
    relations: [] as ITypeRelations[],
  };

  // Get base stats
  const baseStats: IPokemonStats = {
    attack: pBaseStats[Stats.Attack],
    defense: pBaseStats[Stats.Defense],
    hp: pBaseStats[Stats.HP],
    spAttack: pBaseStats[Stats.SpecialAttack],
    spDefense: pBaseStats[Stats.SpecialDefense],
    speed: pBaseStats[Stats.Speed],
  };

  // Get baseCP
  const baseCP = getCombatPoints({ stats: baseStats });

  // Get alolan form flag
  const alolanForm = !!pokemon.isAlolan;

  // Get megaevolution data
  const megaEvolution = pokemon.megaEvolvedWith
    ? {
        evolvesWith: pokemon.megaEvolvedWith,
      }
    : undefined;

  // Get the ID
  const rawId = getPaddedId(String(nationalNumber));
  const id = alolanForm ? `${rawId}_f2` : getMegaevolutionId(rawId, pokemon.megaEvolvedWith);

  // Get the name
  const rawName = String(pName);
  const name = alolanForm
    ? `${rawName} ${getTranslation('forms-alolan')}`
    : getMegaevolutionName(rawName, pokemon.megaEvolvedWith);

  return {
    alolanForm,
    baseCP,
    baseStats,
    id,
    megaEvolution,
    name,
    nationalNumber,
    // @ts-ignore
    types,
  };
};

/**
 * Given an array of pokemon `Types`, will generate a map with all relations based on those types
 */
export const getTypeRelations = (types: PokemonType[]) => {
  const relations: ITypeRelations[] = [];

  // Loop through each one of current pokemon's types
  types.forEach(defendingType => {
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
          effectiveness,
          id: attackingType,
        });
      }
    });
  });

  return relations.filter(r => r.effectiveness !== 1).sort(sortBy('effectiveness'));
};

/**
 * Add some mocked information to a PokemonModel
 */
export const getRichPokemon = (basePokemon: IPokemonWithBaseCP): IRichPokemon => {
  // Get some hardcoded data
  const pokemonExtraInfo = pokemonExtraInfoList.find(pokemon => getPaddedId(pokemon.id) === basePokemon.id);

  // Get pokemon short description
  const description = String(pokemonExtraInfo ? pokemonExtraInfo.description : '');

  // Get pokedex entry (text)
  const pokedexEntry = String(pokemonExtraInfo ? pokemonExtraInfo.pokedexEntry : '');

  // Get an avatar
  const avatar = getAvatarFromId(basePokemon.id);

  // Get pokemon type strengths and weaknesses
  const relations = getTypeRelations(basePokemon.types.ownTypes);

  const types = {
    ...basePokemon.types,
    relations,
  };

  // Get base CP
  const baseCP = getCombatPoints({ stats: basePokemon.baseStats });

  // Get relative stats (for charts)
  const relativeStats: IPokemonStats = {
    attack: getStatRatio(basePokemon.baseStats[ATTACK_ID], MAX_INITIAL_STAT_VALUE) || 0,
    defense: getStatRatio(basePokemon.baseStats[DEFENSE_ID], MAX_INITIAL_STAT_VALUE) || 0,
    hp: getStatRatio(basePokemon.baseStats[HP_ID], MAX_INITIAL_STAT_VALUE) || 0,
    spAttack: getStatRatio(basePokemon.baseStats[SPECIAL_ATTACK_ID], MAX_INITIAL_STAT_VALUE) || 0,
    spDefense: getStatRatio(basePokemon.baseStats[SPECIAL_DEFENSE_ID], MAX_INITIAL_STAT_VALUE) || 0,
    speed: getStatRatio(basePokemon.baseStats[SPEED_ID], MAX_INITIAL_STAT_VALUE) || 0,
  };

  // Get suggested stats
  const suggestedStats: IPokemonStats[] = [];
  // const suggestedStats = getSuggestedIVs(basePokemon.baseStats);

  return {
    ...basePokemon,
    avatar,
    baseCP,
    description,
    pokedexEntry,
    relativeStats,
    suggestedStats,
    types,
  };
};
