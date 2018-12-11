import * as React from 'react';
import CustomImage from './image';

interface IOwnProps {
  picture: string;
}

class Avatar extends React.Component<IOwnProps> {
  public static displayName = 'Avatar';

  public render() {
    const { picture } = this.props;

    return (
      <div className="Avatar">
        <CustomImage className="Avatar-picture" src={picture} />
      </div>
    );
  }
}

export default Avatar;
