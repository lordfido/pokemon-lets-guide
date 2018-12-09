import { Natures, Languages } from 'pokelab-lets-go';
import { getLocale } from '../app/utils/translations';

import { PokemonNature } from './pokemon-natures';

export const getNatureName = (nature: PokemonNature): String => Natures.getName(nature, Languages.All[getLocale()]);
