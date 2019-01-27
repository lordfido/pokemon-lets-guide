import { getLocalStorage } from '../../common/utils/localStorage';

import { MOVES_MODULE } from '../localStorage';

export type MovesConfigKeys =
  | 'showId'
  | 'showName'
  | 'showType'
  | 'showAccuracy'
  | 'showCategory'
  | 'showPower'
  | 'showPp'
  | 'showProbability'
  | 'showTm'
  | 'showActions';

export interface IMovesConfig {
  showId: boolean;
  showName: boolean;
  showType: boolean;
  showAccuracy: boolean;
  showCategory: boolean;
  showPower: boolean;
  showPp: boolean;
  showProbability: boolean;
  showTm: boolean;
  showActions: boolean;
}

const moves: IMovesConfig = {
  showId: true,
  showName: true,
  showType: true,

  showAccuracy: true,
  showCategory: true,
  showPower: true,

  showPp: true,
  showProbability: true,
  showTm: true,

  showActions: true,
};

/**
 * Get all configs for moves module
 */
export const getAllMovesConfig = () => {
  const persistedConfigs: { [key: string]: boolean } = {};

  Object.keys(moves).forEach(key => {
    const persistedConfig = getLocalStorage(MOVES_MODULE, key as MovesConfigKeys);

    if (persistedConfig === 'true') {
      persistedConfigs[key] = true;
    } else if (persistedConfig === 'false') {
      persistedConfigs[key] = false;
    }
  });

  return {
    ...moves,
    ...persistedConfigs,
  };
};

/**
 * Get a particular value for moves config module
 */
export const getMovesConfig = (key: MovesConfigKeys) => {
  const persistedConfig = getLocalStorage(MOVES_MODULE, key);

  return typeof persistedConfig !== 'undefined' ? persistedConfig : moves[key];
};
