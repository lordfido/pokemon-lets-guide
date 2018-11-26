import * as React from 'react';
import { connect } from 'react-redux';
import { sortBy } from '../../utils/arrays';

import PokemonListView from './pokemon-list-view';
import { getPokemonList } from '../../root.reducer';

import { RootState } from '../../root.types';
import { Pokemon } from './pokemon-list.types';

type StateProps = {
  collection: Array<Pokemon>;
};

interface OwnState {
  sortBy: string;
  reverse: boolean;
}

class PokemonListWrapper extends React.Component<StateProps, OwnState> {
  static displayName = 'PokemonListWrapper';

  constructor(props: StateProps) {
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

    if (sortOrder === 'id' || sortOrder === 'name') {
      return collection.sort(sortBy(sortOrder, reverse ? 'desc' : 'asc'));
    }

    return collection.sort(sortBy(sortOrder, reverse ? 'asc' : 'desc'));
  }

  render() {
    const { collection } = this.props;

    return <PokemonListView collection={this.getSortedCollection()} sort={this.sortBy} />;
  }
}

const mapStateToProps = (state: RootState) => ({
  collection: getPokemonList(state),
});

export default connect(mapStateToProps)(PokemonListWrapper);
