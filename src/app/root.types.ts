import { PokemonState } from './modules/pokemon/pokemon.types';

export interface DefaultAction {
  type: string;
  payload?: any;
}

export interface RootState {
  pokemon: PokemonState;
}
