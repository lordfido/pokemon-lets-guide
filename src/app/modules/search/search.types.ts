import { PokemonType } from '../../../constants/pokemon-types';
import { StatId } from '../../../constants/pokemon-stats';

export interface SearchState {
  number: number | void;
  name: string;
  type: Array<PokemonType>;
  bestStats: Array<StatId>;
  worstStats: Array<StatId>;
  canLearnSkills: Array<StatId>;
  canLearnMTs: Array<StatId>;
  dropsCandies: Array<StatId>;
  needsCandies: Array<StatId>;
}
