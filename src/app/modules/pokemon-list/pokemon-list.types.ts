import { PokemonType } from '../../../constants/pokemon-types';

export interface TypeRelations {
  id: PokemonType;
  effectiveness: number;
}

export interface PokemonTypeData {
  ownTypes: Array<PokemonType>;
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
  description?: string;

  avatar: string;

  baseCP: number;
  baseStats: PokemonStats;
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
