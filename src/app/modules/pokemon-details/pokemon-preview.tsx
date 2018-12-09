import * as React from 'react';

import CustomImage from '../../components/image';

import { getTranslation } from '../../../constants/translations';

interface OwnProps {
  src: string;
  alt?: string;
}

class PokemonPreview extends React.Component<OwnProps> {
  static displayName = 'PokemonPreview';

  render() {
    const { src, alt } = this.props;

    return (
      <div className="PokemonPreview">
        <CustomImage className="PokemonPreview-image" src={src} alt={alt} />
      </div>
    );
  }
}

export default PokemonPreview;
