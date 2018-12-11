import classnames from 'classnames';
import * as React from 'react';

const basicClassName = 'Spacer';

interface IOwnProps {
  size?: 'xs' | 'sm' | 'md';
}

class Spacer extends React.Component<IOwnProps> {
  public static displayName = 'Space';

  public render() {
    const { size } = this.props;

    const classes = size
      ? classnames(basicClassName, {
          [`Spacer--${size}`]: true,
        })
      : basicClassName;

    return <div className={classes} />;
  }
}

export default Spacer;
