import * as React from 'react';
import { connect } from 'react-redux';
import { sortBy } from '../../utils/arrays';

import PokemonListView from './pokemon-list-view';
import { loadMore } from './pokemon-list.actions';
import { getPokemonList } from '../../root.reducer';

import { RootState } from '../../root.types';
import { Pokemon } from './pokemon-list.types';
import { getBaseCP } from '../../utils/pokemon';

type StateProps = {
  collection: Array<Pokemon>;
};

type DispatchProps = {
  loadMore: Function;
};

type Props = StateProps & DispatchProps;

interface OwnState {
  sortBy: string;
  reverse: boolean;
}

class PokemonListWrapper extends React.Component<Props, OwnState> {
  static displayName = 'PokemonListWrapper';

  constructor(props: Props) {
    super(props);

    this.state = {
      sortBy: 'id',
      reverse: false,
    };
  }

  sortBy = (key: string) => {
    const sortBy = key;
    const reverse = sortBy === this.state.sortBy ? !this.state.reverse : false;

    this.setState({
      sortBy,
      reverse,
    });
  };

  getSortedCollection() {
    const { collection } = this.props;
    const { sortBy: sortOrder, reverse } = this.state;

    const collectionWithCP = collection.map(p => ({ ...p, baseCP: getBaseCP(p.baseStats) }));

    if (sortOrder === 'id' || sortOrder === 'name') {
      return collectionWithCP.sort(sortBy(sortOrder, reverse ? 'desc' : 'asc'));
    }

    return collectionWithCP.sort(sortBy(sortOrder, reverse ? 'asc' : 'desc'));
  }

  handleLoadMore() {
    const { loadMore } = this.props;

    loadMore();
  }

  render() {
    return (
      <PokemonListView
        collection={this.getSortedCollection()}
        sort={this.sortBy}
        handleLoadMore={() => {
          this.handleLoadMore();
        }}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  collection: getPokemonList(state),
});

const mapDispatchToProps = {
  loadMore,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonListWrapper);
