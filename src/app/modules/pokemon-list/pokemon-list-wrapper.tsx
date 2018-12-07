import * as React from 'react';
import { connect } from 'react-redux';

import PokemonListView from './pokemon-list-view';
import { sortPokemonList, loadMore } from './pokemon-list.actions';
import { getPokemonList, getPokemonSortOptions, getPokemonListPagination } from '../../root.reducer';

import { RootState } from '../../root.types';
import { PokemonWithBaseCP, PokemonListPagination } from './pokemon-list.types';

type StateProps = {
  collection: Array<PokemonWithBaseCP>;
  pagination: PokemonListPagination;
  sort: {
    sortBy: string;
    order: string;
  };
};

type DispatchProps = {
  sortPokemonList: Function;
  loadMore: Function;
};

type Props = StateProps & DispatchProps;

class PokemonListWrapper extends React.Component<Props> {
  static displayName = 'PokemonListWrapper';

  sortBy = (sortBy: string) => {
    const { sortPokemonList, sort } = this.props;

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

    sortPokemonList({ sortBy, order });
  };

  handleLoadMore() {
    const { loadMore } = this.props;

    loadMore();
  }

  render() {
    const { collection, pagination } = this.props;

    return (
      <PokemonListView
        collection={collection}
        sort={this.sortBy}
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

const mapStateToProps = (state: RootState) => ({
  collection: getPokemonList(state),
  pagination: getPokemonListPagination(state),
  sort: getPokemonSortOptions(state),
});

const mapDispatchToProps = {
  sortPokemonList,
  loadMore,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonListWrapper);
