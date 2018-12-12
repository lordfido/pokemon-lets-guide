import * as React from 'react';
import CustomImage from './image';

interface IOwnProps {
  picture: string;
}

const Avatar = ({ picture }: IOwnProps) => (
  <div className="Avatar">
    <CustomImage className="Avatar-picture" src={picture} />
  </div>
);

export default Avatar;
