import { BORDER_RADIUS, PADDING_L, PADDING_M, PADDING_S, PADDING_XL } from '../../../constants/styles';
import { DISABLED_BACKGROUND, DISABLED_BORDER, DISABLED_COLOR, WHITE } from '../../../constants/styles-colors';
import { FONT_L } from '../../../constants/styles-fonts';
import { INPUT_BORDER_COLOR, INPUT_BORDER_COLOR_FOCUSED } from '../../../constants/styles-skin';

import { ISheet } from '../../root.models';

export const commonStyles: ISheet = {
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
