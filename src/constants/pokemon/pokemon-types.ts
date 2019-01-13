import { Languages, Types } from 'pokelab';
import { getLocale } from '../../app/utils/translations';

export type PokemonType = Types.Type;

export const getTypeName = (type: PokemonType) => Types.getName(type, Languages.All[getLocale()]);

interface IParsedType {
  id: PokemonType;
  name: string;
}
export const getTypes = (): IParsedType[] => Types.All.map(type => ({ id: type, name: getTypeName(type) }));
