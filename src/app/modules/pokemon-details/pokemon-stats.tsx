import * as React from 'react';

import StatsChart from '../../components/stats-chart';

import { getTypeColor } from '../../../constants/pokemon-types-color';

import { Pokemon } from '../pokemon-list/pokemon-list.types';

interface OwnProps {
  pokemon: Pokemon;
}

class PokemonStats extends React.Component<OwnProps> {
  static displayName = 'PokemonStats';

  render() {
    const { pokemon } = this.props;

    return (
      <div className="PokemonStats">
        <div className="PokemonStats-wrapper">
          <p className="PokemonStats-line PokemonStats-title">Base Stats</p>

          <div className="PokemonStats-chart">
            <StatsChart stats={pokemon.stats} color={getTypeColor(pokemon.types[0])} size={272} />
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonStats;
