import { PokemonType } from '../../../constants/pokemon-types';

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
  avatar: string;
  description?: string;
  types: Array<PokemonType>;

  stats: PokemonStats;
}

export interface PokemonListState {
  collection: Array<Pokemon>;
}
