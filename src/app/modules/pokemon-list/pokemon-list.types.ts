import { PokemonType } from '../../../constants/pokemon-types';

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
  id: number;
  name: string;
  types: PokemonTypeData;
  baseStats: PokemonStats;
}

export interface AdditionalPokemonInfo {
  id: number;
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
  collection: Array<Pokemon>;
}

export interface PokemonPagination {
  next: Pokemon;
  prev: Pokemon;
}
