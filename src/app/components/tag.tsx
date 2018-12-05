import * as React from 'react';
import classnames from 'classnames';
import CustomImage from './image';

export interface TagProps {
  label: string;
  icon?: string;
  backgroundColor: string;
  className?: string;
  large?: boolean;
  style?: React.CSSProperties;
}

class Tag extends React.Component<TagProps> {
  static displayName = 'Tag';

  render() {
    const { className, label, icon, backgroundColor, large, style } = this.props;

    const classes = {
      wrapper: classnames('Tag', className, { 'Tag--large': large }),
      icon: 'Tag-icon',
      label: 'Tag-label',
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
