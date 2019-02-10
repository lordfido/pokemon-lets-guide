import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { stringToFilters } from '../../utils/urls';

import PokedexView from './pokedex-view';

import {
  getPokedex,
  getPokedexFilters,
  getPokedexPagination,
  getPokedexSortOptions,
  getRawMoves,
  getRawPokedex,
} from '../../root.reducer';
import { filterPokedex, loadMorePokedex, resetPokedexFilters, sortPokedex } from './pokedex.actions';

import { POKEDEX } from '../../../constants/appRoutes';

import { IRootState } from '../../root.models';
import { IFieldOutput, IOption } from '../forms/form.models';
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
  movesList: IOption[];
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

  public initialFilters = stringToFilters(this.props.query);

  public filters: IPokedexFilters = { ...pokedexInitialState.filters };

  constructor(props: Props) {
    super(props);

    Object.keys(pokedexInitialState.filters).forEach(key => {
      // @ts-ignore
      this.filters[key] = this.initialFilters[key] || pokedexInitialState.filters[key];
    });
  }

  public componentDidMount() {
    const { query } = this.props;

    const urlFilters = stringToFilters(query);
    this.applyFilters({ ...pokedexInitialState.filters, ...urlFilters });
  }

  public componentDidUpdate() {
    const { redirectTo } = this.state;

    if (redirectTo) {
      this.setState({
        redirectTo: '',
      });
    }
  }

  public applyFilters = (filters: IPokedexFilters) => {
    const { FilterPokedex } = this.props;

    const parsedFilters = Object.keys(filters).map(key => ({
      name: key,
      // @ts-ignore
      value: filters[key],
    }));

    FilterPokedex(parsedFilters);
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

  public handleFilterChange = (field: IFieldOutput) => {
    const { filters } = this;

    const newFilters = {
      ...filters,
    };

    // @ts-ignore
    const prevFilter = filters[field.id];

    // Single values
    if (field.id === 'baseCP' || field.id === 'nameOrNumber') {
      // @ts-ignore
      newFilters[field.id] = typeof field.value !== 'undefined' ? field.value : prevFilter;

      // Dropdown
    } else if (field.id === 'showAlolanForms' || field.id === 'showMegaevolutions') {
      // @ts-ignore
      newFilters[field.id] = field.value.value;

      // Multi
    } else {
      // @ts-ignore
      newFilters[field.id] = field.value.map(s => (s.value ? s.value : s));
    }

    this.filters = newFilters;
  };

  public handleReset = () => {
    this.props.ResetPokedexFilters();

    this.filters = { ...pokedexInitialState.filters };

    this.setState({
      redirectTo: POKEDEX.replace(':id?', ''),
    });
  };

  public handleSubmit = () => {
    const { filters } = this;

    this.applyFilters(filters);
  };

  public handleLoadMorePokedex = () => {
    const { LoadMorePokedex } = this.props;

    LoadMorePokedex();
  };

  public render() {
    const { collection, movesList, url, pagination, pokemonList } = this.props;
    const { redirectTo } = this.state;

    if (redirectTo && redirectTo !== url) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }

    return (
      <PokedexView
        collection={collection}
        handleSortBy={this.handleSortBy}
        pokemonList={pokemonList}
        movesList={movesList}
        filters={this.filters}
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
  movesList: getRawMoves(state).map(move => ({
    id: move.id,
    label: move.name,
    value: move.id,
  })),
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
