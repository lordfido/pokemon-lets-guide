import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { getRichPokemon } from '../../../utils/pokemon';

import { getPokemonPagination, getSelectedPokemon } from '../../../root.reducer';

import PokemonDetailsView from './pokemon-view';

import { IRootState } from '../../../root.models';
import { IPokemonDetailPagination, IRichPokemon } from '../pokedex.models';

import { HOME } from '../../../../constants/appRoutes';

interface IMatchParams {
  id: string;
}

interface ILocationProps extends RouteComponentProps<IMatchParams> {}

interface IStateProps {
  pokemon: IRichPokemon | void;
  pagination: IPokemonDetailPagination;
}

type Props = ILocationProps & IStateProps;

const PokemonDetailsWrapper = ({ pokemon, pagination }: Props) =>
  pokemon ? <PokemonDetailsView pokemon={pokemon} pagination={pagination} /> : <Redirect to={{ pathname: HOME }} />;

const mapStateToProps = (state: IRootState, props: Props): IStateProps => {
  const selectedPokemon = getSelectedPokemon(state)(props.match.params.id);
  const pokemon = selectedPokemon ? getRichPokemon(selectedPokemon) : undefined;

  return {
    pagination: getPokemonPagination(state)(props.match.params.id),
    pokemon,
  };
};

export default connect(mapStateToProps)(PokemonDetailsWrapper);
