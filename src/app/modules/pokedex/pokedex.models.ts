import { Pokedex, Stats } from 'pokelab-lets-go';
import { MegaStone } from 'pokelab-lets-go/dist/cjs/items';
import { AnyAction } from 'redux';
import { sortBy } from '../../utils/arrays';
import { getCombatPoints, getMegaevolutionId, getMegaevolutionName, getPaddedId } from '../../utils/pokemon';
import { getTranslation } from '../../utils/translations';

import { PokedexActionType } from '../../../constants/actionTypes';
import { paginationSize } from '../../../constants/features';
import { StatId } from '../../../constants/pokemon-stats';
import { PokemonType } from '../../../constants/pokemon-types';

export interface IPokedexAction extends AnyAction {
  type: PokedexActionType;
}
export interface IMegaEvolution {
  evolvesWith: MegaStone;
}

export interface ITypeRelations {
  id: PokemonType;
  effectiveness: number;
}

export interface IPokemonTypeData {
  ownTypes: ReadonlyArray<PokemonType>;
  relations: ITypeRelations[];
}

export interface IPokemonStats {
  attack: number;
  spAttack: number;
  defense: number;
  spDefense: number;
  hp: number;
  speed: number;
}

export interface IAdditionalPokemonInfo {
  id: string;
  description: string;
  pokedexEntry: string;
}

export interface IPokemon {
  id: string;
  nationalNumber: number;
  name: string;
  types: IPokemonTypeData;
  baseStats: IPokemonStats;
  alolanForm: boolean;
  megaEvolution?: IMegaEvolution;
}

export interface IPokemonWithBaseCP extends IPokemon {
  baseCP: number;
}

export interface IRichPokemon extends IPokemonWithBaseCP {
  description: string;
  avatar: string;
  relativeStats: IPokemonStats;
  suggestedStats?: IPokemonStats[];
  pokedexEntry: string;
}

export interface IPokemonListPagination {
  first: number;
  last: number;
}

export interface IPokemonDetailPagination {
  next: IPokemon;
  prev: IPokemon;
}

export interface IPokedexFilters {
  bestStats: StatId[];
  // canLearnSkills: StatId[];
  // canLearnMTs: StatId[];
  // dropsCandies: StatId[];
  excludedTypes: PokemonType[];
  includedTypes: PokemonType[];
  maxBaseCP: string;
  minBaseCP: string;
  nameOrNumber: string;
  // needsCandies: StatId[];
  showAlolanForms: boolean;
  showMegaevolutions: boolean;
  strongAgainst: PokemonType[];
  weakAgainst: PokemonType[];
  worstStats: StatId[];
}

export interface IPokedexState {
  collection: IPokemonWithBaseCP[];
  filters: IPokedexFilters;
  pagination: IPokemonListPagination;
  sort: {
    sortBy: string;
    order: string;
  };
}

export const pokedexInitialState: IPokedexState = {
  collection: [],
  filters: {
    bestStats: [],
    // canLearnMTs: [],
    // canLearnSkills: [],
    // dropsCandies: [],
    excludedTypes: [],
    includedTypes: [],
    maxBaseCP: '',
    minBaseCP: '',
    nameOrNumber: '',
    // needsCandies: [],
    showAlolanForms: false,
    showMegaevolutions: false,
    strongAgainst: [],
    weakAgainst: [],
    worstStats: [],
  },
  pagination: {
    first: 0,
    last: paginationSize,
  },
  sort: {
    order: 'asc',
    sortBy: 'id',
  },
};

/**
 * Based on PokeLab's data, will generate a model that fits into Let's Guide requirements
 */
const createPokemonFromPokeLab = (pokemon: Pokedex.IPokemonSheet): IPokemonWithBaseCP => {
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
    types,
  };
};

export const createPokemonCollectionFromPokeLab = (): IPokemonWithBaseCP[] =>
  Pokedex.All.map(createPokemonFromPokeLab).sort(sortBy('id', 'asc'));
