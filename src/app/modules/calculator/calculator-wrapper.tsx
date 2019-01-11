import * as React from 'react';
import { connect } from 'react-redux';

import { IRootState } from '../../root.models';
import { getSelectedPokemon } from '../../root.reducer';
import { IPokemonWithBaseCP } from '../pokedex/pokedex.models';

interface IOwnProps {
  id?: string;
}

interface IStateProps {
  pokemon?: IPokemonWithBaseCP;
}

type Props = IOwnProps & IStateProps;

const CalculatorWrapper = ({ id, pokemon }: Props) => {
  return (
    <div>
      {pokemon && (
        <p>
          {id} - {pokemon.name}
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (root: IRootState, { id }: Props) => {
  const selectedPokemon = id ? getSelectedPokemon(root)(id) : undefined;

  return {
    pokemon: selectedPokemon,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorWrapper);
