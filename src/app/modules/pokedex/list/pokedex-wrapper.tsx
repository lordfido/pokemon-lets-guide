import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { updateCollection } from '../../../utils/collections';

import PokedexView from './pokedex-view';

import { getPokedex, getPokedexFilters, getPokedexPagination, getPokedexSortOptions } from '../../../root.reducer';
import { filterPokedex, loadMorePokedex, resetPokedexFilters, sortPokedex } from '../pokedex.actions';

import { POKEDEX, SEARCH } from '../../../../constants/appRoutes';

import { IRootState } from '../../../root.models';
import { IPokedexFilters, IPokemonListPagination, IPokemonWithBaseCP, pokedexInitialState } from '../pokedex.models';

const DEBOUNCE_MS = 300;

const stringToFilters = (url: string) => {
  if (/\;/.test(url) === false && /\=/.test(url) === false) {
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

type RouteProps = RouteComponentProps<{
  query: string;
}>;

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

type Props = RouteProps & IStateProps & IDispatchProps;

interface IOwnState {
  areFiltersOpen: boolean;
  redirectTo?: string;
}

class PokedexWrapper extends React.Component<Props, IOwnState> {
  public state = {
    areFiltersOpen: false,
    redirectTo: '',
  };

  private filtersDebounce: NodeJS.Timeout = setTimeout(() => undefined, 0);

  public componentDidMount() {
    const {
      FilterPokedex,
      match: { params },
    } = this.props;

    const urlFilters = stringToFilters(params.query);
    const parsedFilters = Object.keys(pokedexInitialState.filters).map(key => ({
      name: key,
      // @ts-ignore
      value: urlFilters[key] || pokedexInitialState.filters[key],
    }));

    FilterPokedex(parsedFilters);
  }

  public componentDidUpdate(prevProps: Props) {
    const { FilterPokedex } = this.props;
    const { redirectTo } = this.state;

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

  public handleToggleFilters = () => {
    const { areFiltersOpen } = this.state;

    this.setState({
      areFiltersOpen: !areFiltersOpen,
    });
  };

  public handleResetFilters = () => {
    this.setState({
      redirectTo: POKEDEX,
    });
  };

  public handleSortBy = (sortBy: string) => {
    const { SortPokedex, sort } = this.props;

    const reverse = sortBy === sort.sortBy;
    let order = 'asc';

    if (sortBy === 'id' || sortBy === 'name') {
      if (reverse) {
        order = 'desc';
      }
    } else {
      if (!reverse) {
        order = 'desc';
      }
    }

    SortPokedex({ sortBy, order });
  };

  public handleUpdateFilter(filter: string, selection: any) {
    clearTimeout(this.filtersDebounce);
    this.filtersDebounce = setTimeout(() => {
      const { filters } = this.props;

      const newFilters = {
        ...filters,
      };

      // @ts-ignore
      const prevFilter = filters[filter];
      if (typeof prevFilter === 'boolean' || typeof prevFilter === 'string') {
        // @ts-ignore
        newFilters[filter] = typeof selection !== 'undefined' ? selection : prevFilter;
      } else {
        // @ts-ignore
        newFilters[filter] = updateCollection(prevFilter, selection.map(s => s.value));
      }

      const redirectTo = filtersToString(newFilters);
      this.setState({
        redirectTo: redirectTo || POKEDEX,
      });
    }, DEBOUNCE_MS);
  }

  public render() {
    const {
      match: { url },
    } = this.props;
    const { areFiltersOpen, redirectTo } = this.state;
    const redirection = redirectTo ? SEARCH.replace(':query', redirectTo) : '';

    if (redirection && redirection !== url) {
      return <Redirect to={{ pathname: redirection }} />;
    }

    const { collection, filters, pagination } = this.props;

    return (
      <PokedexView
        areFiltersOpen={areFiltersOpen}
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
        handleToggleFilters={() => {
          this.handleToggleFilters();
        }}
        handleUpdateFilter={(filter: string, selection: any) => {
          this.handleUpdateFilter(filter, selection);
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
