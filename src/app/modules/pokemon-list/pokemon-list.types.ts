import { PokemonType } from '../../../constants/pokemon-types';

export interface MegaEvolution {
  evolvesWith: string;
}

export interface TypeRelations {
  id: PokemonType;
  effectiveness: number;
}

export interface PokemonTypeData {
  ownTypes: ReadonlyArray<PokemonType>;
  relations: Array<TypeRelations>;
}

export interface PokemonStats {
  attack: number;
  spAttack: number;
  defense: number;
  spDefense: number;
  hp: number;
  speed: number;
}

export interface Pokemon {
  id: string;
  nationalNumber: number;
  name: string;
  types: PokemonTypeData;
  baseStats: PokemonStats;
  alolanForm: boolean;
  megaEvolution?: MegaEvolution;
}

export interface PokemonWithBaseCP extends Pokemon {
  baseCP: number;
}

export interface AdditionalPokemonInfo {
  id: string;
  description: string;
  pokedexEntry: string;
}

export interface RichPokemon extends Pokemon {
  description: string;
  avatar: string;
  baseCP: number;
  relativeStats: PokemonStats;
  suggestedStats?: Array<PokemonStats>;
  pokedexEntry: string;
}

export interface PokemonListState {
  collection: Array<PokemonWithBaseCP>;
  pagination: PokemonListPagination;
  sort: {
    sortBy: string;
    order: string;
  };
}

export interface PokemonListPagination {
  first: number;
  last: number;
}

export interface PokemonPagination {
  next: Pokemon;
  prev: Pokemon;
}
