import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { isDev, isPre } from './platforms';

import rootReducer from '../../app/root.reducer';

import { IRootState } from '../../app/root.models';

const buildStore = async (persistedStore?: IRootState | void) => {
  // @ts-ignore
  const composeEnhancers = isDev() || isPre() ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
  const store = createStore(rootReducer, persistedStore || {}, composeEnhancers(applyMiddleware(thunk)));

  return store;
};

export default buildStore;
