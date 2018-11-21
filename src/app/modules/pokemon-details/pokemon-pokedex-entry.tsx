import * as React from 'react';

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
          <p className="PokemonPokedexEntry-text">{text || 'There is no data about this pokemon yet.'}</p>
        </div>
      </div>
    );
  }
}

export default PokemonPokedexEntry;
