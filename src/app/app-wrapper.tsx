import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { setLastSession, setStore } from '../common/utils/idb';
import { log } from '../common/utils/logger';
import { isPre, isProduction } from '../common/utils/platforms';
import registerServiceWorker from './utils/service-worker';

import AppView from './app-view';
import pokemonDetailsWrapper from './modules/pokedex/details/pokemon-wrapper';
import pokedexWrapper from './modules/pokedex/list/pokedex-wrapper';

import { createPokedex } from './modules/pokedex/pokedex.actions';

import * as routes from '../constants/appRoutes';
import { restoreLastRoute } from '../constants/features';

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
}

type Props = IOwnProps & RouteProps & IStateProps & IDispatchProps;

class AppWrapper extends React.Component<Props> {
  public static displayName = 'AppWrapper';

  public componentDidMount() {
    const { GetPokemon, lastRoute, history } = this.props;

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
        <Switch>
          <Route path={routes.SEARCH} component={pokedexWrapper} />
          <Route exact path={routes.POKEMON} component={pokemonDetailsWrapper} />
          <Route exact path={routes.POKEDEX} component={pokedexWrapper} />
          <Redirect to={{ pathname: routes.POKEDEX }} />
        </Switch>
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
