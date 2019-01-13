import { AnyAction } from 'redux';
import { mockedSkillsCollection } from '../../../common/apis/mocks';
import { sortBy } from '../../utils/arrays';
import { getTypeRelations } from '../../utils/pokemon';

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
import { SkillCategory } from '../../../constants/skills/skills-categories';

import { ITypeRelations } from '../pokedex/pokedex.models';

export interface ISkillsAction extends AnyAction {
  type: SkillsActionType;
}

export interface ISkillTypeData {
  ownType: PokemonType;
  relations: ITypeRelations[];
}

interface ISkill {
  accuracy?: number;
  category: SkillCategory;
  effect?: string;
  id: string;
  name: string;
  power?: number;
  pp: number;
  probability?: number;
  tm?: number;
}

export interface ISkillWithType extends ISkill {
  type: PokemonType;
}

export interface IRichSkill extends ISkill {
  types: ISkillTypeData;
}

export interface ISkillsPagination {
  first: number;
  last: number;
}

export interface ISkillPagination {
  next: IRichSkill;
  prev: IRichSkill;
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
  collection: IRichSkill[];
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
const createSkillFromPokeLab = (skill: ISkillWithType): IRichSkill => {
  const { type, ...rest } = skill;

  const relations = getTypeRelations([type]);

  const types = {
    ownType: type,
    relations,
  };

  return {
    ...rest,
    types,
  };
};

export const createSkillsCollectionFromPokeLab = (): IRichSkill[] =>
  mockedSkillsCollection.map(createSkillFromPokeLab).sort(sortBy('id', 'asc'));
