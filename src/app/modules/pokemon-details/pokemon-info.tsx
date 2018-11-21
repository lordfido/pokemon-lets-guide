import * as React from 'react';
import { getPaddedId } from '../../utils/pokemon-stats';
import { capitalize } from '../../utils/strings';
import { getTypeIcon } from '../../../constants/pokemon-types';

import Tag from '../../components/tag';

import { getTypeColor } from '../../../constants/pokemon-types-color';

import { Pokemon } from '../pokemon-list/pokemon-list.types';

interface OwnProps {
  pokemon: Pokemon;
}

class PokemonInfo extends React.Component<OwnProps> {
  static displayName = 'PokemonInfo';

  render() {
    const { pokemon } = this.props;

    return (
      <div className="PokemonInfo">
        <div className="PokemonInfo-wrapper">
          <p className="PokemonInfo-line PokemonInfo-number">Pokédex No. {getPaddedId(pokemon.id)}</p>
          <p className="PokemonInfo-line PokemonInfo-name">{pokemon.name}</p>
          <p className="PokemonInfo-line PokemonInfo-types">
            {pokemon.types.map(type => (
              <Tag key={type} label={capitalize(type)} icon={getTypeIcon(type)} backgroundColor={getTypeColor(type)} />
            ))}
          </p>
          <p className="PokemonInfo-line PokemonInfo-description">{pokemon.description}</p>
        </div>
      </div>
    );
  }
}

export default PokemonInfo;
