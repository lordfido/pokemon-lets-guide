import * as React from 'react';
import { connect } from 'react-redux';

import PokemonListView from './pokemon-list-view';

import { getPokemonList, getPokemonListPagination, getPokemonSortOptions } from '../../root.reducer';
import { loadMore, sortPokemonList } from './pokemon-list.actions';

import { IRootState } from '../../root.types';
import { IPokemonListPagination, IPokemonWithBaseCP } from './pokemon-list.types';

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
  SortPokemonList: (parameters: any) => void;
}

type Props = IStateProps & IDispatchProps;

class PokemonListWrapper extends React.Component<Props> {
  public static displayName = 'PokemonListWrapper';

  public sortBy = (sortBy: string) => {
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

  public handleLoadMore() {
    const { LoadMore } = this.props;

    LoadMore();
  }

  public render() {
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

const mapStateToProps = (state: IRootState) => ({
  collection: getPokemonList(state),
  pagination: getPokemonListPagination(state),
  sort: getPokemonSortOptions(state),
});

const mapDispatchToProps = {
  LoadMore: loadMore,
  SortPokemonList: sortPokemonList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonListWrapper);
