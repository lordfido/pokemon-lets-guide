import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { getPokemonSprite } from '../../constants/pokemon/pokemon-sprites';

import { IPokemonWithBaseCP } from '../modules/pokedex/pokedex.models';
import { ISheet } from '../root.models';

const sheet: ISheet = {
  big: {
    maxHeight: 40,
  },
  image: {
    verticalAlign: 'middle',
  },
  medium: {
    maxHeight: 32,
  },
  small: {
    maxHeight: 24,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  pokemon: IPokemonWithBaseCP;
  size?: 'big' | 'medium' | 'small';
}

const unstyledPokemonSprite = ({ classes, pokemon, size = 'medium' }: IOwnProps) => (
  <img
    className={classnames(classes.image, classes[size])}
    src={getPokemonSprite(pokemon)}
    alt={`${pokemon.name} thumbnail`}
  />
);

const PokemonSprite = injectSheet(sheet)(unstyledPokemonSprite);

export default PokemonSprite;
