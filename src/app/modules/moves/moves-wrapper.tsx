import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { log } from '../../../common/utils/logger';
import { updateCollection } from '../../utils/collections';
import { filtersToString, stringToFilters } from '../../utils/urls';

import MovesView from './moves-view';

import { getMoves, getMovesFilters, getMovesPagination, getMovesSortOptions, getRawMoves } from '../../root.reducer';
import { filterMoves, loadMoreMoves, resetMovesFilters, sortMoves } from './moves.actions';

import { MOVES, MOVES_SEARCH } from '../../../constants/appRoutes';

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

  public filters = movesInitialState.filters;

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

  public handleRedirectToMove = (moveId: string) => {
    this.setState({
      redirectTo: MOVES.replace(':id?', moveId),
      referrer: this.props.url,
    });
  };

  public handleFilterChange = (field: IFieldOutput) => {
    const { filters } = this;

    const newFilters = {
      ...filters,
    };

    // @ts-ignore
    const prevFilter = filters[field.id];
    if (
      field.id === 'accuracy' ||
      field.id === 'category' ||
      field.id === 'nameOrId' ||
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

    this.filters = newFilters;
  };

  public handleReset = () => {
    this.setState({
      redirectTo: MOVES.replace(':id?', ''),
    });
  };

  public handleSubmit = () => {
    const { filters } = this;

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
    const { collection, filters, isModalOpen, movesList, pagination, url } = this.props;
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
        handleRedirectToMove={e => {
          this.handleRedirectToMove(e);
        }}
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
