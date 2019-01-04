import 'pwacompat';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setInstallationData } from './app/utils/installation';
import buildStore from './common/utils/buildStore';
import getCustomStyles from './common/utils/styles';

import { clearStore, clearWorkerConfig, getLastSession, getStore, setLastSession } from './common/utils/idb';
import { error } from './common/utils/logger';

// Import the CSS
import './styles/main.scss';

import AppWrapper from './app/app-wrapper';
import ScrollToTop from './app/components/scroll-to-top';

import { IRootState } from './app/root.models';

const packageJson = require('../package.json');
const backgroundImage = require('./assets/images/switch.png');
const htmlLogo = require('./images/logo.png');

/**
 * Read persisted store and start a React application with persisted data
 */
const initReactApplication = async () => {
  // Set installation data (installationId)
  setInstallationData({
    language: {
      value: navigator && navigator.language ? navigator.language : '',
    },
  });

  // Get last session data
  const lastSession = await getLastSession();
  const isNewRelease = packageJson.version !== lastSession.version;
  let persistedStore: IRootState | void;

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
    route: location.pathname,
    version: packageJson.version,
  });

  const store = await buildStore(persistedStore);

  getCustomStyles().forEach(styles => {
    document.head.appendChild(styles);
  });

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
