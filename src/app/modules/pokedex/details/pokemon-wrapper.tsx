import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getRichPokemon } from '../../../utils/pokemon';

import { getPokemonPagination, getSelectedPokemon } from '../../../root.reducer';

import PokemonDetailsView from './pokemon-view';

import { IRootState } from '../../../root.models';
import { IPokemonDetailPagination, IRichPokemon } from '../pokedex.models';

import { POKEDEX } from '../../../../constants/appRoutes';

interface IOwnProps {
  id: string;
}

interface IStateProps {
  pokemon: IRichPokemon | void;
  pagination: IPokemonDetailPagination;
}

type Props = IOwnProps & IStateProps;

const PokemonDetailsWrapper = ({ pokemon, pagination }: Props) =>
  pokemon ? <PokemonDetailsView pokemon={pokemon} pagination={pagination} /> : <Redirect to={{ pathname: POKEDEX }} />;

const mapStateToProps = (state: IRootState, ownProps: Props): IStateProps => {
  const selectedPokemon = getSelectedPokemon(state)(ownProps.id);
  const pokemon = selectedPokemon ? getRichPokemon(selectedPokemon) : undefined;

  const pagination = getPokemonPagination(state)(ownProps.id);

  return {
    pagination,
    pokemon,
  };
};

export default connect(mapStateToProps)(PokemonDetailsWrapper);
