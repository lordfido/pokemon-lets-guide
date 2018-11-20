import * as React from 'react';
import classnames from 'classnames';

import TouchableContent from './touchable-content';

export interface TagProps {
  id: string;
  className?: string;
  label?: string;
  icon?: string | React.ReactElement<{}>;
  iconLast?: boolean;
}

interface OwnProps {
  options: TagProps;
  backgroundColor: string;
  color?: string;
}

class Tag extends React.Component<OwnProps> {
  static displayName = 'Tag';

  render() {
    const { options, backgroundColor, color = 'white' } = this.props;

    const classes = {
      wrapper: classnames('Tag', options.className),
    };

    const touchable = {
      label: options.label,
      icon: options.icon,
      iconLast: options.iconLast,
    };

    return (
      <span className={classes.wrapper} style={{ backgroundColor, color }}>
        <TouchableContent options={touchable} />
      </span>
    );
  }
}

export default Tag;
