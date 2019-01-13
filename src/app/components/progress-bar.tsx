import * as React from 'react';
import injectSheet from 'react-jss';

import { PADDING_M } from '../../constants/styles/styles';
import { GREY_LIGHT_3 } from '../../constants/styles/styles-colors';

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
  <span className={classes.wrapper}>
    <span className={classes.line} style={{ backgroundColor: color, width: `${percentage}%` }} />
  </span>
);

const ProgressBar = injectSheet(sheet)(unstyledProgressBar);

export default ProgressBar;
