import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { getSelectedPokemon, getPokemonPagination } from '../../root.reducer';

import PokemonDetailsView from './pokemon-details-view';

import { RootState } from '../../root.types';
import { Pokemon, PokemonPagination } from '../pokemon-list/pokemon-list.types';

interface MatchParams {
  id: string;
}

interface LocationProps extends RouteComponentProps<MatchParams> {}

interface StateProps {
  pokemon: Pokemon | void;
  pagination: PokemonPagination;
}

type Props = LocationProps & StateProps;

class PokemonDetailsWrapper extends React.Component<Props> {
  static displayName = 'PokemonDetail';

  render() {
    const { pokemon, pagination } = this.props;

    if (!pokemon) return null;
    return <PokemonDetailsView pokemon={pokemon} pagination={pagination} />;
  }
}

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  pokemon: getSelectedPokemon(state)(Number(props.match.params.id)),
  pagination: getPokemonPagination(state)(Number(props.match.params.id)),
});

export default connect(mapStateToProps)(PokemonDetailsWrapper);
