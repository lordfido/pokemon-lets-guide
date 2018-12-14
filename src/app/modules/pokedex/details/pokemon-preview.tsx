import * as React from 'react';

import Image from '../../../components/image';

interface IOwnProps {
  src: string;
  alt?: string;
}

const PokemonPreview = ({ src, alt }: IOwnProps) => (
  <div className="PokemonPreview">
    <Image className="PokemonPreview-image" src={src} alt={alt} />
  </div>
);

export default PokemonPreview;
