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

const Tag = ({ className, label, icon, backgroundColor, large, style }: ITagProps) => (
  <span className={classnames('Tag', className, { 'Tag--large': large })} style={style}>
    {icon && <CustomImage className={'Tag-icon'} style={{ backgroundColor, opacity: 1 }} src={icon} />}
    <span className={'Tag-label'} style={{ backgroundColor }}>
      {label}
    </span>
  </span>
);

export default Tag;
