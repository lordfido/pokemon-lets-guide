import classnames from 'classnames';
import * as React from 'react';

interface IOwnProps {
  size?: string;
}

class Loading extends React.Component<IOwnProps> {
  public static displayName = 'Loading';

  public render() {
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
