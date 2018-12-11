import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getRichPokemon } from '../../utils/pokemon';

import { getPokemonPagination, getSelectedPokemon } from '../../root.reducer';

import PokemonDetailsView from './pokemon-details-view';

import { IRootState } from '../../root.types';
import { IPokemonPagination, IRichPokemon } from '../pokemon-list/pokemon-list.types';

interface IMatchParams {
  id: string;
}

interface ILocationProps extends RouteComponentProps<IMatchParams> {}

interface IStateProps {
  pokemon: IRichPokemon | void;
  pagination: IPokemonPagination;
}

type Props = ILocationProps & IStateProps;

class PokemonDetailsWrapper extends React.Component<Props> {
  public static displayName = 'PokemonDetail';

  public render() {
    const { pokemon, pagination } = this.props;

    if (!pokemon) {
      return null;
    }

    return <PokemonDetailsView pokemon={pokemon} pagination={pagination} />;
  }
}

const mapStateToProps = (state: IRootState, props: Props): IStateProps => {
  const selectedPokemon = getSelectedPokemon(state)(props.match.params.id);
  const pokemon = selectedPokemon ? getRichPokemon(selectedPokemon) : undefined;

  return {
    pagination: getPokemonPagination(state)(props.match.params.id),
    pokemon,
  };
};

export default connect(mapStateToProps)(PokemonDetailsWrapper);
