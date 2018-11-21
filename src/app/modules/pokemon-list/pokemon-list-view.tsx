import * as React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '../../utils/strings';

import Tag from '../../components/tag';
import Card from '../../components/card';

import { getTypeColor } from '../../../constants/pokemon-types-color';

import { Pokemon } from './pokemon-list.types';
import { POKEMON } from '../../../constants/appRoutes';
import { getTypeIcon } from '../../../constants/pokemon-types';
import PokemonDetailsView from '../pokemon-details/pokemon-details-view';

interface PokemonListItemProps {
  pokemon: Pokemon;
}

const PokemonListItem = ({ pokemon }: PokemonListItemProps) => (
  <Link
    to={{
      pathname: `${POKEMON.replace(':id', String(pokemon.id))}`,
    }}
  >
    <Card title={pokemon.name} image={pokemon.avatar} className="PokemonList-item">
      <div className="PokemonList-types TagsWrapper">
        {pokemon.types.map(type => (
          <Tag
            key={type}
            label={capitalize(type)}
            icon={pokemon.types.length === 1 ? getTypeIcon(type) : undefined}
            backgroundColor={getTypeColor(type)}
          />
        ))}
      </div>
    </Card>
  </Link>
);

type OwnProps = {
  collection: Array<Pokemon>;
};

class PokemonListView extends React.Component<OwnProps> {
  static displayName = 'PokemonListView';

  render() {
    const { collection } = this.props;

    return (
      <div className="PokemonList CardsWrapper">
        {collection.map(pokemon => (
          <PokemonListItem key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}

export default PokemonListView;
