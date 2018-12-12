import { Pokedex } from 'pokelab-lets-go';
import { MegaStone } from 'pokelab-lets-go/dist/cjs/items';
import { sortBy } from '../../utils/arrays';
import { createPokemonFromPokeLab } from '../../utils/pokemon';

import { StatId } from '../../../constants/pokemon-stats';
import { PokemonType } from '../../../constants/pokemon-types';

export interface IMegaEvolution {
  evolvesWith: MegaStone;
}

export interface ITypeRelations {
  id: PokemonType;
  effectiveness: number;
}

export interface IPokemonTypeData {
  readonly ownTypes: PokemonType[];
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
  maxBaseCP?: string;
  minBaseCP?: string;
  nameOrNumber: string | void;
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

export const createPokemonCollectionFromPokeLab = (): IPokemonWithBaseCP[] =>
  Pokedex.All.map(createPokemonFromPokeLab).sort(sortBy('id', 'asc'));
