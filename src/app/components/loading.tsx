import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { BRAND_COLOR, SIZE_S, SIZE_XXL } from '../../constants/styles';

import { CssSizes, ISheet } from '../root.models';

const spinnerSize = SIZE_XXL;

const sheet: ISheet = {
  spinner: {
    display: 'inline-block',
    height: spinnerSize,
    width: spinnerSize,

    '&:after': {
      animation: 'lds-dual-ring 1.2s linear infinite',
      border: `${spinnerSize / 16}px solid ${BRAND_COLOR}`,
      borderColor: `${BRAND_COLOR} transparent ${BRAND_COLOR} transparent`,
      borderRadius: '50%',
      content: "' '",
      display: 'block',
      height: spinnerSize - spinnerSize / 4,
      margin: '1px',
      width: spinnerSize - spinnerSize / 4,
    },
  },
  wrapper: {
    display: 'inline-block',
    margin: `${SIZE_S}px auto`,
    position: 'relative',
    textAlign: 'center',
    width: '100%',
  },

  xs: {
    height: spinnerSize / 4,
    width: spinnerSize / 4,

    '&:after': {
      borderWidth: spinnerSize / 16 / 2,
      height: (spinnerSize - spinnerSize / 4) / 4,
      width: (spinnerSize - spinnerSize / 4) / 4,
    },
  },

  sm: {
    height: spinnerSize / 2,
    width: spinnerSize / 2,

    '&:after': {
      borderWidth: spinnerSize / 16 / 1.5,
      height: (spinnerSize - spinnerSize / 4) / 2,
      width: (spinnerSize - spinnerSize / 4) / 2,
    },
  },

  md: {
    height: spinnerSize,
    width: spinnerSize,

    '&:after': {
      borderWidth: spinnerSize / 16,
      height: spinnerSize - spinnerSize / 4,
      width: spinnerSize - spinnerSize / 4,
    },
  },

  lg: {
    height: spinnerSize * 2,
    width: spinnerSize * 2,

    '&:after': {
      borderWidth: (spinnerSize / 16) * 2,
      height: (spinnerSize - spinnerSize / 4) * 2,
      width: (spinnerSize - spinnerSize / 4) * 2,
    },
  },

  xl: {
    height: spinnerSize * 4,
    width: spinnerSize * 4,

    '&:after': {
      borderWidth: (spinnerSize / 16) * 3,
      height: (spinnerSize - spinnerSize / 4) * 3,
      width: (spinnerSize - spinnerSize / 4) * 3,
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  size?: CssSizes;
}

const unstyledLoading = ({ classes, size = 'md' }: IOwnProps) => (
  <div className={classnames(classes.wrapper, classnames)}>
    <div className={classnames(classes.spinner, classes[size])} />
  </div>
);

const Loading = injectSheet(sheet)(unstyledLoading);

export default Loading;
