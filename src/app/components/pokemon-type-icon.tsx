import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { PokemonType } from '../../constants/pokemon/pokemon-types';
import { getTypeIcon } from '../../constants/pokemon/pokemon-types-icons';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  icon: {
    filter: 'invert(1)',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  type: PokemonType;
  style?: React.CSSProperties;
}

const unstyledPokemonTypeIcon = ({ classes, className, type, style }: IOwnProps) => (
  <img className={classnames(classes.icon, className)} src={getTypeIcon(type)} style={style} />
);

const PokemonTypeIcon = injectSheet(sheet)(unstyledPokemonTypeIcon);

export default PokemonTypeIcon;
