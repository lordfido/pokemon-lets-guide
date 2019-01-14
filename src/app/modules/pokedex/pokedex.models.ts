import { Pokedex, Stats } from 'pokelab';
import { AnyAction } from 'redux';
import { sortBy } from '../../utils/arrays';
import { getCombatPoints, getPaddedId, getVariantId, getVariantName } from '../../utils/pokemon';

import { PokedexActionType } from '../../../constants/actionTypes';
import { paginationSize } from '../../../constants/features';
import { MAX_BASE_CP_VALUE, StatId } from '../../../constants/pokemon/pokemon-stats';
import { PokemonType } from '../../../constants/pokemon/pokemon-types';

export interface IPokedexAction extends AnyAction {
  type: PokedexActionType;
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
  [key: string]: number;
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
  isAlolan: boolean;
  isMega: boolean;
}

export interface IPokemonWithBaseCP extends IPokemon {
  baseCP: number;
  extra?: any;
}

export interface IRichPokemon extends IPokemonWithBaseCP {
  description: string;
  avatar: string;
  relativeStats: IPokemonStats;
  suggestedStats?: IPokemonStats[];
  pokedexEntry: string;
}

export interface IPokedexPagination {
  first: number;
  last: number;
}

export interface IPokemonPagination {
  next: IPokemon;
  prev: IPokemon;
}

export interface IPokedexFilters {
  baseCP: [number, number];
  bestStats: StatId[];
  // canLearnMove: StatId[];
  // dropsCandies: StatId[];
  excludedTypes: PokemonType[];
  includedTypes: PokemonType[];
  showAlolanForms: boolean;
  showMegaevolutions: boolean;
  strongAgainst: PokemonType[];
  weakAgainst: PokemonType[];
  worstStats: StatId[];
}

export interface IPokedexState {
  collection: IPokemonWithBaseCP[];
  filters: IPokedexFilters;
  pagination: IPokedexPagination;
  sort: {
    sortBy: string;
    order: string;
  };
}

export const pokedexInitialState: IPokedexState = {
  collection: [],
  filters: {
    baseCP: [0, MAX_BASE_CP_VALUE],
    bestStats: [],
    // canLearnMoves: [],
    // dropsCandies: [],
    excludedTypes: [],
    includedTypes: [],
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
 * Only shows pokemon that are available in Pokemon Let's Go series, and remove its
 * variants (Pokemon partner (perfect IVs))
 */
const onlyPokemonLetsGo = (pokemon: Pokedex.Pokemon) =>
  // Pokemon Let's Go
  (pokemon.nationalNumber <= 151 || pokemon.nationalNumber === 808 || pokemon.nationalNumber === 809) &&
  // Remove partners
  (!pokemon.variant || new RegExp('Partner').test(pokemon.variant) === false);

/**
 * Based on PokeLab's data, will generate a model that fits into Let's Guide requirements
 */
const createPokemonFromPokeLab = (pokemon: Pokedex.Pokemon): IPokemonWithBaseCP => {
  const { nationalNumber, name: pName, types: pTypes, stats: pBaseStats, ...extra } = pokemon;

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

  // Get variants data
  const { isAlolan, isMega, variant } = pokemon;

  // Get the ID
  const rawId = getPaddedId(String(nationalNumber));
  const id = getVariantId({
    id: rawId,
    isAlolan,
    isMega,
    variant: 'megaVariant' in pokemon ? pokemon.megaVariant : variant,
  });

  // Get the name
  const rawName = String(pName);
  const name = getVariantName({
    isAlolan,
    isMega,
    name: rawName,
    variant: 'megaVariant' in pokemon ? pokemon.megaVariant : variant,
  });

  return {
    baseCP,
    baseStats,
    extra,
    id,
    isAlolan: !!isAlolan,
    isMega: !!isMega,
    name,
    nationalNumber,
    types,
  };
};

export const createPokemonCollectionFromPokeLab = (): IPokemonWithBaseCP[] =>
  Pokedex.All.filter(onlyPokemonLetsGo)
    .map(createPokemonFromPokeLab)
    .sort(sortBy('id', 'asc'));
