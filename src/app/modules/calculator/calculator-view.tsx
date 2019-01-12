import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../utils/translations';

import Sidebar, { SIDEBAR_SIZE } from '../../components/sidebar';
import Field from '../forms/field';
import PokemonPreview from '../pokedex/details/pokemon-preview';
import PokemonStats from '../pokedex/details/pokemon-stats';

import { PADDING_XXL } from '../../../constants/styles';
import { DESKTOP, DESKTOP_L } from '../../../constants/styles-media-queries';
import { commonStyles, MAX_WIDTH } from '../pokedex/details/pokemon.constants';

import { ISheet } from '../../root.models';
import { IPokemonWithBaseCP, IRichPokemon } from '../pokedex/pokedex.models';

const sheet: ISheet = {
  customization: {
    ...commonStyles.window,
    backgroundColor: 'initial',
    border: 'none',

    [DESKTOP]: {
      margin: 0,
      marginLeft: PADDING_XXL,
      marginTop: PADDING_XXL,
      width: MAX_WIDTH - PADDING_XXL,
    },
  },
  result: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '100%',

    [DESKTOP_L]: {
      width: `calc(100% - ${SIDEBAR_SIZE}px)`,
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  handlePokemonSelect: (event: any) => void;
  pokemon?: IRichPokemon;
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
    {pokemon && (
      <div className={classes.result}>
        <div className={classes.customization}>Aquí las opciones de personalización</div>
        <PokemonPreview src={pokemon.avatar} />
        <PokemonStats pokemon={pokemon} />
      </div>
    )}
  </>
);

const CalculatorView = injectSheet(sheet)(unstyledCalculatorView);

export default CalculatorView;
