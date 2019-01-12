import * as React from 'react';
import injectSheet from 'react-jss';

import { PADDING_M } from '../../constants/styles';
import { GREY_LIGHT_3 } from '../../constants/styles-colors';

import { ISheet } from '../root.models';

const height = 10;

const sheet: ISheet = {
  line: {
    borderRadius: height / 2,
    display: 'block',
    height,
    transition: 'width 0.3s',
  },
  wrapper: {
    backgroundColor: GREY_LIGHT_3,
    borderRadius: height / 2,
    display: 'block',
    height,
    margin: `${PADDING_M * 1.2}px auto`,
    width: '100%',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  percentage: number;
  color: string;
}

const unstyledProgressBar = ({ classes, color, percentage }: IOwnProps) => (
  <div className={classes.wrapper}>
    <div className={classes.line} style={{ backgroundColor: color, width: `${percentage}%` }} />
  </div>
);

const ProgressBar = injectSheet(sheet)(unstyledProgressBar);

export default ProgressBar;
