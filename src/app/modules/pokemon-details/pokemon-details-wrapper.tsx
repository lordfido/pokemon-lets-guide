import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getRichPokemon } from '../../utils/pokemon';

import { getSelectedPokemon, getPokemonPagination } from '../../root.reducer';

import PokemonDetailsView from './pokemon-details-view';

import { RootState } from '../../root.types';
import { RichPokemon, PokemonPagination } from '../pokemon-list/pokemon-list.types';

interface MatchParams {
  id: string;
}

interface LocationProps extends RouteComponentProps<MatchParams> {}

interface StateProps {
  pokemon: RichPokemon | void;
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

const mapStateToProps = (state: RootState, props: Props): StateProps => {
  const selectedPokemon = getSelectedPokemon(state)(props.match.params.id);
  const pokemon = selectedPokemon ? getRichPokemon(selectedPokemon) : undefined;

  return {
    pokemon,
    pagination: getPokemonPagination(state)(props.match.params.id),
  };
};

export default connect(mapStateToProps)(PokemonDetailsWrapper);
