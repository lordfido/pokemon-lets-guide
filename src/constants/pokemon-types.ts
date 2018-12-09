import { Types } from 'pokelab-lets-go';
import { getTranslation } from '../app/utils/translations';

export type PokemonType = Types.Type;

export const getType = (pokemonType: string): PokemonType | void =>
  Types.All.find(type => type === pokemonType) || undefined;

export const getTypes = (): Array<{ id: PokemonType; name: string }> =>
  Types.All.map(type => ({ id: type, name: getTranslation(`type-${type}`) }));
