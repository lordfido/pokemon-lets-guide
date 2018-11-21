import * as React from 'react';
import { connect } from 'react-redux';

import PokemonListView from './pokemon-list-view';
import { getPokemonList } from '../../root.reducer';

import { RootState } from '../../root.types';
import { Pokemon } from './pokemon-list.types';

type StateProps = {
  collection: Array<Pokemon>;
};

class PokemonListWrapper extends React.Component<StateProps> {
  static displayName = 'PokemonListWrapper';

  render() {
    const { collection } = this.props;

    return <PokemonListView collection={collection} />;
  }
}

const mapStateToProps = (state: RootState) => ({
  collection: getPokemonList(state),
});

export default connect(mapStateToProps)(PokemonListWrapper);
