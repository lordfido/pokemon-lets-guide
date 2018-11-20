import * as React from 'react';
import classnames from 'classnames';

interface OwnProps {
  size?: string;
}

class Loading extends React.Component<OwnProps> {
  static displayName = 'Loading';

  render() {
    const { size = 'md' } = this.props;
    const classes = classnames('Loading', classnames, { [`Loading--${size}`]: true });

    return (
      <div className={classes}>
        <div className="Loading-spinner" />
      </div>
    );
  }
}

export default Loading;
