import * as React from 'react';
import CustomImage from '../../components/image';

interface OwnProps {
  previewUrl: string;
}

class PokemonPreview extends React.Component<OwnProps> {
  static displayName = 'PokemonPreview';

  render() {
    const { previewUrl } = this.props;

    return (
      <div className="PokemonPreview">
        <CustomImage className="PokemonPreview-image" src={previewUrl} />
      </div>
    );
  }
}

export default PokemonPreview;
