import * as React from 'react';
import { sortBy } from '../../utils/arrays';
import { getPaddedId } from '../../utils/pokemon-stats';

import Tag from '../../components/tag';

import { getTypeIcon } from '../../../constants/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon-types-color';

import { Pokemon } from '../pokemon-list/pokemon-list.types';

interface OwnProps {
  pokemon: Pokemon;
}

class PokemonInfo extends React.Component<OwnProps> {
  static displayName = 'PokemonInfo';

  componentDidMount() {
    const { pokemon } = this.props;
    console.log(pokemon.types.relations);
  }

  render() {
    const { pokemon } = this.props;

    return (
      <div className="PokemonInfo">
        <div className="PokemonInfo-wrapper">
          <p className="PokemonInfo-line PokemonInfo-number">Pokédex No. {getPaddedId(pokemon.id)}</p>
          <p className="PokemonInfo-line PokemonInfo-name">{pokemon.name}</p>
          <span className="PokemonInfo-line PokemonInfo-types">
            {pokemon.types.ownTypes.map(type => (
              <Tag key={type} label={type} icon={getTypeIcon(type)} backgroundColor={getTypeColor(type)} />
            ))}
          </span>
          <p className="PokemonInfo-line PokemonInfo-description">{pokemon.description}</p>
          <br />
          <div className="PokemonInfo-weaknesses">
            <p>Weak against</p>
            {pokemon.types.relations
              .filter(r => r.effectiveness > 1)
              .map(({ id, effectiveness }) => (
                <Tag
                  key={id}
                  className="PokemonInfo-relation"
                  label={`${id} x${effectiveness}`}
                  icon={getTypeIcon(id)}
                  backgroundColor={getTypeColor(id)}
                  large
                />
              ))}
          </div>
          <div className="PokemonInfo-strengths">
            <p>Strong against: </p>
            {pokemon.types.relations
              .filter(r => r.effectiveness < 1)
              .map(({ id, effectiveness }) => (
                <Tag
                  key={id}
                  className="PokemonInfo-relation"
                  label={`${id} x${effectiveness}`}
                  icon={getTypeIcon(id)}
                  backgroundColor={getTypeColor(id)}
                  large
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonInfo;
