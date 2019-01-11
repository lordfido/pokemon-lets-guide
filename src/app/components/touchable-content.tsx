import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import Space from './space';

interface IOwnProps {
  options: {
    customIcon?: React.ReactElement<{}>;
    icon?: IconName;
    iconLast?: boolean;
    iconPrefix?: IconPrefix;
    label?: string;
  };
}

const TouchableContent = ({ options: { customIcon, icon, iconLast, iconPrefix = 'fas', label } }: IOwnProps) => {
  if (icon && iconPrefix) {
    return (
      <span>
        {!iconLast && <FontAwesomeIcon icon={[iconPrefix, icon]} />}
        {!iconLast && label && <Space />}
        {label}
        {iconLast && label && <Space />}
        {iconLast && <FontAwesomeIcon icon={[iconPrefix, icon]} />}
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
