import * as React from 'react';
import Img from 'react-lazy-img';

interface IOwnProps {
  src: string;
  [key: string]: any;
}

const Image = ({ src, ...props }: IOwnProps) => <Img offset={300} src={src} {...props} />;

export default Image;
