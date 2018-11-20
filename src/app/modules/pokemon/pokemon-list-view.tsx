import * as React from 'react';
// @ts-ignore
import RadarChart from 'react-svg-radar-chart';
import { getTypeColor } from '../../../constants/pokemon-types-color';

import { Pokemon } from './pokemon.types';

const chartLegend = {
  // columns
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  speed: 'Speed',
  spDefense: 'Special Defense',
  spAttack: 'Special Attack',
};

type OwnProps = {
  collection: Array<Pokemon>;
};

class PokemonListView extends React.Component<OwnProps> {
  static displayName = 'PokemonListView';

  render() {
    const { collection } = this.props;

    return (
      <div className="PokemonList">
        <ul className="CardsWrapper">
          {collection.map(pokemon => {
            const chartData = [
              {
                data: pokemon.stats,
                meta: {
                  color: getTypeColor(pokemon.types[0]),
                },
              },
            ];

            return (
              <li key={pokemon.id} className="Card">
                <p>
                  #{pokemon.id} {pokemon.name}
                </p>
                <RadarChart captions={chartLegend} data={chartData} size={260} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PokemonListView;
