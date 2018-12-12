import classnames from 'classnames';
import * as React from 'react';

interface IOwnProps {
  size?: string;
}

const Loading = ({ size = 'md' }: IOwnProps) => (
  <div className={classnames('Loading', classnames, { [`Loading--${size}`]: true })}>
    <div className="Loading-spinner" />
  </div>
);

export default Loading;
