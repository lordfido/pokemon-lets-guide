import * as React from 'react';
import injectSheet from 'react-jss';

import Image from '../../../components/image';

import { DESKTOP, DESKTOP_L } from '../../../../constants/styles-media-queries';
import { commonStyles, MAX_WIDTH } from './pokemon.constants';

import { ISheet } from '../../../root.models';

const sheet: ISheet = {
  image: {
    margin: '0 auto',
    maxHeight: 216,
    maxWidth: '100%',

    [DESKTOP]: {
      maxHeight: 352,
    },

    [DESKTOP_L]: {
      maxHeight: 560,
    },
  },
  window: {
    ...commonStyles.window,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    textAlign: 'center',

    [DESKTOP]: {
      margin: 0,
      paddingTop: 200,
      width: `calc(100% - ${MAX_WIDTH * 2}px)`,
    },

    [DESKTOP_L]: {
      paddingTop: 96,
    },
  },
};
interface IOwnProps {
  alt?: string;
  classes: { [key: string]: string };
  src: string;
}

const unstyledPokemonPreview = ({ classes, src, alt }: IOwnProps) => (
  <div className={classes.window}>
    <Image className={classes.image} src={src} alt={alt} />
  </div>
);

const PokemonPreview = injectSheet(sheet)(unstyledPokemonPreview);

export default PokemonPreview;
