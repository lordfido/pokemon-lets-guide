import { Types } from 'pokelab-lets-go';
import { getTranslation } from '../app/utils/translations';

export type PokemonType = Types.Type;

interface IParsedType {
  id: PokemonType;
  name: string;
}
export const getTypes = (): IParsedType[] =>
  Types.All.map(type => ({ id: type, name: getTranslation(`type-${type}`) }));
