import * as React from 'react';
import { Line } from 'rc-progress';

import StatsChart from '../../components/stats-chart';
import Buttons from '../../components/buttons';

import { StatId, getStatName } from '../../../constants/pokemon-stats';
import { getTypeColor } from '../../../constants/pokemon-types-color';

import { RichPokemon } from '../pokemon-list/pokemon-list.types';

type Bars = 'bars';
const BARS: Bars = 'bars';

type Chart = 'chart';
const CHART: Chart = 'chart';

type ViewMode = Bars | Chart;

interface OwnProps {
  pokemon: RichPokemon;
}

interface OwnState {
  viewMode: ViewMode;
}

class PokemonStats extends React.Component<OwnProps, OwnState> {
  static displayName = 'PokemonStats';

  constructor(props: OwnProps) {
    super(props);

    this.state = {
      viewMode: CHART,
    };
  }

  toggleViewMode(viewMode: ViewMode) {
    this.setState({
      viewMode,
    });
  }

  getStatsTabs() {
    return [
      {
        id: CHART,
        type: 'button',
        label: 'Chart',
        onClick: () => {
          this.toggleViewMode(CHART);
        },
      },
      {
        id: BARS,
        type: 'button',
        label: 'Bars',
        onClick: () => {
          this.toggleViewMode(BARS);
        },
      },
    ];
  }

  renderChart() {
    const { pokemon } = this.props;

    return <StatsChart stats={pokemon.relativeStats} color={getTypeColor(pokemon.types.ownTypes[0])} size={272} />;
  }

  renderBars() {
    const { pokemon } = this.props;

    // @ts-ignore
    return Object.keys(pokemon.relativeStats).map((statId: StatId) => {
      return (
        <p key={statId} className="PokemonStats-individual">
          {getStatName(statId)}: {pokemon.baseStats[statId]}
          <Line
            percent={pokemon.relativeStats[statId] * 100}
            strokeColor={getTypeColor(pokemon.types.ownTypes[0])}
            strokeWidth="4"
            trailWidth="4"
          />
        </p>
      );
    });
  }

  render() {
    const { viewMode } = this.state;

    return (
      <div className="PokemonStats">
        <div className="PokemonStats-wrapper">
          <p className="PokemonStats-line PokemonStats-title">Base Stats</p>

          {viewMode === CHART && <div className="PokemonStats-chart">{this.renderChart()}</div>}

          {viewMode === BARS && <div className="PokemonStats-bars">{this.renderBars()}</div>}

          <Buttons align="center" options={this.getStatsTabs()} />
        </div>
      </div>
    );
  }
}

export default PokemonStats;
