import * as React from 'react';
import { getPaddedId } from '../../../utils/pokemon';
import { getTranslation } from '../../../utils/translations';

import Spacer from '../../../components/spacer';
import Tag from '../../../components/tag';

import { getTypeName, PokemonType } from '../../../../constants/pokemon-types';
import { getTypeColor } from '../../../../constants/pokemon-types-color';
import { getTypeIcon } from '../../../../constants/pokemon-types-icons';
import { PADDING_S } from '../../../../constants/styles';

import { IRichPokemon } from '../pokedex.models';

interface IOwnProps {
  pokemon: IRichPokemon;
}

const PokemonInfo = ({ pokemon }: IOwnProps) => (
  <React.Fragment>
    <div className="PokemonInfo">
      <div className="PokemonInfo-wrapper">
        <p className="PokemonInfo-line PokemonInfo-number">
          {getTranslation('pokemon-details-pokedex-number')} {getPaddedId(String(pokemon.nationalNumber))}
        </p>
        <p className="PokemonInfo-line PokemonInfo-name">{pokemon.name}</p>
        <span className="PokemonInfo-line PokemonInfo-types">
          {pokemon.types.ownTypes.map((type: PokemonType) => (
            <Tag key={type} label={getTypeName(type)} icon={getTypeIcon(type)} backgroundColor={getTypeColor(type)} />
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
                label={`${getTypeName(id)} x${effectiveness}`}
                icon={getTypeIcon(id)}
                backgroundColor={getTypeColor(id)}
                style={{ marginBottom: PADDING_S }}
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
                label={`${getTypeName(id)} x${effectiveness}`}
                icon={getTypeIcon(id)}
                backgroundColor={getTypeColor(id)}
                style={{ marginBottom: PADDING_S }}
              />
            ))}
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default PokemonInfo;
