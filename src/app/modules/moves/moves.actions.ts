import { ActionCreator } from '../../../definitions/action-creator';

import {
  MOVES_CREATE,
  MOVES_FILTER,
  MOVES_LOAD_MORE,
  MOVES_RESET_FILTERS,
  MOVES_SORT,
  MOVES_UPDATE_RELATIONS,
} from '../../../constants/actionTypes';
import { getPokemonMovesRelation } from '../../../constants/pokemon/pokemon-moves-relations';

import { createMovesCollectionFromPokeLab } from './moves.models';

interface IFilters {
  name: string;
  value: string | string[] | boolean;
}

interface ISort {
  sortBy: string;
  order: string;
}

export const createMoves: ActionCreator = () => dispatch => {
  // Send them to the store
  dispatch({
    payload: {
      collection: createMovesCollectionFromPokeLab(),
    },
    type: MOVES_CREATE,
  });
};

export const filterMoves: ActionCreator = (filters: IFilters[]) => dispatch => {
  dispatch({
    payload: { filters },
    type: MOVES_FILTER,
  });
};

export const loadMoreMoves: ActionCreator = () => dispatch => {
  dispatch({
    type: MOVES_LOAD_MORE,
  });
};

export const resetMovesFilters: ActionCreator = () => dispatch => {
  dispatch({
    type: MOVES_RESET_FILTERS,
  });
};

export const sortMoves: ActionCreator = (sort: ISort) => dispatch => {
  dispatch({
    payload: {
      sort,
    },
    type: MOVES_SORT,
  });
};

export const updateMovesRelations: ActionCreator = () => dispatch => {
  const rawRelations = getPokemonMovesRelation();
  const moves = createMovesCollectionFromPokeLab();

  const relations = moves.map(move => {
    const canBeLearntBy = rawRelations.filter(rel => rel.moves.find(m => m.id === move.id));

    return {
      move: move.id,
      pokemon: canBeLearntBy.map(rel => {
        const selectedMove = rel.moves.find(m => m.id === move.id);

        return {
          id: rel.pokemon,
          level: selectedMove ? selectedMove.level : undefined,
        };
      }),
    };
  });

  dispatch({
    payload: {
      relations,
    },
    type: MOVES_UPDATE_RELATIONS,
  });
};
