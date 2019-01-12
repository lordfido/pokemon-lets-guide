import { Languages, Natures } from 'pokelab';
import { getLocale } from '../app/utils/translations';

import { PokemonNature } from './pokemon-natures';

export const getNatureName = (nature?: PokemonNature) =>
  nature ? Natures.getName(nature, Languages.All[getLocale()]) : '';
