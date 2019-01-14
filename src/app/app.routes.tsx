import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import CalculatorWrapper from '../app/modules/calculator/calculator-wrapper';
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
  path: routes.MOVES_SEARCH,
  render: ({ match }) => {
    const {
      params: { query },
      url,
    } = match;
    return <MovesWrapper url={url} query={query} />;
  },
};

export const MOVES: IRouteConfig = {
  path: routes.MOVES,
  render: ({ match }) => {
    const {
      // params: { id },
      url,
    } = match;
    // if (id) {
    //   // @ts-ignore
    //   return <MoveWrapper id={id} />;
    // }
    return <MovesWrapper url={url} />;
  },
};

export const POKEDEX_SEARCH: IRouteConfig = {
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
  path: routes.HOME,
  render: ({ match }) => {
    const { url } = match;
    return <PokedexWrapper url={url} />;
  },
};

export default [CALCULATOR, MOVES_SEARCH, MOVES, POKEDEX_SEARCH, POKEDEX, HOME];
