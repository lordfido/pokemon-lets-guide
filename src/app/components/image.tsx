import * as React from 'react';
import Img from 'react-lazy-img';

interface IOwnProps {
  src: string;
  [key: string]: any;
}

const CustomLazyImage = ({ src, ...props }: IOwnProps) => <Img offset={300} src={src} {...props} />;

export default CustomLazyImage;
