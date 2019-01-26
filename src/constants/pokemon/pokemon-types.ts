import { Languages, Types } from 'pokelab';
import { getLocale } from '../../app/utils/translations';

import { IPokemonWithBaseCP } from '../../app/modules/pokedex/pokedex.models';

export type PokemonType = Types.Type;

export const getTypeName = (type: PokemonType) => Types.getName(type, Languages.All[getLocale('game')]);

interface IParsedType {
  id: PokemonType;
  name: string;
}
export const getTypes = (): IParsedType[] => Types.All.map(type => ({ id: type, name: getTypeName(type) }));

export const getPokemonOfType = (type: PokemonType, pokemonList: IPokemonWithBaseCP[] = []) => {
  const mainType = pokemonList.filter(p => p.types.ownTypes[0] === type);

  if (mainType.length) {
    return mainType;
  }

  return pokemonList.filter(p => p.types.ownTypes[1] === type);
};
