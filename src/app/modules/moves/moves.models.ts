import { AnyAction } from 'redux';
import { mockedMovessCollection } from '../../../common/apis/mocks';
import { sortBy } from '../../utils/arrays';
import { getTypeRelations } from '../../utils/pokemon';
import { getLocale } from '../../utils/translations';

import { MovesActionType } from '../../../constants/actionTypes';
import { paginationSize } from '../../../constants/features';
import {
  MAX_ACCURACY_VALUE,
  MAX_POWER_VALUE,
  MAX_PP_VALUE,
  MIN_POWER_VALUE,
  MIN_PP_VALUE,
} from '../../../constants/moves/moves';
import { getMovesCategories, MovesCategory } from '../../../constants/moves/moves-categories';
import { getMoveName } from '../../../constants/moves/moves-names';
import { getTypes, PokemonType } from '../../../constants/pokemon/pokemon-types';

import { ITypeRelations } from '../pokedex/pokedex.models';

export interface IMovesAction extends AnyAction {
  type: MovesActionType;
}

interface IMoveTypeData {
  ownType: PokemonType;
  relations: ITypeRelations[];
}

interface IMove {
  accuracy?: number;
  effect: string;
  id: string;
  power?: number;
  pp?: number;
  probability?: number;
  tm?: number;
}

export interface IScrappedMove extends IMove {
  category?: string;
  name?: string | null;
  type: string | null;
}

export interface IRichMove extends IMove {
  category?: MovesCategory;
  name: string;
  types: IMoveTypeData;
}

export interface IMovesPagination {
  first: number;
  last: number;
}

export interface IMovePagination {
  next: IRichMove;
  prev: IRichMove;
}

export type ShowOrHideFilter = 'hide' | 'show-only' | 'show-all';

export interface IMovesFilters {
  accuracy: [number, number];
  category?: MovesCategory;
  canBeLearntBy: string[];
  excludedTypes: PokemonType[];
  includedTypes: PokemonType[];
  nameOrId: string;
  power: [number, number];
  pp: [number, number];
  strongAgainst: PokemonType[];
  showTm?: ShowOrHideFilter;
  weakAgainst: PokemonType[];
}

export interface IMovePokemonRelation {
  move: string;
  pokemon: Array<{
    id: string;
  }>;
}

export interface IMovesState {
  collection: IRichMove[];
  filters: IMovesFilters;
  pagination: IMovesPagination;
  relations: IMovePokemonRelation[];
  sort: {
    sortBy: string;
    order: string;
  };
}

export const movesInitialState: IMovesState = {
  collection: [],
  filters: {
    accuracy: [0, MAX_ACCURACY_VALUE],
    canBeLearntBy: [],
    category: undefined,
    excludedTypes: [],
    includedTypes: [],
    nameOrId: '',
    power: [MIN_POWER_VALUE, MAX_POWER_VALUE],
    pp: [MIN_PP_VALUE, MAX_PP_VALUE],
    showTm: 'show-all',
    strongAgainst: [],
    weakAgainst: [],
  },
  pagination: {
    first: 0,
    last: paginationSize,
  },
  relations: [],
  sort: {
    order: 'asc',
    sortBy: 'name',
  },
};

/**
 * Based on PokeLab's data, will generate a model that fits into Let's Guide requirements
 */
const createMoveFromPokeLab = (move: IScrappedMove): IRichMove | undefined => {
  const { type, ...rest } = move;

  // No valid move type
  const parsedTypes = getTypes();
  if (!type || parsedTypes.findIndex(t => t.id === type) < 0) {
    return undefined;
  }

  // No valid move category
  const categories = getMovesCategories();
  if (!rest.category || categories.findIndex(c => c === rest.category) < 0) {
    return undefined;
  }

  const relations = type ? getTypeRelations([type]) : [];

  const types = {
    ownType: type as PokemonType,
    relations,
  };

  const locale = getLocale('game');

  return {
    ...rest,
    category: rest.category as MovesCategory,
    name: getMoveName(rest.id, locale),
    types,
  };
};

export const createMovesCollectionFromPokeLab = (): IRichMove[] =>
  mockedMovessCollection
    .map(createMoveFromPokeLab)
    .filter(m => !!m)
    // @ts-ignore
    .sort(sortBy('name', 'asc'));
