import * as React from 'react';
import CustomImage from './image';

interface OwnProps {
  picture: string;
}

class Avatar extends React.Component<OwnProps> {
  static displayName = 'Avatar';

  render() {
    const { picture } = this.props;

    return (
      <div className="Avatar">
        <CustomImage className="Avatar-picture" src={picture} />
      </div>
    );
  }
}

export default Avatar;
