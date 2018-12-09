import * as React from 'react';
import { getTranslation } from '../../utils/translations';

interface OwnProps {
  text: string;
}

class PokemonPokedexEntry extends React.Component<OwnProps> {
  static displayName = 'PokemonPokedexEntry';

  render() {
    const { text } = this.props;

    return (
      <div className="PokemonPokedexEntry">
        <div className="PokemonPokedexEntry-wrapper">
          <p className="PokemonPokedexEntry-text">{text || getTranslation('pokemon-details-no-pokedex-entry')}</p>
        </div>
      </div>
    );
  }
}

export default PokemonPokedexEntry;
