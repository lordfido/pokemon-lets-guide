import 'pwacompat';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setInstallationData } from './app/utils/installation';

import { error } from './common/utils/logger';
import { getStore, getLastSession, clearStore, setLastSession, clearWorkerConfig } from './common/utils/idb';

// Import the CSS
import './styles/main.scss';

import AppWrapper from './app/app-wrapper';
import ScrollToTop from './app/components/scroll-to-top';
import { RootState } from './app/root.types';
import buildStore from './common/utils/buildStore';

const packageJson = require('../package.json');
const backgroundImage = require('./assets/images/switch.png');

/**
 * Read persisted store and start a React application with persisted data
 */
const initReactApplication = async () => {
  // Set installation data (installationId)
  setInstallationData();

  // Get last session data
  const lastSession = await getLastSession();
  const isNewRelease = packageJson.version !== lastSession.version;
  let persistedStore: RootState | void;

  // If this is the firs time visiting application, or it's a different version
  if (isNewRelease) {
    // Remove persisted store and worker config
    await Promise.all([clearStore(), clearWorkerConfig()]);

    // If user is using the same version than last visit
  } else {
    // Get persisted store
    persistedStore = await getStore();
  }

  // Update last session data
  setLastSession({
    version: packageJson.version,
    route: location.pathname,
  });

  const store = await buildStore(persistedStore);

  const mountPoint = document.getElementById('app-wrapper');
  if (!!mountPoint) {
    mountPoint.style.backgroundImage = `url(${backgroundImage})`;
  }

  render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <AppWrapper lastRoute={lastSession.route} isNewRelease={isNewRelease} />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    mountPoint
  );
};

/**
 * Some package that need to be initialized before app starts
 */
const requiredInits: Array<Promise<any>> = [];
Promise.all(requiredInits).then(
  () => {
    initReactApplication();
  },
  err => {
    error('There was an error while initializing an SDK', err);
    initReactApplication();
  }
);
