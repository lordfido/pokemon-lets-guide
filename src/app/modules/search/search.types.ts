import { PokemonType } from '../../../constants/pokemon-types';
import { StatId } from '../../../constants/pokemon-stats';

export interface SearchState {
  nameOrNumber: string | void;
  includedTypes: Array<PokemonType>;
  excludedTypes: Array<PokemonType>;
  bestStats: Array<StatId>;
  worstStats: Array<StatId>;
  showMegaevolutions: boolean;
  showAlolanForms: boolean;
  // canLearnSkills: Array<StatId>;
  // canLearnMTs: Array<StatId>;
  // dropsCandies: Array<StatId>;
  // needsCandies: Array<StatId>;
}
