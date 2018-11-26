import { capitalize } from '../app/utils/strings';

export type PokemonType =
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'grass'
  | 'ghost'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'water';

export const BUG: PokemonType = 'bug';
export const DARK: PokemonType = 'dark';
export const DRAGON: PokemonType = 'dragon';
export const ELECTRIC: PokemonType = 'electric';
export const FAIRY: PokemonType = 'fairy';
export const FIGHTING: PokemonType = 'fighting';
export const FIRE: PokemonType = 'fire';
export const FLYING: PokemonType = 'flying';
export const GRASS: PokemonType = 'grass';
export const GHOST: PokemonType = 'ghost';
export const GROUND: PokemonType = 'ground';
export const ICE: PokemonType = 'ice';
export const NORMAL: PokemonType = 'normal';
export const POISON: PokemonType = 'poison';
export const PSYCHIC: PokemonType = 'psychic';
export const ROCK: PokemonType = 'rock';
export const STEEL: PokemonType = 'steel';
export const WATER: PokemonType = 'water';

const types = [
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
];

export const getType = (pokemonType: string): PokemonType | void =>
  types.find(type => type === String(pokemonType).toLowerCase()) || undefined;

export const getTypes = (): Array<{ id: PokemonType; name: string }> =>
  types.map(type => ({ id: type, name: capitalize(type) }));

const typeIcons = {
  [BUG]: require('../assets/images/type-icons/bug.png'),
  [DARK]: require('../assets/images/type-icons/dark.png'),
  [DRAGON]: require('../assets/images/type-icons/dragon.png'),
  [ELECTRIC]: require('../assets/images/type-icons/electric.png'),
  [FAIRY]: require('../assets/images/type-icons/fairy.png'),
  [FIGHTING]: require('../assets/images/type-icons/fighting.png'),
  [FIRE]: require('../assets/images/type-icons/fire.png'),
  [FLYING]: require('../assets/images/type-icons/flying.png'),
  [GRASS]: require('../assets/images/type-icons/grass.png'),
  [GHOST]: require('../assets/images/type-icons/ghost.png'),
  [GROUND]: require('../assets/images/type-icons/ground.png'),
  [ICE]: require('../assets/images/type-icons/ice.png'),
  [NORMAL]: require('../assets/images/type-icons/normal.png'),
  [POISON]: require('../assets/images/type-icons/poison.png'),
  [PSYCHIC]: require('../assets/images/type-icons/psychic.png'),
  [ROCK]: require('../assets/images/type-icons/rock.png'),
  [STEEL]: require('../assets/images/type-icons/steel.png'),
  [WATER]: require('../assets/images/type-icons/water.png'),
};

export const getTypeIcon = (pokemonType: PokemonType): string => typeIcons[pokemonType];
