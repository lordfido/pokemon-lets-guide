import { Natures, Languages } from 'pokelab-lets-go';
import { getLocale } from '../app/utils/translations';

export type PokemonNature = Natures.Nature;

interface ParsedNature {
  id: PokemonNature;
  name: string;
}

export const getNatures = (): Array<ParsedNature> =>
  Natures.All.map(nature => ({
    id: nature,
    name: Natures.getName(nature, Languages.All[getLocale()]),
  }));
