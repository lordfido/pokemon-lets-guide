import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { PADDING_L, PADDING_XL, PADDING_XXL } from '../../constants/styles/styles';

const sheet = {
  wrapper: {
    display: 'block',
    width: '100%',
  },

  xs: {
    borderBottom: 'none',
    margin: `${PADDING_L}px auto`,
  },

  sm: {
    borderBottom: 'none',
    margin: `${PADDING_XL}px auto`,
  },

  md: {
    borderBottom: '1px solid #ddd',
    margin: `${PADDING_XXL}px auto`,
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
