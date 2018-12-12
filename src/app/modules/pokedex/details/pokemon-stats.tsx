import { Line } from 'rc-progress';
import * as React from 'react';

import Buttons from '../../../components/buttons';
import StatsChart from '../../../components/stats-chart';

import { StatId } from '../../../../constants/pokemon-stats';
import { getStatName } from '../../../../constants/pokemon-stats-name';
import { getTypeColor } from '../../../../constants/pokemon-types-color';
import { getTranslation } from '../../../utils/translations';

import { IRichPokemon } from '../pokedex.models';

type Bars = 'bars';
const BARS: Bars = 'bars';

type Chart = 'chart';
const CHART: Chart = 'chart';

type ViewMode = Bars | Chart;

interface IOwnProps {
  pokemon: IRichPokemon;
}

interface IOwnState {
  viewMode: ViewMode;
}

class PokemonStats extends React.Component<IOwnProps, IOwnState> {
  public static displayName = 'PokemonStats';

  constructor(props: IOwnProps) {
    super(props);

    this.state = {
      viewMode: CHART,
    };
  }

  public toggleViewMode(viewMode: ViewMode) {
    this.setState({
      viewMode,
    });
  }

  public getStatsTabs() {
    const { viewMode } = this.state;

    return [
      {
        className: viewMode === CHART ? 'is-active' : '',
        id: CHART,
        label: getTranslation('pokemon-details-chart'),
        onClick: () => {
          this.toggleViewMode(CHART);
        },
        type: 'button',
      },
      {
        className: viewMode === BARS ? 'is-active' : '',
        id: BARS,
        label: getTranslation('pokemon-details-bars'),
        onClick: () => {
          this.toggleViewMode(BARS);
        },
        type: 'button',
      },
    ];
  }

  public renderChart() {
    const { pokemon } = this.props;

    return <StatsChart stats={pokemon.relativeStats} color={getTypeColor(pokemon.types.ownTypes[0])} size={272} />;
  }

  public renderBars() {
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

  public render() {
    const { viewMode } = this.state;

    return (
      <div className="PokemonStats">
        <div className="PokemonStats-wrapper">
          <p className="PokemonStats-line PokemonStats-title">{getTranslation('pokemon-details-base-stats')}</p>

          {viewMode === CHART && <div className="PokemonStats-chart">{this.renderChart()}</div>}

          {viewMode === BARS && <div className="PokemonStats-bars">{this.renderBars()}</div>}

          <Buttons align="center" options={this.getStatsTabs()} />
        </div>
      </div>
    );
  }
}

export default PokemonStats;
