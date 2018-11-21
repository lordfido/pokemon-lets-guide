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
  | '#9ac327'
  | '#676374'
  | '#0a78c3'
  | '#fad755'
  | '#e99ce2'
  | '#cb425e'
  | '#f8a758'
  | '#a0b4e6'
  | '#6a6bc7'
  | '#5bbf65'
  | '#d68953'
  | '#78d0c2'
  | '#9a9fa3'
  | '#b460c2'
  | '#fc807e'
  | '#cac585'
  | '#5398a7'
  | '#5ea7da';

const colors: {
  [key: string]: PokemonTypeColor;
} = {
  [BUG]: '#9ac327',
  [DARK]: '#676374',
  [DRAGON]: '#0a78c3',
  [ELECTRIC]: '#fad755',
  [FAIRY]: '#e99ce2',
  [FIGHTING]: '#cb425e',
  [FIRE]: '#f8a758',
  [FLYING]: '#a0b4e6',
  [GHOST]: '#6a6bc7',
  [GRASS]: '#5bbf65',
  [GROUND]: '#d68953',
  [ICE]: '#78d0c2',
  [NORMAL]: '#9a9fa3',
  [POISON]: '#b460c2',
  [PSYCHIC]: '#fc807e',
  [ROCK]: '#cac585',
  [STEEL]: '#5398a7',
  [WATER]: '#5ea7da',
};

export const getTypeColor = (pokemonType: PokemonType): PokemonTypeColor => colors[pokemonType] || colors[BUG];
