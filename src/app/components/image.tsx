import * as React from 'react';
import Img from 'react-lazy-img';

interface OwnProps {
  src: string;
  [key: string]: any;
}

const CustomLazyImage = ({ src, ...props }: OwnProps) => <Img offset={300} src={src} {...props} />;

export default CustomLazyImage;
