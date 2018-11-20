import * as React from 'react';
// @ts-ignore
import RadarChart from 'react-svg-radar-chart';
import { capitalize } from '../../utils/strings';

import Tag from '../../components/tag';
import Card from '../../components/card';

import { getTypeColor } from '../../../constants/pokemon-types-color';

import { Pokemon } from './pokemon-list.types';

const chartLegend = {
  // columns
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  speed: 'Speed',
  spDefense: 'Sp Defense',
  spAttack: 'Sp Attack',
};

interface PokemonListItemProps {
  pokemon: Pokemon;
}

const PokemonListItem = ({ pokemon }: PokemonListItemProps) => {
  const chartData = [
    {
      data: pokemon.stats,
      meta: {
        color: getTypeColor(pokemon.types[0]),
      },
    },
  ];

  return (
    <Card title={`#${pokemon.id} ${pokemon.name}`} image={pokemon.avatar}>
      <p>
        {pokemon.types.map(type => (
          <Tag
            key={type}
            options={{
              id: type,
              label: capitalize(type),
            }}
            backgroundColor={getTypeColor(type)}
          />
        ))}
      </p>

      <RadarChart captions={chartLegend} data={chartData} size={260} />
    </Card>
  );
};

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
