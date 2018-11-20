import * as React from 'react';
import classnames from 'classnames';

const basicClassName = 'Spacer';

interface OwnProps {
  size?: string;
}

class Spacer extends React.Component<OwnProps> {
  static displayName = 'Space';

  render() {
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
