import { LocalStorageModule, LocalStorageName } from '../../constants/localStorage';

/**
 * Get the value of a localStorage
 */
export const getLocalStorage = (moduleName: LocalStorageModule, keyName: LocalStorageName) => {
  try {
    const item = window.localStorage.getItem(`${moduleName}.${keyName}`);

    return item;
  } catch {
    return undefined;
  }
};
