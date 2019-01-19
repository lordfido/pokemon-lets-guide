import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { WHITE } from '../../../constants/styles/styles-colors';
import { CURVED_WINDOW } from '../../../constants/styles/styles-zindex';

import { ISheet } from '../../root.models';

export const borderSize = 24;
const borderPercentage = 2;

const commonBorderProps: React.CSSProperties = {
  position: 'absolute',
  zIndex: CURVED_WINDOW,
};

const sheet: ISheet = {
  borderBottom: {
    ...commonBorderProps,
    borderBottomLeftRadius: '50%',
    borderBottomRightRadius: '50%',
    bottom: -borderSize + borderPercentage,
    height: borderSize,
    left: -borderSize / 2,
    width: `calc(100% + ${borderSize}px)`,
  },
  borderLeft: {
    ...commonBorderProps,
    borderBottomLeftRadius: '50%',
    borderTopLeftRadius: '50%',
    height: `calc(100% + ${borderSize - borderPercentage}px)`,
    left: -borderSize,
    top: -(borderSize / 2) + borderPercentage,
    width: borderSize,
  },
  borderRight: {
    ...commonBorderProps,
    borderBottomRightRadius: '50%',
    borderTopRightRadius: '50%',
    height: `calc(100% + ${borderSize - borderPercentage}px)`,
    right: -borderSize,
    top: -(borderSize / 2) + borderPercentage,
    width: borderSize,
  },
  borderTop: {
    ...commonBorderProps,
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    height: borderSize,
    left: -borderSize / 2,
    top: -borderSize + borderPercentage,
    width: `calc(100% + ${borderSize}px)`,
  },
  content: {},
  wrapper: {
    position: 'relative',
  },
};

interface IOwnProps {
  backgroundColor?: string;
  children: any;
  classes: { [key: string]: string };
  className?: string;
}

const unstyledCurvedWindowPart = ({ backgroundColor = WHITE, children, classes, className }: IOwnProps) => (
  <div className={classnames(classes.wrapper, className)}>
    <div className={classes.borderBottom} style={{ backgroundColor }} />
    <div className={classes.borderLeft} style={{ backgroundColor }} />
    <div className={classes.borderRight} style={{ backgroundColor }} />
    <div className={classes.borderTop} style={{ backgroundColor }} />
    <div
      className={classes.content}
      style={{
        backgroundColor,
      }}
    >
      {children}
    </div>
  </div>
);

const CurvedWindowPart = injectSheet(sheet)(unstyledCurvedWindowPart);

export default CurvedWindowPart;
