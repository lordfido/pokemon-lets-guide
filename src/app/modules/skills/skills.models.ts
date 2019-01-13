import { AnyAction } from 'redux';
import { sortBy } from '../../utils/arrays';

import { SkillsActionType } from '../../../constants/actionTypes';
import { paginationSize } from '../../../constants/features';
import { PokemonType } from '../../../constants/pokemon/pokemon-types';
import {
  MAX_ACCURACY_VALUE,
  MAX_POWER_VALUE,
  MAX_PP_VALUE,
  MAX_PROBABILITY_VALUE,
  MIN_POWER_VALUE,
  MIN_PP_VALUE,
} from '../../../constants/skills/skills';

import { ITypeRelations } from '../pokedex/pokedex.models';

export interface ISkillsAction extends AnyAction {
  type: SkillsActionType;
}

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
    power: [MIN_POWER_VALUE, MAX_POWER_VALUE],
    pp: [MIN_PP_VALUE, MAX_PP_VALUE],
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

/**
 * Based on PokeLab's data, will generate a model that fits into Let's Guide requirements
 */
const createSkillFromPokeLab = (skill: any): ISkill => skill;

export const createSkillsCollectionFromPokeLab = (): ISkill[] =>
  [].map(createSkillFromPokeLab).sort(sortBy('id', 'asc'));
