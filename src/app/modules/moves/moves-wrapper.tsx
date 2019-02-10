import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { log } from '../../../common/utils/logger';
import { stringToFilters } from '../../utils/urls';

import MovesView from './moves-view';

import {
  getMoves,
  getMovesFilters,
  getMovesPagination,
  getMovesSortOptions,
  getRawMoves,
  getRawPokedex,
} from '../../root.reducer';
import { filterMoves, loadMoreMoves, resetMovesFilters, sortMoves } from './moves.actions';

import { MOVES } from '../../../constants/appRoutes';

import { IRootState } from '../../root.models';
import { IFieldOutput, IOption } from '../forms/form.models';
import { IMovesFilters, IMovesPagination, IRichMove, movesInitialState } from './moves.models';

interface IOwnProps {
  isModalOpen: boolean;
  query?: string;
  url: string;
}

interface IStateProps {
  collection: IRichMove[];
  filters: IMovesFilters;
  pagination: IMovesPagination;
  movesList: IOption[];
  pokemonList: IOption[];
  sort: {
    sortBy: string;
    order: string;
  };
}

interface IDispatchProps {
  FilterMoves: (
    parameters: Array<{
      name: string;
      value: string | string[] | boolean;
    }>
  ) => void;
  LoadMoreMoves: () => void;
  ResetMovesFilters: () => void;
  SortMoves: (parameters: any) => void;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

interface IOwnState {
  areFiltersOpen: boolean;
  redirectTo?: string;
  referrer?: string;
}

class MovesWrapper extends React.Component<Props, IOwnState> {
  public state = {
    areFiltersOpen: false,
    redirectTo: undefined,
    referrer: undefined,
  };

  public initialFilters = stringToFilters(this.props.query);

  public filters: IMovesFilters = { ...movesInitialState.filters };

  constructor(props: Props) {
    super(props);

    Object.keys(movesInitialState.filters).forEach(key => {
      // @ts-ignore
      this.filters[key] = this.initialFilters[key] || movesInitialState.filters[key];
    });
  }

  public componentDidMount() {
    const { query } = this.props;

    const urlFilters = stringToFilters(query);
    this.applyFilters({ ...movesInitialState.filters, ...urlFilters });
  }

  public componentDidUpdate() {
    const { redirectTo } = this.state;

    if (redirectTo) {
      this.setState({
        redirectTo: '',
      });
    }
  }

  public applyFilters = (filters: IMovesFilters) => {
    const { FilterMoves } = this.props;

    const parsedFilters = Object.keys(filters).map(key => ({
      name: key,
      // @ts-ignore
      value: filters[key],
    }));

    FilterMoves(parsedFilters);
  };

  public handleSortBy = (sortBy: string) => {
    const { SortMoves, sort } = this.props;

    const isTheSameFilter = sortBy === sort.sortBy;
    const options = ['asc', 'desc'];
    let order = options[0];

    if ((!isTheSameFilter && sortBy !== 'id' && sortBy !== 'name') || (isTheSameFilter && order === sort.order)) {
      order = options[1];
    }

    SortMoves({ sortBy, order });
  };

  public handleFilterChange = (field: IFieldOutput) => {
    const { filters } = this;

    const newFilters = {
      ...filters,
    };

    // @ts-ignore
    const prevFilter = filters[field.id];

    // Single value
    if (
      field.id === 'accuracy' ||
      field.id === 'category' ||
      field.id === 'nameOrId' ||
      field.id === 'power' ||
      field.id === 'pp'
    ) {
      // @ts-ignore
      newFilters[field.id] = typeof field.value !== 'undefined' ? field.value : prevFilter;

      // Dropdown
    } else if (field.id === 'showTm') {
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
    this.props.ResetMovesFilters();

    this.filters = { ...movesInitialState.filters };

    this.setState({
      redirectTo: MOVES.replace(':id?', ''),
    });
  };

  public handleSubmit = () => {
    const { filters } = this;

    this.applyFilters(filters);
  };

  public handleLoadMore = () => {
    const { LoadMoreMoves } = this.props;

    LoadMoreMoves();
  };

  public render() {
    const { collection, isModalOpen, movesList, pagination, pokemonList, url } = this.props;
    const { referrer, redirectTo } = this.state;

    if (redirectTo && redirectTo !== url) {
      log(`Redirecting with this origin: ${referrer}`);
      return <Redirect to={{ pathname: redirectTo, state: { referrer } }} />;
    }

    return (
      <MovesView
        collection={collection}
        isModalOpen={isModalOpen}
        handleSortBy={this.handleSortBy}
        movesList={movesList}
        pokemonList={pokemonList}
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
                this.handleLoadMore();
              }
            : undefined
        }
      />
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  collection: getMoves(state),
  filters: getMovesFilters(state),
  movesList: getRawMoves(state).map(move => ({
    id: move.id,
    label: move.name,
    value: move.id,
  })),
  pagination: getMovesPagination(state),
  pokemonList: getRawPokedex(state).map(pokemon => ({
    id: pokemon.id,
    label: pokemon.name,
    value: pokemon.id,
  })),
  sort: getMovesSortOptions(state),
});

const mapDispatchToProps = {
  FilterMoves: filterMoves,
  LoadMoreMoves: loadMoreMoves,
  ResetMovesFilters: resetMovesFilters,
  SortMoves: sortMoves,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovesWrapper);
