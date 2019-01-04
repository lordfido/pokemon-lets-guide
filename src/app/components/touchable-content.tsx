import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import Space from './space';

interface IOwnProps {
  options: {
    customIcon?: React.ReactElement<{}>;
    icon?: IconProp;
    iconLast?: boolean;
    label?: string;
  };
}

const TouchableContent = ({ options: { customIcon, icon, iconLast, label } }: IOwnProps) => {
  if (icon) {
    return (
      <span>
        {!iconLast && <FontAwesomeIcon icon={icon} />}
        {!iconLast && label && <Space />}
        {label}
        {iconLast && label && <Space />}
        {iconLast && <FontAwesomeIcon icon={icon} />}
      </span>
    );
  }

  if (customIcon) {
    return (
      <span>
        {!iconLast && customIcon}
        {!iconLast && label && <Space />}
        {label}
        {iconLast && label && <Space />}
        {iconLast && customIcon}
      </span>
    );
  }

  return <span>{label}</span>;
};

export default TouchableContent;
