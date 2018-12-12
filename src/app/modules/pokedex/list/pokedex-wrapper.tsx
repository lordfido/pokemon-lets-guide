import * as React from 'react';
import { connect } from 'react-redux';

import PokedexView from './pokedex-view';

import { getPokemonList, getPokemonListPagination, getPokemonSortOptions } from '../../../root.reducer';
import { filterPokedex, loadMorePokedex, resetPokedexFilters, sortPokedex } from '../pokedex.actions';

import { IRootState } from '../../../root.models';
import { IPokemonListPagination, IPokemonWithBaseCP } from '../pokedex.models';

interface IStateProps {
  collection: IPokemonWithBaseCP[];
  pagination: IPokemonListPagination;
  sort: {
    sortBy: string;
    order: string;
  };
}

interface IDispatchProps {
  LoadMore: () => void;
  ResetFilters: () => void;
  SortPokemonList: (parameters: any) => void;
  UpdateFilters: (parameters: any) => void;
}

type Props = IStateProps & IDispatchProps;

class PokedexWrapper extends React.Component<Props> {
  public handleLoadMore() {
    const { LoadMore } = this.props;

    LoadMore();
  }

  public handleUpdateFilter(filter: string, selection: any) {
    const { UpdateFilters } = this.props;

    UpdateFilters({ filter, value: selection.map ? selection.map((s: any) => s.value) : selection });
  }

  public handleSortBy = (sortBy: string) => {
    const { SortPokemonList, sort } = this.props;

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

    SortPokemonList({ sortBy, order });
  };

  public render() {
    const { collection, pagination, ResetFilters } = this.props;

    return (
      <PokedexView
        collection={collection}
        handleLoadMore={
          collection.length >= pagination.last
            ? () => {
                this.handleLoadMore();
              }
            : undefined
        }
        handleResetFilters={() => {
          ResetFilters();
        }}
        handleSortBy={this.handleSortBy}
        handleUpdateFilter={(filter: string, selection: any) => {
          this.handleUpdateFilter(filter, selection);
        }}
      />
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  collection: getPokemonList(state),
  pagination: getPokemonListPagination(state),
  sort: getPokemonSortOptions(state),
});

const mapDispatchToProps = {
  LoadMore: loadMorePokedex,
  ResetFilters: resetPokedexFilters,
  SortPokemonList: sortPokedex,
  UpdateFilters: filterPokedex,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokedexWrapper);
