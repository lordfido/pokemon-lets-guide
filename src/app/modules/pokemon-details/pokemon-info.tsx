import * as React from 'react';
import { getPaddedId } from '../../utils/pokemon';

import Spacer from '../../components/spacer';
import Tag from '../../components/tag';

import { getTypeColor } from '../../../constants/pokemon-types-color';
import { getTypeIcon } from '../../../constants/pokemon-types-icons';
import { getTranslation } from '../../utils/translations';

import { PokemonType } from '../../../constants/pokemon-types';
import { IRichPokemon } from '../pokemon-list/pokemon-list.types';

interface IOwnProps {
  pokemon: IRichPokemon;
}

class PokemonInfo extends React.Component<IOwnProps> {
  public static displayName = 'PokemonInfo';

  public render() {
    const { pokemon } = this.props;

    return (
      <React.Fragment>
        <div className="PokemonInfo">
          <div className="PokemonInfo-wrapper">
            <p className="PokemonInfo-line PokemonInfo-number">
              {getTranslation('pokemon-details-pokedex-number')} {getPaddedId(String(pokemon.nationalNumber))}
            </p>
            <p className="PokemonInfo-line PokemonInfo-name">{pokemon.name}</p>
            <span className="PokemonInfo-line PokemonInfo-types">
              {pokemon.types.ownTypes.map((type: PokemonType) => (
                <Tag
                  key={type}
                  label={getTranslation(`type-${type}`)}
                  icon={getTypeIcon(type)}
                  backgroundColor={getTypeColor(type)}
                />
              ))}
            </span>
            <p className="PokemonInfo-line PokemonInfo-description">{pokemon.description}</p>

            <Spacer />

            <div className="PokemonInfo-weaknesses">
              <p>{getTranslation('search-weak-against')}</p>
              {pokemon.types.relations
                .filter(r => r.effectiveness > 1)
                .map(({ id, effectiveness }) => (
                  <Tag
                    key={id}
                    className="PokemonInfo-relation"
                    label={`${getTranslation(`type-${id}`)} x${effectiveness}`}
                    icon={getTypeIcon(id)}
                    backgroundColor={getTypeColor(id)}
                    style={{ marginBottom: 4 }}
                  />
                ))}
            </div>
            <div className="PokemonInfo-strengths">
              <p>{getTranslation('search-strong-against')}</p>
              {pokemon.types.relations
                .filter(r => r.effectiveness < 1)
                .map(({ id, effectiveness }) => (
                  <Tag
                    key={id}
                    className="PokemonInfo-relation"
                    label={`${getTranslation(`type-${id}`)} x${effectiveness}`}
                    icon={getTypeIcon(id)}
                    backgroundColor={getTypeColor(id)}
                    style={{ marginBottom: 4 }}
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
