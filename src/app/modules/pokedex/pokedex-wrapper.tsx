import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { updateCollection } from '../../utils/collections';

import PokedexView from './pokedex-view';

import { getPokedex, getPokedexFilters, getPokedexPagination, getPokedexSortOptions } from '../../root.reducer';
import { filterPokedex, loadMorePokedex, resetPokedexFilters, sortPokedex } from './pokedex.actions';

import { POKEDEX, SEARCH } from '../../../constants/appRoutes';

import { IRootState } from '../../root.models';
import { IPokedexFilters, IPokemonListPagination, IPokemonWithBaseCP, pokedexInitialState } from './pokedex.models';

const DEBOUNCE_MS = 300;

const stringToFilters = (url?: string) => {
  if (!url || (/\;/.test(url) === false && /\=/.test(url) === false)) {
    return {};
  }

  const queryParams = url.split(';');
  const filters = {};

  queryParams.forEach(stringParam => {
    const stringParts = stringParam.split('=');
    // @ts-ignore
    filters[stringParts[0]] =
      stringParts[1] === 'true'
        ? true
        : stringParts[1] === 'false'
        ? false
        : /\[(.*)\]/.test(stringParts[1])
        ? JSON.parse(stringParts[1])
        : stringParts[1];
  });

  return filters;
};

const filtersToString = (filters: IPokedexFilters) =>
  Object.keys(filters)
    .map(key => {
      // @ts-ignore
      const filter = filters[key];

      if (typeof filter !== 'undefined' && ((typeof filter === 'boolean' && filter) || filter.length)) {
        if (typeof filter === 'string' || typeof filter === 'boolean') {
          return `${key}=${String(filter)}`;
        }

        const arrayValue = filter.map((f: string) => `\"${f}\"`);
        return `${key}=[${arrayValue.join(',')}]`;
      }
    })
    .filter(f => f)
    .join(';');

interface IOwnProps {
  query?: string;
  url: string;
}

interface IStateProps {
  collection: IPokemonWithBaseCP[];
  filters: IPokedexFilters;
  pagination: IPokemonListPagination;
  sort: {
    sortBy: string;
    order: string;
  };
}

interface IDispatchProps {
  FilterPokedex: (
    parameters: Array<{
      name: string;
      value: string | string[] | boolean;
    }>
  ) => void;
  LoadMorePokedex: () => void;
  ResetPokedexFilters: () => void;
  SortPokedex: (parameters: any) => void;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

interface IOwnState {
  areFiltersOpen: boolean;
  redirectTo?: string;
  redirectToPokedex?: boolean;
}

class PokedexWrapper extends React.Component<Props, IOwnState> {
  public state = {
    areFiltersOpen: false,
    redirectTo: '',
    redirectToPokedex: false,
  };

  private filtersDebounce: NodeJS.Timeout = setTimeout(() => undefined, 0);

  public componentDidMount() {
    const { FilterPokedex, query } = this.props;

    const urlFilters = stringToFilters(query);
    const parsedFilters = Object.keys(pokedexInitialState.filters).map(key => ({
      name: key,
      // @ts-ignore
      value: urlFilters[key] || pokedexInitialState.filters[key],
    }));

    FilterPokedex(parsedFilters);
  }

  public componentDidUpdate() {
    const { FilterPokedex } = this.props;
    const { redirectTo, redirectToPokedex } = this.state;

    if (redirectToPokedex) {
      this.setState({
        redirectToPokedex: false,
      });
    }

    if (redirectTo) {
      this.setState({
        redirectTo: '',
      });

      const urlFilters = stringToFilters(redirectTo);
      const parsedFilters = Object.keys(pokedexInitialState.filters).map(key => ({
        name: key,
        // @ts-ignore
        value: urlFilters[key] || pokedexInitialState.filters[key],
      }));

      FilterPokedex(parsedFilters);
    }
  }

  public handleLoadMorePokedex() {
    const { LoadMorePokedex } = this.props;

    LoadMorePokedex();
  }

  public handleResetFilters = () => {
    this.setState({
      redirectToPokedex: true,
    });
  };

  public handleSortBy = (sortBy: string) => {
    const { SortPokedex, sort } = this.props;

    const isTheSameFilter = sortBy === sort.sortBy;
    const options = ['asc', 'desc'];
    let order = options[0];

    if ((!isTheSameFilter && sortBy !== 'id' && sortBy !== 'name') || (isTheSameFilter && order === sort.order)) {
      order = options[1];
    }

    SortPokedex({ sortBy, order });
  };

  public handleUpdateFilter({ id, value }: { id: string; value: any }) {
    clearTimeout(this.filtersDebounce);
    this.filtersDebounce = setTimeout(() => {
      const { filters } = this.props;

      const newFilters = {
        ...filters,
      };

      // @ts-ignore
      const prevFilter = filters[id];
      if (typeof prevFilter === 'boolean' || typeof prevFilter === 'string') {
        // @ts-ignore
        newFilters[id] = typeof value !== 'undefined' ? value : prevFilter;
      } else {
        // @ts-ignore
        newFilters[id] = updateCollection(prevFilter, value.map(s => s.value));
      }

      const redirectTo = filtersToString(newFilters);
      this.setState({
        redirectTo: redirectTo || POKEDEX,
      });
    }, DEBOUNCE_MS);
  }

  public render() {
    const { url } = this.props;
    const { redirectTo, redirectToPokedex } = this.state;

    if (redirectToPokedex) {
      return <Redirect to={{ pathname: POKEDEX }} />;
    }

    const redirection = redirectTo ? SEARCH.replace(':query', redirectTo) : '';

    if (redirection && redirection !== url) {
      return <Redirect to={{ pathname: redirection }} />;
    }

    const { collection, filters, pagination } = this.props;

    return (
      <PokedexView
        collection={collection}
        filters={filters}
        handleLoadMore={
          collection.length >= pagination.last
            ? () => {
                this.handleLoadMorePokedex();
              }
            : undefined
        }
        handleResetFilters={() => {
          this.handleResetFilters();
        }}
        handleSortBy={this.handleSortBy}
        handleUpdateFilter={(option: { id: string; value: any }) => {
          this.handleUpdateFilter(option);
        }}
      />
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  collection: getPokedex(state),
  filters: getPokedexFilters(state),
  pagination: getPokedexPagination(state),
  sort: getPokedexSortOptions(state),
});

const mapDispatchToProps = {
  FilterPokedex: filterPokedex,
  LoadMorePokedex: loadMorePokedex,
  ResetPokedexFilters: resetPokedexFilters,
  SortPokedex: sortPokedex,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokedexWrapper);
