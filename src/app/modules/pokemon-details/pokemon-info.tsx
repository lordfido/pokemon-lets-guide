import * as React from 'react';
import { getPaddedId } from '../../utils/pokemon';

import Tag from '../../components/tag';
import Spacer from '../../components/spacer';

import { getTypeIcon } from '../../../constants/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon-types-color';

import { RichPokemon } from '../pokemon-list/pokemon-list.types';
import { Type } from 'pokelab-lets-go/dist/cjs/types';

interface OwnProps {
  pokemon: RichPokemon;
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
      <React.Fragment>
        <div className="PokemonInfo">
          <div className="PokemonInfo-wrapper">
            <p className="PokemonInfo-line PokemonInfo-number">
              Pokédex No. {getPaddedId(String(pokemon.nationalNumber))}
            </p>
            <p className="PokemonInfo-line PokemonInfo-name">{pokemon.name}</p>
            <span className="PokemonInfo-line PokemonInfo-types">
              {pokemon.types.ownTypes.map((type: Type) => (
                <Tag key={type} label={type} icon={getTypeIcon(type)} backgroundColor={getTypeColor(type)} />
              ))}
            </span>
            <p className="PokemonInfo-line PokemonInfo-description">{pokemon.description}</p>

            <Spacer />

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
                    style={{ marginBottom: 4 }}
                    large
                  />
                ))}
            </div>
            <div className="PokemonInfo-strengths">
              <p>Strong against</p>
              {pokemon.types.relations
                .filter(r => r.effectiveness < 1)
                .map(({ id, effectiveness }) => (
                  <Tag
                    key={id}
                    className="PokemonInfo-relation"
                    label={`${id} x${effectiveness}`}
                    icon={getTypeIcon(id)}
                    backgroundColor={getTypeColor(id)}
                    style={{ marginBottom: 4 }}
                    large
                  />
                ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PokemonInfo;
