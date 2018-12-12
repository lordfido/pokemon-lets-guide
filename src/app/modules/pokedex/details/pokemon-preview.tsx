import * as React from 'react';

import CustomImage from '../../../components/image';

interface IOwnProps {
  src: string;
  alt?: string;
}

const PokemonPreview = ({ src, alt }: IOwnProps) => (
  <div className="PokemonPreview">
    <CustomImage className="PokemonPreview-image" src={src} alt={alt} />
  </div>
);

export default PokemonPreview;
