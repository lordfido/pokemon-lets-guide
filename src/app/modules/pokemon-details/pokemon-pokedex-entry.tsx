import * as React from 'react';
import { getTranslation } from '../../utils/translations';

interface IOwnProps {
  text: string;
}

class PokemonPokedexEntry extends React.Component<IOwnProps> {
  public static displayName = 'PokemonPokedexEntry';

  public render() {
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
