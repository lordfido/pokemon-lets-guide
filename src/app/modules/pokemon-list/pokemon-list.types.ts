import { MegaStone } from 'pokelab-lets-go/dist/cjs/items';

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

export interface IPokemonListState {
  collection: IPokemonWithBaseCP[];
  pagination: IPokemonListPagination;
  sort: {
    sortBy: string;
    order: string;
  };
}

export interface IPokemonListPagination {
  first: number;
  last: number;
}

export interface IPokemonPagination {
  next: IPokemon;
  prev: IPokemon;
}
