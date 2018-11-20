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

export const getPokemonType = (pokemonType: string): PokemonType | void => {
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

  return types.find(type => type === String(pokemonType).toLowerCase());
};
