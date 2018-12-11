import classnames from 'classnames';
import * as React from 'react';

import CustomImage from './image';

export interface ITagProps {
  label: string;
  icon?: string;
  backgroundColor: string;
  className?: string;
  large?: boolean;
  style?: React.CSSProperties;
}

class Tag extends React.Component<ITagProps> {
  public static displayName = 'Tag';

  public render() {
    const { className, label, icon, backgroundColor, large, style } = this.props;

    const classes = {
      icon: 'Tag-icon',
      label: 'Tag-label',
      wrapper: classnames('Tag', className, { 'Tag--large': large }),
    };

    return (
      <span className={classes.wrapper} style={style}>
        {icon && <CustomImage className={classes.icon} style={{ backgroundColor, opacity: 1 }} src={icon} />}
        <span className={classes.label} style={{ backgroundColor }}>
          {label}
        </span>
      </span>
    );
  }
}

export default Tag;
