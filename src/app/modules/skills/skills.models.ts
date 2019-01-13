import { paginationSize } from '../../../constants/features';
import { PokemonType } from '../../../constants/pokemon/pokemon-types';
import {
  MAX_ACCURACY_VALUE,
  MAX_POWER_VALUE,
  MAX_PP_VALUE,
  MAX_PROBABILITY_VALUE,
} from '../../../constants/skills/skills';

import { ITypeRelations } from '../pokedex/pokedex.models';

type SkillCategory = 'physical' | 'special' | 'status';

export interface ISkillTypeData {
  ownType: PokemonType;
  relations: ITypeRelations;
}

export interface ISkill {
  accuracy: number;
  category: SkillCategory;
  effect: string;
  probability: number;
  id: string;
  power: number;
  pp: number;
  tm?: string;
  types: ISkillTypeData;
}

export interface ISkillsPagination {
  first: number;
  last: number;
}

export interface ISkillPagination {
  next: ISkill;
  prev: ISkill;
}

export interface ISkillsFilters {
  accuracy: [number, number];
  category?: SkillCategory;
  excludedTypes: PokemonType[];
  includedTypes: PokemonType[];
  power: [number, number];
  pp: [number, number];
  probability: [number, number];
  strongAgainst: PokemonType[];
  /**
   * TODO
   *
   * By defaul all skills will be shown.
   *
   * If user enable this filter (checkbox), a switch appears
   * so user can decide user show only MTs or only not-MTs skills
   */
  tm?: boolean;
  weakAgainst: PokemonType[];
}

export interface ISkillsState {
  collection: ISkill[];
  filters: ISkillsFilters;
  pagination: ISkillsPagination;
  sort: {
    sortBy: string;
    order: string;
  };
}

export const skillsInitialState: ISkillsState = {
  collection: [],
  filters: {
    accuracy: [0, MAX_ACCURACY_VALUE],
    category: undefined,
    excludedTypes: [],
    includedTypes: [],
    power: [0, MAX_POWER_VALUE],
    pp: [0, MAX_PP_VALUE],
    probability: [0, MAX_PROBABILITY_VALUE],
    strongAgainst: [],
    tm: undefined,
    weakAgainst: [],
  },
  pagination: {
    first: 0,
    last: paginationSize,
  },
  sort: {
    order: 'asc',
    sortBy: 'id',
  },
};
