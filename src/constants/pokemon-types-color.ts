import { Types } from 'pokelab-lets-go';
import { PokemonType } from './pokemon-types';

const colors = {
  [Types.Bug]: '#9ac327',
  [Types.Dark]: '#676374',
  [Types.Dragon]: '#0a78c3',
  [Types.Electric]: '#fad755',
  [Types.Fairy]: '#e99ce2',
  [Types.Fighting]: '#cb425e',
  [Types.Fire]: '#f8a758',
  [Types.Flying]: '#a0b4e6',
  [Types.Ghost]: '#6a6bc7',
  [Types.Grass]: '#5bbf65',
  [Types.Ground]: '#d68953',
  [Types.Ice]: '#78d0c2',
  [Types.Normal]: '#9a9fa3',
  [Types.Poison]: '#b460c2',
  [Types.Psychic]: '#fc807e',
  [Types.Rock]: '#cac585',
  [Types.Steel]: '#5398a7',
  [Types.Water]: '#5ea7da',
};

export const getTypeColor = (pokemonType: PokemonType): string => colors[pokemonType] || colors[Types.Bug];
