import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../utils/translations';

import { BORDER_RADIUS_BIG, BORDER_RADIUS_SMALL, PADDING_XXL } from '../../../constants/styles';
import {
  POKEDEX_WINDOW_BACKGROUND_2,
  POKEDEX_WINDOW_BACKGROUND_3,
  traslucentColor,
} from '../../../constants/styles-colors';
import { FONT_XXL } from '../../../constants/styles-fonts';
import { DESKTOP } from '../../../constants/styles-media-queries';
import { commonStyles } from './pokemon.constants';

import { ISheet } from '../../root.models';

const sheet: ISheet = {
  text: {
    margin: '0 auto',
    maxWidth: 1024,
  },
  window: {
    ...commonStyles.window,
    backgroundColor: traslucentColor(POKEDEX_WINDOW_BACKGROUND_2, 0.7),
    borderColor: POKEDEX_WINDOW_BACKGROUND_2,
    borderRadius: `${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px`,
    fontSize: FONT_XXL,

    [DESKTOP]: {
      margin: PADDING_XXL,
      width: `calc(100% - ${PADDING_XXL * 2}px)`,
    },
  },
  wrapper: {
    ...commonStyles.wrapper,
    borderColor: POKEDEX_WINDOW_BACKGROUND_3,
    borderRadius: `${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px`,
    padding: PADDING_XXL,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  text: string;
}

const unstyledPokemonPokedexEntry = ({ classes, text }: IOwnProps) => (
  <div className={classes.window}>
    <div className={classes.wrapper}>
      <p className={classes.text}>{text || getTranslation('pokemon-details-no-pokedex-entry')}</p>
    </div>
  </div>
);

const PokemonPokedexEntry = injectSheet(sheet)(unstyledPokemonPokedexEntry);

export default PokemonPokedexEntry;
