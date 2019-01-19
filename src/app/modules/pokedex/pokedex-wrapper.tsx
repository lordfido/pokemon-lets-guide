import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { updateCollection } from '../../utils/collections';
import { filtersToString, stringToFilters } from '../../utils/urls';

import PokedexView from './pokedex-view';

import {
  getPokedex,
  getPokedexFilters,
  getPokedexPagination,
  getPokedexSortOptions,
  getRawPokedex,
} from '../../root.reducer';
import { filterPokedex, loadMorePokedex, resetPokedexFilters, sortPokedex } from './pokedex.actions';

import { POKEDEX, POKEDEX_SEARCH } from '../../../constants/appRoutes';

import { IRootState } from '../../root.models';
import { DropdownOutput, IFieldOutput, IOption } from '../forms/form.models';
import { IPokedexFilters, IPokedexPagination, IPokemonWithBaseCP, pokedexInitialState } from './pokedex.models';

interface IOwnProps {
  query?: string;
  url: string;
}

interface IStateProps {
  collection: IPokemonWithBaseCP[];
  filters: IPokedexFilters;
  pagination: IPokedexPagination;
  pokemonList: IOption[];
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
}

class PokedexWrapper extends React.Component<Props, IOwnState> {
  public state = {
    areFiltersOpen: false,
    redirectTo: '',
  };

  public filters = pokedexInitialState.filters;

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

  public componentDidUpdate(prevProps: Props) {
    const { redirectTo } = this.state;

    if (redirectTo) {
      this.setState({
        redirectTo: '',
      });
    }

    if (prevProps.url !== this.props.url) {
      const { FilterPokedex, query } = this.props;

      const urlFilters = stringToFilters(query);
      const parsedFilters = Object.keys(pokedexInitialState.filters).map(key => ({
        name: key,
        // @ts-ignore
        value: urlFilters[key] || pokedexInitialState.filters[key],
      }));

      FilterPokedex(parsedFilters);
    }
  }

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

  public handlePokemonChange = (field: IFieldOutput) => {
    const option = field.value as DropdownOutput;

    this.setState({
      redirectTo: POKEDEX.replace(':id?', option ? option.value : ''),
    });
  };

  public handleFilterChange = (field: IFieldOutput) => {
    const { filters } = this;

    const newFilters = {
      ...filters,
    };

    // @ts-ignore
    const prevFilter = filters[field.id];
    if (field.id === 'baseCP' || field.id === 'showAlolanForms' || field.id === 'showMegaevolutions') {
      // @ts-ignore
      newFilters[field.id] = typeof field.value !== 'undefined' ? field.value : prevFilter;
    } else {
      // @ts-ignore
      newFilters[field.id] = updateCollection(prevFilter, field.value.map(s => (s.value ? s.value : s)));
    }

    this.filters = newFilters;
  };

  public handleReset = () => {
    this.setState({
      redirectTo: POKEDEX.replace(':id?', ''),
    });
  };

  public handleSubmit = () => {
    const { filters } = this;

    const redirectTo = filtersToString(filters);
    this.setState({
      redirectTo: redirectTo ? POKEDEX_SEARCH.replace(':query', redirectTo) : POKEDEX.replace(':id?', ''),
    });
  };

  public handleLoadMorePokedex = () => {
    const { LoadMorePokedex } = this.props;

    LoadMorePokedex();
  };

  public render() {
    const { collection, filters, url, pagination, pokemonList } = this.props;
    const { redirectTo } = this.state;

    if (redirectTo && redirectTo !== url) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }

    return (
      <PokedexView
        collection={collection}
        handleSortBy={this.handleSortBy}
        pokemonList={pokemonList}
        handlePokemonChange={e => {
          this.handlePokemonChange(e);
        }}
        filters={filters}
        handleFilterChange={e => {
          this.handleFilterChange(e);
        }}
        handleReset={() => {
          this.handleReset();
        }}
        handleSubmit={() => {
          this.handleSubmit();
        }}
        handleLoadMore={
          collection.length >= pagination.last
            ? () => {
                this.handleLoadMorePokedex();
              }
            : undefined
        }
      />
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  collection: getPokedex(state),
  filters: getPokedexFilters(state),
  pagination: getPokedexPagination(state),
  pokemonList: getRawPokedex(state).map(pokemon => ({
    id: pokemon.id,
    label: pokemon.name,
    value: pokemon.id,
  })),
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
