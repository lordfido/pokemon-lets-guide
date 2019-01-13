import { Languages, Natures } from 'pokelab';
import { getLocale } from '../../app/utils/translations';

export type PokemonNature = Natures.Nature;

interface IParsedNature {
  id: PokemonNature;
  name: string;
}

export const getNatures = (): IParsedNature[] =>
  Natures.All.map(nature => ({
    id: nature,
    name: Natures.getName(nature, Languages.All[getLocale()]),
  }));
