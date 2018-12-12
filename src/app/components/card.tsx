import classnames from 'classnames';
import * as React from 'react';

import CustomImage from './image';

interface IOwnProps {
  children: JSX.Element;
  className?: string;
  title?: string;
  image?: string;
}

const Card = ({ children, className, image, title }: IOwnProps) => (
  <div className={classnames('Card', className)}>
    {!!title && <span className="Card-title">{title}</span>}
    {!!image && <CustomImage className="Card-image" src={image} />}
    {children}
  </div>
);

export default Card;
