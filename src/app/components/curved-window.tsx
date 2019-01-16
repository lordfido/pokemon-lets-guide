import classnames from 'classnames';
import * as React from 'react';

import injectSheet from 'react-jss';

import { PADDING_S } from '../../constants/styles/styles';
import { WINDOW_BACKGROUND, WINDOW_BORDER } from '../../constants/styles/styles-skin';

import { ISheet } from '../root.models';
import CurvedWindowPart, { borderSize } from './forbidden/curved-window-part';

const sheet: ISheet = {
  window1: {
    padding: PADDING_S,
  },
  window2: {
    padding: PADDING_S / 2,
  },
  window3: {},
  wrapper: {
    padding: borderSize,
  },
};

interface IOwnProps {
  backgroundColor?: string;
  borderColor?: string;
  children: any;
  classes: { [key: string]: string };
  className?: string;
}

const unstyledCurvedWindow = ({
  backgroundColor = WINDOW_BACKGROUND,
  borderColor = WINDOW_BORDER,
  children,
  classes,
  className,
}: IOwnProps) => (
  <div className={classnames(classes.wrapper, className)}>
    <CurvedWindowPart backgroundColor={backgroundColor} className={classes.window1}>
      <CurvedWindowPart backgroundColor={borderColor} className={classes.window2}>
        <CurvedWindowPart backgroundColor={backgroundColor} className={classes.window3}>
          {children}
        </CurvedWindowPart>
      </CurvedWindowPart>
    </CurvedWindowPart>
  </div>
);

const CurvedWindow = injectSheet(sheet)(unstyledCurvedWindow);

export default CurvedWindow;
