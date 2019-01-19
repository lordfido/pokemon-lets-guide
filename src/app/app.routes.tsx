import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import CalculatorWrapper from '../app/modules/calculator/calculator-wrapper';
import MoveWrapper from './modules/move/move-wrapper';
import MovesWrapper from './modules/moves/moves-wrapper';
import PokedexWrapper from './modules/pokedex/pokedex-wrapper';
import PokemonWrapper from './modules/pokemon/pokemon-wrapper';

import * as routes from '../constants/appRoutes';

interface IRouteProps {
  id?: string;
  query?: string;
}

interface IRouteConfig {
  exact?: boolean;
  path: string;
  render: (routeProps: RouteComponentProps<IRouteProps>) => React.ReactNode;
}

export const CALCULATOR: IRouteConfig = {
  exact: true,
  path: routes.CALCULATOR,
  render: ({ match }) => {
    const {
      params: { id },
    } = match;
    // @ts-ignore
    return <CalculatorWrapper id={id} />;
  },
};

export const MOVES_SEARCH: IRouteConfig = {
  exact: true,
  path: routes.MOVES_SEARCH,
  render: ({ match }) => {
    const {
      params: { query },
      url,
    } = match;
    return <MovesWrapper isModalOpen={false} query={query} url={url} />;
  },
};

export const MOVE_DETAILS: IRouteConfig = {
  exact: true,
  path: routes.MOVES,
  render: ({ match }) => {
    const {
      params: { id },
    } = match;
    if (!id) {
      return null;
    }

    // @ts-ignore
    return <MoveWrapper id={id} />;
  },
};

export const MOVES: IRouteConfig = {
  exact: true,
  path: routes.MOVES,
  render: ({ match }) => {
    const {
      params: { id },
      url,
    } = match;

    return <MovesWrapper isModalOpen={!!id} url={url} />;
  },
};

export const POKEDEX_SEARCH: IRouteConfig = {
  exact: true,
  path: routes.POKEDEX_SEARCH,
  render: ({ match }) => {
    const {
      params: { query },
      url,
    } = match;
    return <PokedexWrapper url={url} query={query} />;
  },
};

export const POKEDEX: IRouteConfig = {
  exact: true,
  path: routes.POKEDEX,
  render: ({ match }) => {
    const {
      params: { id },
      url,
    } = match;
    if (id) {
      // @ts-ignore
      return <PokemonWrapper id={id} />;
    }
    return <PokedexWrapper url={url} />;
  },
};

export const HOME: IRouteConfig = {
  exact: true,
  path: routes.HOME,
  render: ({ match }) => {
    if (false) {
      return <MoveWrapper id="445" />;
    }

    const { url } = match;
    return <PokedexWrapper url={url} />;
  },
};

export default [CALCULATOR, MOVES_SEARCH, MOVE_DETAILS, MOVES, POKEDEX_SEARCH, POKEDEX, HOME];
