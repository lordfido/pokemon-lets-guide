import * as React from 'react';

import Space from './space';

interface IOwnProps {
  options: {
    icon?: string | React.ReactElement<{}>;
    iconLast?: boolean;
    label?: string;
  };
}

class TouchableContent extends React.Component<IOwnProps> {
  public render() {
    const {
      options: { icon, iconLast, label },
    } = this.props;

    if (typeof icon === 'string') {
      return (
        <span>
          {icon && !iconLast && <i className={`fa fa-${icon}`} />}
          {icon && !iconLast && label && <Space />}
          {label}
          {icon && iconLast && label && <Space />}
          {icon && iconLast && <i className={`fa fa-${icon}`} />}
        </span>
      );
    }

    return (
      <span>
        {icon && !iconLast && icon}
        {icon && !iconLast && label && <Space />}
        {label}
        {icon && iconLast && label && <Space />}
        {icon && iconLast && icon}
      </span>
    );
  }
}

export default TouchableContent;
