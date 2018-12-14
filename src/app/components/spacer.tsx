import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { SIZE_S, SIZE_XS, SIZE_XXXS } from '../../constants/styles';

const sheet = {
  wrapper: {
    display: 'block',
    width: '100%',
  },

  xs: {
    borderBottom: 'none',
    margin: `${SIZE_XXXS}px auto`,
  },

  sm: {
    borderBottom: 'none',
    margin: `${SIZE_XS}px auto`,
  },

  md: {
    borderBottom: '1px solid #ddd',
    margin: `${SIZE_S}px auto`,
  },
};
interface IOwnProps {
  classes: { [key: string]: string };
  size?: 'xs' | 'sm' | 'md';
}

const unstyledSpacer = ({ classes, size = 'md' }: IOwnProps) => (
  <div className={classnames(classes.wrapper, classes[size])} />
);

const Spacer = injectSheet(sheet)(unstyledSpacer);

export default Spacer;
