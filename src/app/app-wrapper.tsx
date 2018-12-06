import * as React from 'react';
import { hot } from 'react-hot-loader';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { setLastSession, setStore } from '../common/utils/idb';
import { log } from '../common/utils/logger';
import registerServiceWorker from './utils/service-worker';

import AppView from './app-view';
import pokemonListWrapper from './modules/pokemon-list/pokemon-list-wrapper';
import pokemonDetailsWrapper from './modules/pokemon-details/pokemon-details-wrapper';
import searchWrapper from './modules/search/search-wrapper';

import { getPokemon } from './modules/pokemon-list/pokemon-list.actions';

import * as routes from '../constants/appRoutes';
import { restoreLastRoute } from '../constants/features';

import { RootState } from './root.types';
import { isProduction, isPre } from '../common/utils/platforms';

const packageJson = require('../../package.json');
const appVersion = packageJson.version;

interface CustomStore extends RootState {
  [index: string]: any;
}

interface OwnProps {
  lastRoute: string;
  isNewRelease: boolean;
}

type RouteProps = RouteComponentProps<{
  location: any;
}>;

interface StateProps {
  store: CustomStore;
}

type DispatchProps = {
  getPokemon: () => void;
};

type Props = OwnProps & RouteProps & StateProps & DispatchProps;

class AppWrapper extends React.Component<Props> {
  static displayName = 'AppWrapper';

  state = {};

  componentDidMount() {
    const { getPokemon, lastRoute, history } = this.props;

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
    getPokemon();
  }

  componentDidUpdate(prevProps: Props) {
    const { location } = this.props;

    // this.persistStore();

    // On URL change, update lastSession.route
    if (prevProps.location.pathname !== location.pathname) {
      setLastSession({
        version: appVersion,
        route: location.pathname,
      });
    }
  }

  persistStore = () => {
    const { store } = this.props;

    const ignoredStates = ['account', 'contact', 'feedback', 'form', 'notifier', 'uploader'];

    log('Persisting new store');
    const cleanState: { [index: string]: any } = {};
    Object.keys(store).forEach(key => {
      if (ignoredStates.indexOf(key) < 0) {
        cleanState[key] = {
          ...store[key],
          isFetching: undefined,
          filters: undefined,
        };
      }
    });

    setStore(JSON.parse(JSON.stringify(cleanState)));
  };

  render() {
    return (
      <AppView>
        <Switch>
          <Route path={routes.SEARCH} component={searchWrapper} />
          <Route exact path={routes.POKEMON} component={pokemonDetailsWrapper} />
          <Route exact path={routes.HOME} component={pokemonListWrapper} />
        </Switch>
      </AppView>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const store = state as CustomStore;

  return {
    store,
  };
};

const mapDispatchToProps = {
  getPokemon,
};

const connectedApp = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
    // @ts-ignore
  )(AppWrapper)
);

const defaultModule = !isProduction() && !isPre() ? hot(module)(connectedApp) : connectedApp;
export default defaultModule;
