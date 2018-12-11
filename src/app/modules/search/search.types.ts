import { StatId } from '../../../constants/pokemon-stats';
import { PokemonType } from '../../../constants/pokemon-types';

export interface ISearchState {
  bestStats: StatId[];
  // canLearnSkills: StatId[];
  // canLearnMTs: StatId[];
  // dropsCandies: StatId[];
  excludedTypes: PokemonType[];
  includedTypes: PokemonType[];
  maxBaseCP?: string;
  minBaseCP?: string;
  nameOrNumber: string | void;
  // needsCandies: StatId[];
  showAlolanForms: boolean;
  showMegaevolutions: boolean;
  strongAgainst: PokemonType[];
  weakAgainst: PokemonType[];
  worstStats: StatId[];
}
