import * as React from 'react';
import { Line } from 'rc-progress';

import StatsChart from '../../components/stats-chart';

import { getTypeColor } from '../../../constants/pokemon-types-color';

import { Pokemon } from '../pokemon-list/pokemon-list.types';
import { StatId, INITIAL_MAX_STAT_VALUE, getStatName } from '../../../constants/pokemon-stats';
import { getStatAbsolute } from '../../utils/pokemon-stats';
import Tabs from '../../components/tabs';

type Bars = 'bars';
const BARS: Bars = 'bars';

type Chart = 'chart';
const CHART: Chart = 'chart';

type ViewMode = Bars | Chart;

interface OwnProps {
  pokemon: Pokemon;
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

  getStatAbsoluteValue(statId: StatId) {
    const {
      pokemon: { stats },
    } = this.props;

    const statGrossValue = getStatAbsolute(stats[statId], INITIAL_MAX_STAT_VALUE);
    const integerValue = parseInt(statGrossValue.toString(), 10);

    return integerValue;
  }

  toggleViewMode(viewMode: ViewMode) {
    this.setState({
      viewMode,
    });
  }

  render() {
    const { pokemon } = this.props;
    const { viewMode } = this.state;

    return (
      <div className="PokemonStats">
        <div className="PokemonStats-wrapper">
          <p className="PokemonStats-line PokemonStats-title">Base Stats</p>

          {viewMode === CHART && (
            <div className="PokemonStats-chart">
              <StatsChart stats={pokemon.stats} color={getTypeColor(pokemon.types[0])} size={272} />
            </div>
          )}

          {viewMode === BARS && (
            <div className="PokemonStats-stats">
              {// @ts-ignore
              Object.keys(pokemon.stats).map((statId: StatId) => {
                return (
                  <p className="PokemonStats-individual">
                    {getStatName(statId)}:{' '}
                    <Line
                      percent={pokemon.stats[statId] * 100}
                      strokeColor={getTypeColor(pokemon.types[0])}
                      strokeWidth="4"
                      trailWidth="4"
                    />
                    {/* this.getStatAbsoluteValue(statId) */}
                  </p>
                );
              })}
            </div>
          )}

          <Tabs
            options={[
              {
                id: CHART,
                label: 'Chart',
                onClick: () => {
                  this.toggleViewMode(CHART);
                },
              },
              {
                id: BARS,
                label: 'Bars',
                onClick: () => {
                  this.toggleViewMode(BARS);
                },
              },
            ]}
            activeTab={viewMode}
          />
        </div>
      </div>
    );
  }
}

export default PokemonStats;
