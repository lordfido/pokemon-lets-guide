import * as React from 'react';
import injectSheet from 'react-jss';

import Image from '../../components/image';

import { pokedexWindowStyles, POKEDEX_WINDOW_MAX_WIDTH } from '../../../constants/styles/styles-common-rules';
import { DESKTOP, DESKTOP_L } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';

const sheet: ISheet = {
  image: {
    margin: '0 auto',
    maxHeight: 320,
    maxWidth: '100%',

    [DESKTOP]: {
      maxHeight: 352,
    },

    [DESKTOP_L]: {
      maxHeight: 560,
    },
  },
  window: {
    ...pokedexWindowStyles.window,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    textAlign: 'center',

    [DESKTOP]: {
      margin: 0,
      paddingTop: 200,
      width: `calc(100% - ${POKEDEX_WINDOW_MAX_WIDTH * 2}px)`,
    },

    [DESKTOP_L]: {
      paddingTop: 96,
    },
  },
};
interface IOwnProps {
  alt?: string;
  classes: { [key: string]: string };
  src?: string;
}

const unstyledPokemonPreview = ({ classes, src, alt }: IOwnProps) => (
  <div className={classes.window}>{src && <Image className={classes.image} src={src} alt={alt} />}</div>
);

const PokemonPreview = injectSheet(sheet)(unstyledPokemonPreview);

export default PokemonPreview;
