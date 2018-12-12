import * as React from 'react';

import Space from './space';

interface IOwnProps {
  options: {
    icon?: string | React.ReactElement<{}>;
    iconLast?: boolean;
    label?: string;
  };
}

const TouchableContent = ({ options: { icon, iconLast, label } }: IOwnProps) => {
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
};

export default TouchableContent;
