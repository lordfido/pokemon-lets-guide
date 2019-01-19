import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import analyticsApi from '../common/apis/analytics';
import { setLastSession, setStore } from '../common/utils/idb';
import { log } from '../common/utils/logger';
import { isPre, isProduction } from '../common/utils/platforms';
import registerServiceWorker from './utils/service-worker';

import AppView from './app-view';
import routes from './app.routes';

import { createMoves } from './modules/moves/moves.actions';
import { createPokedex } from './modules/pokedex/pokedex.actions';

import { restoreLastRoute } from '../constants/features';
import { APP_FINISHED, APP_INIT } from '../constants/metrics/actions';
import { APP_LOAD } from '../constants/metrics/categories';

import { IRootState } from './root.models';

const packageJson = require('../../package.json');
const appVersion = packageJson.version;

interface ICustomStore extends IRootState {
  [index: string]: any;
}

interface IOwnProps {
  lastRoute: string;
  isNewRelease: boolean;
}

type RouteProps = RouteComponentProps<{
  location: any;
}>;

interface IStateProps {
  store: ICustomStore;
}

interface IDispatchProps {
  GetPokemon: () => void;
  GetMoves: () => void;
}

type Props = IOwnProps & RouteProps & IStateProps & IDispatchProps;

class AppWrapper extends React.Component<Props> {
  public componentDidMount() {
    const { GetPokemon, GetMoves, lastRoute, history } = this.props;

    if (restoreLastRoute && lastRoute) {
      history.push({
        pathname: lastRoute,
        state: {
          from: this.props.location,
          isInitial: true,
        },
      });
    }

    // Init the service worker
    registerServiceWorker(history);

    // Get pokedex
    GetPokemon();

    // Get moves
    GetMoves();

    const initTimer = analyticsApi.getTimer(APP_INIT);
    const renderTimer = new Date().getTime() - initTimer;

    analyticsApi.logTiming({
      action: APP_FINISHED,
      category: APP_LOAD,
      value: renderTimer,
    });
  }

  public componentDidUpdate(prevProps: Props) {
    const { location } = this.props;

    // this.persistStore();

    // On URL change, update lastSession.route
    if (prevProps.location.pathname !== location.pathname) {
      setLastSession({
        route: location.pathname,
        version: appVersion,
      });
    }
  }

  public persistStore = () => {
    const { store } = this.props;

    const ignoredStates = ['account', 'contact', 'feedback', 'form', 'notifier', 'uploader'];

    log('Persisting new store');
    const cleanState: { [index: string]: any } = {};
    Object.keys(store).forEach(key => {
      if (ignoredStates.indexOf(key) < 0) {
        cleanState[key] = {
          ...store[key],
          filters: undefined,
          isFetching: undefined,
        };
      }
    });

    setStore(JSON.parse(JSON.stringify(cleanState)));
  };

  public render() {
    return (
      <AppView>
        <>
          {routes.map(({ exact, path, render }, index) => (
            <Route key={index} exact={exact} path={path} render={render} />
          ))}
        </>
      </AppView>
    );
  }
}

const mapStateToProps = (state: IRootState): IStateProps => {
  const store = state as ICustomStore;

  return {
    store,
  };
};

const mapDispatchToProps = {
  GetMoves: createMoves,
  GetPokemon: createPokedex,
};

const connectedApp = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppWrapper)
);

const getAppModule = () => {
  if (isProduction() || isPre()) {
    return connectedApp;
  }

  return hot(module)(connectedApp);
};

export default getAppModule();
