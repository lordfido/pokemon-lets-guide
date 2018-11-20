import {
  PokemonType,
  BUG,
  DARK,
  DRAGON,
  ELECTRIC,
  FAIRY,
  FIGHTING,
  FIRE,
  FLYING,
  GRASS,
  GHOST,
  GROUND,
  ICE,
  NORMAL,
  POISON,
  PSYCHIC,
  ROCK,
  STEEL,
  WATER,
} from './pokemon-types';

export type PokemonTypeColor =
  | '#A8B820'
  | '#705848'
  | '#7038F8'
  | '#F8D030'
  | '#F0B6BC'
  | '#C03028'
  | '#F08030'
  | '#A890F0'
  | '#78C850'
  | '#705898'
  | '#E0C068'
  | '#98D8D8'
  | '#A8A878'
  | '#A040A0'
  | '#F85888'
  | '#B8A038'
  | '#B8B8D0'
  | '#6890F0';

const colors: {
  [key: string]: PokemonTypeColor;
} = {
  [BUG]: '#A8B820',
  [DARK]: '#705848',
  [DRAGON]: '#7038F8',
  [ELECTRIC]: '#F8D030',
  [FAIRY]: '#F0B6BC',
  [FIGHTING]: '#C03028',
  [FIRE]: '#F08030',
  [FLYING]: '#A890F0',
  [GRASS]: '#78C850',
  [GHOST]: '#705898',
  [GROUND]: '#E0C068',
  [ICE]: '#98D8D8',
  [NORMAL]: '#A8A878',
  [POISON]: '#A040A0',
  [PSYCHIC]: '#F85888',
  [ROCK]: '#B8A038',
  [STEEL]: '#B8B8D0',
  [WATER]: '#6890F0',
};

export const getTypeColor = (pokemonType: PokemonType): PokemonTypeColor => colors[pokemonType];
