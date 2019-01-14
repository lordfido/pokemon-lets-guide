import { AnyAction } from 'redux';
import { mockedMovessCollection } from '../../../common/apis/mocks';
import { sortBy } from '../../utils/arrays';
import { getTypeRelations } from '../../utils/pokemon';

import { MovesActionType } from '../../../constants/actionTypes';
import { paginationSize } from '../../../constants/features';
import {
  MAX_ACCURACY_VALUE,
  MAX_POWER_VALUE,
  MAX_PP_VALUE,
  MAX_PROBABILITY_VALUE,
  MIN_POWER_VALUE,
  MIN_PP_VALUE,
} from '../../../constants/moves/moves';
import { MovesCategory } from '../../../constants/moves/moves-categories';
import { PokemonType } from '../../../constants/pokemon/pokemon-types';

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
  category?: MovesCategory;
  effect?: string;
  id: string;
  power?: number;
  pp?: number;
  probability?: number;
  tm?: number;
}

export interface IScrappedMove extends IMove {
  type: PokemonType;
}

export interface IRichMove extends IMove {
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

export interface IMovesFilters {
  accuracy: [number, number];
  category?: MovesCategory;
  // canBeLearntBy: string[];
  excludedTypes: PokemonType[];
  includedTypes: PokemonType[];
  power: [number, number];
  pp: [number, number];
  probability: [number, number];
  strongAgainst: PokemonType[];
  /**
   * TODO
   * By defaul all movements will be shown.
   *
   * If user enable this filter (checkbox), a switch appears
   * so user can decide user show only MTs or only not-MTs movements
   */
  tm?: boolean;
  weakAgainst: PokemonType[];
}

export interface IMovesState {
  collection: IRichMove[];
  filters: IMovesFilters;
  pagination: IMovesPagination;
  sort: {
    sortBy: string;
    order: string;
  };
}

export const movesInitialState: IMovesState = {
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
const createMoveFromPokeLab = (move: IScrappedMove): IRichMove => {
  const { type, ...rest } = move;

  const relations = getTypeRelations([type]);

  const types = {
    ownType: type,
    relations,
  };

  return {
    ...rest,
    name: '',
    types,
  };
};

export const createMovesCollectionFromPokeLab = (): IRichMove[] =>
  mockedMovessCollection.map(createMoveFromPokeLab).sort(sortBy('id', 'asc'));
