import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { updateCollection } from '../../utils/collections';
import { filtersToString, stringToFilters } from '../../utils/urls';

import MovesView from './moves-view';

import { getMoves, getMovesFilters, getMovesPagination, getMovesSortOptions, getRawMoves } from '../../root.reducer';
import { filterMoves, loadMoreMoves, resetMovesFilters, sortMoves } from './moves.actions';

import { MOVES, MOVES_SEARCH } from '../../../constants/appRoutes';

import { IRootState } from '../../root.models';
import { DropdownOutput, IFieldOutput, IOption } from '../forms/form.models';
import { IMovesFilters, IMovesPagination, IRichMove, movesInitialState } from './moves.models';

interface IOwnProps {
  query?: string;
  url: string;
}

interface IStateProps {
  collection: IRichMove[];
  filters: IMovesFilters;
  pagination: IMovesPagination;
  movesList: IOption[];
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
  filters: IMovesFilters;
  redirectTo?: string;
}

class MovesWrapper extends React.Component<Props, IOwnState> {
  public state = {
    areFiltersOpen: false,
    filters: movesInitialState.filters,
    redirectTo: '',
  };

  public componentDidMount() {
    const { FilterMoves, query } = this.props;

    const urlFilters = stringToFilters(query);
    const parsedFilters = Object.keys(movesInitialState.filters).map(key => ({
      name: key,
      // @ts-ignore
      value: urlFilters[key] || movesInitialState.filters[key],
    }));

    FilterMoves(parsedFilters);
  }

  public componentDidUpdate(prevProps: Props) {
    const { redirectTo } = this.state;

    if (redirectTo) {
      this.setState({
        redirectTo: '',
      });
    }

    if (prevProps.url !== this.props.url) {
      const { FilterMoves, query } = this.props;

      const urlFilters = stringToFilters(query);
      const parsedFilters = Object.keys(movesInitialState.filters).map(key => ({
        name: key,
        // @ts-ignore
        value: urlFilters[key] || movesInitialState.filters[key],
      }));

      FilterMoves(parsedFilters);
    }
  }

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

  public handleMoveChange = (field: IFieldOutput) => {
    const option = field.value as DropdownOutput;

    this.setState({
      redirectTo: MOVES.replace(':id?', option ? option.value : ''),
    });
  };

  public handleFilterChange = (field: IFieldOutput) => {
    const { filters } = this.state;

    const newFilters = {
      ...filters,
    };

    // @ts-ignore
    const prevFilter = filters[field.id];
    if (
      field.id === 'accuracy' ||
      field.id === 'category' ||
      field.id === 'power' ||
      field.id === 'pp' ||
      field.id === 'probability' ||
      field.id === 'tm'
    ) {
      // @ts-ignore
      newFilters[field.id] = typeof field.value !== 'undefined' ? field.value : prevFilter;
    } else {
      // @ts-ignore
      newFilters[field.id] = updateCollection(prevFilter, field.value.map(s => (s.value ? s.value : s)));
    }

    this.setState({
      filters: newFilters,
    });
  };

  public handleReset = () => {
    this.setState({
      redirectTo: MOVES.replace(':id?', ''),
    });
  };

  public handleSubmit = () => {
    const { filters } = this.state;

    const redirectTo = filtersToString(filters);
    this.setState({
      redirectTo: redirectTo ? MOVES_SEARCH.replace(':query', redirectTo) : MOVES.replace(':id?', ''),
    });
  };

  public handleLoadMore = () => {
    const { LoadMoreMoves } = this.props;

    LoadMoreMoves();
  };

  public render() {
    const { collection, filters, url, pagination, movesList } = this.props;
    const { redirectTo } = this.state;

    if (redirectTo && redirectTo !== url) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }

    return (
      <MovesView
        collection={collection}
        handleSortBy={this.handleSortBy}
        movesList={movesList}
        handleMoveChange={e => {
          this.handleMoveChange(e);
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
