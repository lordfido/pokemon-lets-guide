import * as React from 'react';
import { Link } from 'react-router-dom';

interface IOwnProps {
  image?: string;
  text?: string;
  to?: string;
}

const HeaderItem = ({ image, text, to }: IOwnProps) =>
  !!to ? (
    <Link className={'Header-item'} to={{ pathname: to }} style={image ? { backgroundImage: `url(${image})` } : {}}>
      {text && <span className="Header-text">{text}</span>}
    </Link>
  ) : (
    <span className="Header-item is-disabled" style={image ? { backgroundImage: `url(${image})` } : {}} />
  );

export default HeaderItem;
