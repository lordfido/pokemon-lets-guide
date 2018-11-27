import * as React from 'react';
import Img from 'react-lazy-img';

interface OwnProps {
  src: string;
  [key: string]: any;
}

const CustomLazyImage = ({ src, ...props }: OwnProps) => (
  <Img
    offset={300}
    fallback={() => <span {...props} style={{ backgroundColor: '#dedede', opacity: 0.2, ...props.style }} />}
    src={src}
    {...props}
  />
);

export default CustomLazyImage;
