import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { BORDER_RADIUS, PADDING_L, PADDING_S, PADDING_XL, SIZE_M, SIZE_XS } from '../../constants/styles/styles';
import { FONT_S, TEXT_WHITE } from '../../constants/styles/styles-fonts';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  icon: {
    border: 'none',
    borderRadius: '50%',
    display: 'inline-block',
    height: SIZE_M,
    padding: 2,
    position: 'relative',
    verticalAlign: 'middle',
    width: SIZE_M,
    zIndex: 2,
  },
  iconImage: {
    filter: 'invert(1)',
  },
  label: {
    borderRadius: BORDER_RADIUS,
    display: 'inline-block',
    height: SIZE_M,
    lineHeight: `${SIZE_XS}px`,
    padding: `${PADDING_S}px ${PADDING_L}px`,
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle',
    zIndex: 1,
  },
  labelWithIcon: {
    height: SIZE_XS,
    marginLeft: -6,
    padding: `0px ${PADDING_L}px`,
    paddingLeft: 10,
  },
  large: {
    padding: `0px ${PADDING_XL}px`,
    paddingLeft: 14,
  },
  wrapper: {
    color: TEXT_WHITE,
    display: 'inline-block',
    flexGrow: 1,
    fontSize: FONT_S,
    letterSpacing: -0.6,
    marginLeft: 4,
    position: 'relative',
    textTransform: 'uppercase',

    '&:first-of-type': {
      marginLeft: 0,
    },
  },
};

export interface ITagProps {
  backgroundColor: string;
  classes: { [key: string]: string };
  className?: string;
  icon?: string;
  label: string;
  large?: boolean;
  style?: React.CSSProperties;
}

const unstyledTag = ({ backgroundColor, classes, className, icon, label, large = true, style }: ITagProps) => (
  <span className={classnames(classes.wrapper, className)} style={style}>
    {icon && (
      <span className={classes.icon} style={{ backgroundColor, opacity: 1 }}>
        <img className={classes.iconImage} src={icon} />
      </span>
    )}
    <span
      className={classnames(classes.label, icon ? classes.labelWithIcon : undefined, large ? classes.large : undefined)}
      style={{ backgroundColor }}
    >
      {label}
    </span>
  </span>
);

const Tag = injectSheet(sheet)(unstyledTag);

export default Tag;
