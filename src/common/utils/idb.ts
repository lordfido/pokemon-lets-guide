import * as idb from 'idb-keyval';
import { log } from '../../common/utils/logger';

import { IRootState } from '../../app/root.types';
import { ILastSession, IWorkerConfig } from '../../definitions/idb';

const read = (selectedTable: string): Promise<any> => {
  log(`reading ${selectedTable}`);

  return idb.get(selectedTable);
};

const write = (selectedTable: string, value: any) => {
  log(`writing ${selectedTable}`);

  return idb.set(selectedTable, value);
};

const remove = (selectedTable: string) => {
  log(`deleting ${selectedTable}`);

  return idb.del(selectedTable);
};

/**
 * Persist Redux store on IDB
 */
export const setStore = (value: IRootState) => write('store', value);
/**
 * Read persisted Redux store
 */
export const getStore = (): Promise<IRootState> => read('store').then(response => response || {});
/**
 * Clear persisted Redux store
 */
export const clearStore = () => remove('store');

/**
 * Persist Worker config
 */
export const setWorkerConfig = (workerConfig: IWorkerConfig) => write('worker.config', workerConfig);
/**
 * Read persisted Worker config
 */
export const getWorkerConfig = (): Promise<IWorkerConfig> => read('worker.config').then(response => response || {});
/**
 * Clear persisted Worker config
 */
export const clearWorkerConfig = () => remove('worker.config');

/**
 * Persist Last session
 */
export const setLastSession = (value: ILastSession) => write('lastSession', value);
/**
 * Read persisted Last session
 */
export const getLastSession = (): Promise<ILastSession> => read('lastSession').then(response => response || {});
/**
 * Clear persisted Last session
 */
export const clearLastSession = () => remove('lastSession');
