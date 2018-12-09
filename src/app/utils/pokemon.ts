import { Pokedex, Stats, Types } from 'pokelab-lets-go';
import { MegaStone } from 'pokelab-lets-go/dist/cjs/items';
import { sortBy } from './arrays';
import { getTranslation } from './translations';

import pokemonExtraInfoList from '../../common/apis/mocks';

import { MAX_IV_VALUE } from '../../constants/pokemon-ivs';
import { PokemonNature } from '../../constants/pokemon-natures';
import {
  ATTACK_ID,
  DEFENSE_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  HP_ID,
  SPEED_ID,
  StatId,
  MAX_INITIAL_STAT_VALUE,
  MAX_STAT_VALUE,
} from '../../constants/pokemon-stats';
import { PokemonType } from '../../constants/pokemon-types';

import {
  PokemonStats,
  RichPokemon,
  TypeRelations,
  PokemonWithBaseCP,
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
  let number = String(pokemonId);

  if (pokemonId.length === 1) number = `00${pokemonId}`;
  else if (pokemonId.length === 2) number = `0${pokemonId}`;

  return number;
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
  if (!evolvesWith) return id;

  const megaOptions = [
    {
      name: 'X',
      form: 'f2',
    },
    {
      name: 'Y',
      form: 'f3',
    },
    {
      name: 'Z',
      form: 'f4',
    },
  ];

  for (const index in megaOptions) {
    const option = megaOptions[index];
    if (new RegExp(option.name).test(evolvesWith)) {
      return `${id}_${option.form}`;
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
  if (!evolvesWith) return name;

  const megaOptions = ['X', 'Y'];
  for (const index in megaOptions) {
    const option = megaOptions[index];
    if (new RegExp(option).test(evolvesWith)) {
      return `Mega ${name} ${option}`;
    }
  }

  return `Mega ${name}`;
};

/**
 * Fetch the avatar of selected pokemon from www.pokemon.com
 */
export const getAvatarFromId = (pokemonId: string): string =>
  `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getPaddedId(pokemonId)}.png`;

interface GetCPArguments {
  stats: PokemonStats;
  level?: number;
  ivs?: PokemonStats;
  avs?: number;
  nature?: PokemonNature;
}
/**
 * This formula calculates the CP of a pokemon, based on its Level, Stats and AVs
 */
const getCombatPoints = ({ stats, level = 1, ivs, avs = 0, nature }: GetCPArguments): number => {
  // floor(((HP+Atk+Def+SAtk+SDef+Spd) * Level * 6 / 100) + (TotalAVs * ((Level / 4) / 100 + 2)))

  const allStats =
    stats[ATTACK_ID] +
    stats[SPECIAL_ATTACK_ID] +
    stats[DEFENSE_ID] +
    stats[SPECIAL_DEFENSE_ID] +
    stats[HP_ID] +
    stats[SPEED_ID];

  // return Math.floor((allStats * level * 6) / 100 + avs * (level / 4 / 100 + 2));
  return allStats;
};

type GetSortedStatsStats = Array<{ name: StatId; value: number }>;
type GetSortedStatsOrder = 'asc' | 'desc';
/**
 * Returns ordered stats
 */
export const getSortedStats = (stats: GetSortedStatsStats, order: GetSortedStatsOrder = 'desc'): Array<StatId> =>
  stats.sort(sortBy('value', order)).map(stat => stat.name);

/**
 * Given a number of `perfectIVs` desired, and the `stats` ordered, will generate a map with
 * the ones that should be perfect when capturing the pokemon
 */
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

/**
 * Given a pokemon `stats`, will generate an array with 5 cases, each one with
 * that number of perfect IVs, so you can know wich IVs are more important to
 * selected pokemon
 */
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

/**
 * Based on PokeLab's data, will generate a model that fits into Let's Guide requirements
 */
export const createPokemonFromPokeLab = (pokemon: Pokedex.PokemonSheet): PokemonWithBaseCP => {
  const { nationalNumber, name: pName, types: pTypes, baseStats: pBaseStats } = pokemon;

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
    id,
    nationalNumber,
    name,
    types,
    baseStats,
    baseCP,
    alolanForm,
    megaEvolution,
  };
};

/**
 * Given an array of pokemon `Types`, will generate a map with all relations based on those types
 */
export const getTypeRelations = (types: ReadonlyArray<PokemonType>) => {
  const relations: Array<TypeRelations> = [];

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
          id: attackingType,
          effectiveness,
        });
      }
    });
  });

  return relations.filter(r => r.effectiveness !== 1).sort(sortBy('effectiveness'));
};

/**
 * Add some mocked information to a PokemonModel
 */
export const getRichPokemon = (basePokemon: PokemonWithBaseCP): RichPokemon => {
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
  const relativeStats: PokemonStats = {
    hp: getStatRatio(basePokemon.baseStats[HP_ID], MAX_INITIAL_STAT_VALUE) || 0,
    attack: getStatRatio(basePokemon.baseStats[ATTACK_ID], MAX_INITIAL_STAT_VALUE) || 0,
    defense: getStatRatio(basePokemon.baseStats[DEFENSE_ID], MAX_INITIAL_STAT_VALUE) || 0,
    spAttack: getStatRatio(basePokemon.baseStats[SPECIAL_ATTACK_ID], MAX_INITIAL_STAT_VALUE) || 0,
    spDefense: getStatRatio(basePokemon.baseStats[SPECIAL_DEFENSE_ID], MAX_INITIAL_STAT_VALUE) || 0,
    speed: getStatRatio(basePokemon.baseStats[SPEED_ID], MAX_INITIAL_STAT_VALUE) || 0,
  };

  // Get suggested stats
  const suggestedStats: Array<PokemonStats> = [];
  // const suggestedStats = getSuggestedIVs(basePokemon.baseStats);

  return {
    ...basePokemon,
    description,
    pokedexEntry,
    avatar,
    types,
    baseCP,
    relativeStats,
    suggestedStats,
  };
};
