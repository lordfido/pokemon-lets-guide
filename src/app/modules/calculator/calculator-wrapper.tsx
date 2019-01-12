import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getRichPokemon } from '../../utils/pokemon';

import CalculatorView from './calculator-view';

import { getRawPokedex, getSelectedPokemon } from '../../root.reducer';

import { CALCULATOR } from '../../../constants/appRoutes';

import { IRootState } from '../../root.models';
import { IOption } from '../forms/form.models';
import { IPokemonWithBaseCP, IRichPokemon } from '../pokedex/pokedex.models';

interface IOwnProps {
  id?: string;
}

interface IStateProps {
  pokemon?: IRichPokemon;
  pokemonList: IPokemonWithBaseCP[];
}

type Props = IOwnProps & IStateProps;

interface IOwnState {
  redirectTo: string;
}

class CalculatorWrapper extends React.Component<Props, IOwnState> {
  public state = {
    redirectTo: '',
  };

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.id !== this.props.id) {
      this.setState({
        redirectTo: '',
      });
    }
  }

  public handlePokemonSelect = (selectedOption: IOption) => {
    this.setState({
      redirectTo: CALCULATOR.replace(':id?', selectedOption.value),
    });
  };

  public render() {
    const { id, pokemon, pokemonList } = this.props;
    const { redirectTo } = this.state;
    const currentRoute = CALCULATOR.replace(':id?', id || '');

    if (redirectTo && redirectTo !== currentRoute) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }

    return (
      <CalculatorView
        pokemon={pokemon}
        pokemonList={pokemonList}
        handlePokemonSelect={e => {
          this.handlePokemonSelect(e);
        }}
      />
    );
  }
}

const mapStateToProps = (state: IRootState, { id }: Props) => {
  const selectedPokemon = id ? getSelectedPokemon(state)(id) : undefined;
  const pokemonList = getRawPokedex(state);

  return {
    pokemon: selectedPokemon ? getRichPokemon(selectedPokemon) : undefined,
    pokemonList,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorWrapper);
