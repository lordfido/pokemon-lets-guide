import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../utils/translations';

import Sidebar, { SIDEBAR_SIZE } from '../../components/sidebar';
import Field from '../forms/field';

import { ISheet } from '../../root.models';
import { IPokemonWithBaseCP } from '../pokedex/pokedex.models';

const sheet: ISheet = {
  results: {
    display: 'inline-block',
    width: `calc(100% - ${SIDEBAR_SIZE}px)`,
  },
  wrapper: {},
};

interface IOwnProps {
  classes: { [key: string]: string };
  handlePokemonSelect: (event: any) => void;
  pokemon?: IPokemonWithBaseCP;
  pokemonList: IPokemonWithBaseCP[];
}

const unstyledCalculatorView = ({ classes, handlePokemonSelect, pokemon, pokemonList }: IOwnProps) => (
  <>
    <Sidebar
      render={() => (
        <form noValidate>
          <Field
            options={{
              defaultValue: pokemon ? pokemon.id : undefined,
              id: 'pokemon',
              label: getTranslation('calculator-select-pokemon'),
              onChange: handlePokemonSelect,
              options: pokemonList.map(({ id, name }) => ({ id, label: name, value: id })),
              placeholder: 'Pikachu',
              type: 'dropdown',
            }}
          />
        </form>
      )}
    />
    <div className={classes.results}>
      {pokemon && (
        <p>
          {pokemon.nationalNumber} - {pokemon.name}
        </p>
      )}
    </div>
  </>
);

const CalculatorView = injectSheet(sheet)(unstyledCalculatorView);

export default CalculatorView;
