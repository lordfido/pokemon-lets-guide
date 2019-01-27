import { getLocalStorage } from '../../common/utils/localStorage';

import { POKEDEX_MODULE } from '../localStorage';

export type PokedexConfigKeys =
  | 'showName'
  | 'showNationalNumber'
  | 'showSprite'
  | 'showType1'
  | 'showType2'
  | 'showAttack'
  | 'showBaseStats'
  | 'showDefense'
  | 'showHp'
  | 'showSpecialAttack'
  | 'showSpecialDefense'
  | 'showSpeed'
  | 'showExecutioners'
  | 'showSuperiorityIndex'
  | 'showVictims'
  | 'showActions';

export interface IPokedexConfig {
  showName: boolean;
  showNationalNumber: boolean;
  showSprite: boolean;
  showType1: boolean;
  showType2: boolean;

  showAttack: boolean;
  showBaseStats: boolean;
  showDefense: boolean;
  showHp: boolean;
  showSpecialAttack: boolean;
  showSpecialDefense: boolean;
  showSpeed: boolean;

  showExecutioners: boolean;
  showSuperiorityIndex: boolean;
  showVictims: boolean;

  showActions: boolean;
}

const pokedex: IPokedexConfig = {
  showName: true,
  showNationalNumber: true,
  showSprite: true,
  showType1: true,
  showType2: true,

  showAttack: true,
  showBaseStats: true,
  showDefense: true,
  showHp: true,
  showSpecialAttack: true,
  showSpecialDefense: true,
  showSpeed: true,

  showExecutioners: false,
  showSuperiorityIndex: false,
  showVictims: false,

  showActions: true,
};

/**
 * Get all configs for pokedex module
 */
export const getAllPokedexConfig = () => {
  const persistedConfigs: { [key: string]: boolean } = {};

  Object.keys(pokedex).forEach(key => {
    const persistedConfig = getLocalStorage(POKEDEX_MODULE, key as PokedexConfigKeys);

    if (persistedConfig === 'true') {
      persistedConfigs[key] = true;
    } else if (persistedConfig === 'false') {
      persistedConfigs[key] = false;
    }
  });

  return {
    ...pokedex,
    ...persistedConfigs,
  };
};

/**
 * Get a particular value for pokedex config module
 */
export const getPokedexConfig = (key: PokedexConfigKeys) => {
  const persistedConfig = getLocalStorage(POKEDEX_MODULE, key);

  return typeof persistedConfig !== 'undefined' ? persistedConfig : pokedex[key];
};
