import { BORDER_RADIUS, PADDING_L, PADDING_M, PADDING_S, PADDING_XL } from './styles';
import {
  DISABLED_BACKGROUND,
  DISABLED_BORDER,
  DISABLED_COLOR,
  lighterColor,
  POKEDEX_BACKGROUND,
  POKEDEX_WINDOW_BACKGROUND,
  traslucentColor,
  WHITE,
} from './styles-colors';
import { FONT_L, TEXT_WHITE } from './styles-fonts';
import { INPUT_BORDER_COLOR, INPUT_BORDER_COLOR_FOCUSED } from './styles-skin';

import { ISheet } from '../../app/root.models';

// POKEDEX
export const POKEDEX_WINDOW_MAX_WIDTH = 314;

export const pokedexWindowStyles: ISheet = {
  window: {
    backgroundColor: POKEDEX_WINDOW_BACKGROUND,
    border: `2px solid ${POKEDEX_WINDOW_BACKGROUND}`,
    color: TEXT_WHITE,
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

// FIELDS
export const formInputStyles: ISheet = {
  field: {
    appearance: 'none',
    backgroundColor: WHITE,
    border: `1px solid ${INPUT_BORDER_COLOR}`,
    borderRadius: BORDER_RADIUS,
    color: 'inherit',
    display: 'block',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: '1.3em',
    minHeight: 38,
    outline: 'none',
    padding: `${PADDING_S / 2}px ${PADDING_L}px`,
    textAlign: 'inherit',
    verticalAlign: 'middle',
    width: '100%',

    '&:active, &:focus': {
      border: `1px solid ${INPUT_BORDER_COLOR_FOCUSED}`,
      boxShadow: `0 0 0 1px ${INPUT_BORDER_COLOR_FOCUSED}`,
    },
  },
  fieldDisabled: {
    backgroundColor: DISABLED_BACKGROUND,
    borderColor: DISABLED_BORDER,
    color: DISABLED_COLOR,
    cursor: 'not-allowed',
  },
  label: {
    display: 'block',
    textAlign: 'inherit',
    width: '100%',
  },
  wrapper: {
    color: 'inherit',
    display: 'inline-block',
    fontSize: FONT_L,
    margin: PADDING_M,
    marginTop: PADDING_XL,
    position: 'relative',
    textAlign: 'left',
    width: `calc(100% - ${PADDING_XL}px)`,
  },
};
