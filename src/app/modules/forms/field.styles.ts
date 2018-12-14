import { BORDER_RADIUS } from '../../../constants/styles';
import { DISABLED_BACKGROUND, DISABLED_COLOR, GREY_DARK, WHITE } from '../../../constants/styles-colors';
import { FONT_L, FONT_M } from '../../../constants/styles-fonts';
import { INPUT_BORDER_COLOR } from '../../../constants/styles-skin';

import { ISheet } from '../../root.models';

const margin = 6;

export const commonStyles: ISheet = {
  field: {
    appearance: 'none',
    backgroundColor: WHITE,
    border: `1px solid ${INPUT_BORDER_COLOR}`,
    borderRadius: BORDER_RADIUS,
    display: 'block',
    fontFamily: 'inherit',
    fontSize: FONT_M,
    lineHeight: '1.3em',
    minHeight: 38,
    outline: 'none',
    padding: `${margin}px ${margin * 2}px`,
    verticalAlign: 'middle',
    width: '100%',
  },
  fieldDisabled: {
    backgroundColor: DISABLED_BACKGROUND,
    color: DISABLED_COLOR,
    cursor: 'not-allowed',
  },
  label: {
    display: 'block',
    width: '100%',
  },
  wrapper: {
    color: GREY_DARK,
    display: 'inline-block',
    fontSize: FONT_L,
    margin,
    marginTop: margin * 2,
    position: 'relative',
    width: `calc(100% - ${margin * 2}px)`,
  },
};
