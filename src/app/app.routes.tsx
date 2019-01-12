import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import CalculatorWrapper from '../app/modules/calculator/calculator-wrapper';
import PokemonDetailsWrapper from '../app/modules/pokedex/details/pokemon-wrapper';
import PokedexWrapper from '../app/modules/pokedex/list/pokedex-wrapper';

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

export const POKEDEX: IRouteConfig = {
  path: routes.POKEDEX,
  render: ({ match }) => {
    const {
      params: { id },
      url,
    } = match;
    if (id) {
      // @ts-ignore
      return <PokemonDetailsWrapper id={id} />;
    }
    return <PokedexWrapper url={url} />;
  },
};

export const SEARCH: IRouteConfig = {
  path: routes.SEARCH,
  render: ({ match }) => {
    const {
      params: { query },
      url,
    } = match;
    return <PokedexWrapper url={url} query={query} />;
  },
};

export const HOME: IRouteConfig = {
  path: routes.HOME,
  render: ({ match }) => {
    if (false) {
      const {
        params: { id },
      } = match;
      // @ts-ignore
      return <CalculatorWrapper id={id} />;
    }

    const { url } = match;
    return <PokedexWrapper url={url} />;
  },
};

export default [CALCULATOR, POKEDEX, SEARCH, HOME];
