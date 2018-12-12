import classnames from 'classnames';
import * as React from 'react';

interface IOwnProps {
  size?: 'xs' | 'sm' | 'md';
}

const Spacer = ({ size }: IOwnProps) => (
  <div
    className={classnames('Spacer', {
      [`Spacer--${size}`]: !!size,
    })}
  />
);

export default Spacer;
