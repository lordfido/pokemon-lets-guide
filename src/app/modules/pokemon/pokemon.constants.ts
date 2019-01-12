import { PADDING_XL } from '../../../constants/styles';
import {
  lighterColor,
  POKEDEX_BACKGROUND,
  POKEDEX_WINDOW_BACKGROUND,
  traslucentColor,
} from '../../../constants/styles-colors';

import { ISheet } from '../../root.models';

export const commonStyles: ISheet = {
  window: {
    backgroundColor: POKEDEX_WINDOW_BACKGROUND,
    border: `2px solid ${POKEDEX_WINDOW_BACKGROUND}`,
    display: 'inline-block',
    margin: PADDING_XL,
    verticalAlign: 'top',
    width: `calc(100% - ${PADDING_XL * 2}px)`,
  },
  wrapper: {
    border: `2px solid ${traslucentColor(lighterColor(POKEDEX_BACKGROUND), 0.8)}`,
    maxWidth: '100%',
    padding: PADDING_XL,
  },
};

export const MAX_WIDTH = 314;
