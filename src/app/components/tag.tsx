import * as React from 'react';
import classnames from 'classnames';

export interface TagProps {
  label: string;
  icon?: string;
  backgroundColor: string;
  className?: string;
}

class Tag extends React.Component<TagProps> {
  static displayName = 'Tag';

  render() {
    const { className, label, icon, backgroundColor } = this.props;

    const classes = {
      wrapper: classnames('Tag', className),
      icon: 'Tag-icon',
      label: 'Tag-label',
    };

    return (
      <span className={classes.wrapper}>
        {icon && <img className={classes.icon} src={icon} />}
        <span className={classes.label} style={{ backgroundColor }}>
          {label}
        </span>
      </span>
    );
  }
}

export default Tag;
