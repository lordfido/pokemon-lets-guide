import * as React from 'react';

import CustomImage from '../../components/image';

interface IOwnProps {
  src: string;
  alt?: string;
}

class PokemonPreview extends React.Component<IOwnProps> {
  public static displayName = 'PokemonPreview';

  public render() {
    const { src, alt } = this.props;

    return (
      <div className="PokemonPreview">
        <CustomImage className="PokemonPreview-image" src={src} alt={alt} />
      </div>
    );
  }
}

export default PokemonPreview;
