import { Types } from 'pokelab-lets-go';
import { getTranslation } from './translations';

export type PokemonType =
  | 'Bug'
  | 'Dark'
  | 'Dragon'
  | 'Electric'
  | 'Fairy'
  | 'Fighting'
  | 'Fire'
  | 'Flying'
  | 'Grass'
  | 'Ghost'
  | 'Ground'
  | 'Ice'
  | 'Normal'
  | 'Poison'
  | 'Psychic'
  | 'Rock'
  | 'Steel'
  | 'Water';

export const BUG: PokemonType = Types.Bug;
export const DARK: PokemonType = Types.Dark;
export const DRAGON: PokemonType = Types.Dragon;
export const ELECTRIC: PokemonType = Types.Electric;
export const FAIRY: PokemonType = Types.Fairy;
export const FIGHTING: PokemonType = Types.Fighting;
export const FIRE: PokemonType = Types.Fire;
export const FLYING: PokemonType = Types.Flying;
export const GRASS: PokemonType = Types.Grass;
export const GHOST: PokemonType = Types.Ghost;
export const GROUND: PokemonType = Types.Ground;
export const ICE: PokemonType = Types.Ice;
export const NORMAL: PokemonType = Types.Normal;
export const POISON: PokemonType = Types.Poison;
export const PSYCHIC: PokemonType = Types.Psychic;
export const ROCK: PokemonType = Types.Rock;
export const STEEL: PokemonType = Types.Steel;
export const WATER: PokemonType = Types.Water;

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
  types.find(type => type === pokemonType) || undefined;

export const getTypes = (): Array<{ id: PokemonType; name: string }> =>
  types.map(type => ({ id: type, name: getTranslation(`type-${type}`) }));

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
