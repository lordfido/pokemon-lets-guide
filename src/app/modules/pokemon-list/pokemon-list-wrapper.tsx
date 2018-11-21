import * as React from 'react';
import { connect } from 'react-redux';

import PokemonListView from './pokemon-list-view';
import { getPokemon } from './pokemon-list.actions';

import { RootState } from '../../root.types';
import { Pokemon } from './pokemon-list.types';

type StateProps = {
  collection: Array<Pokemon>;
};

type DispatchProps = {
  getPokemon: () => void;
};

type Props = StateProps & DispatchProps;

class PokemonListWrapper extends React.Component<Props> {
  static displayName = 'PokemonListWrapper';

  componentDidMount() {
    const { getPokemon } = this.props;

    getPokemon();
  }

  render() {
    const { collection } = this.props;

    return <PokemonListView collection={collection} />;
  }
}

const mapStateToProps = (state: RootState) => ({
  collection: state.pokemon.collection,
});

const mapDispatchToProps = {
  getPokemon,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonListWrapper);
