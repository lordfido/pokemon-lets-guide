import { Line } from 'rc-progress';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../../utils/translations';

import { IButtonProps } from '../../../components/button';
import Buttons from '../../../components/buttons';
import StatsChart from '../../../components/stats-chart';

import { StatId } from '../../../../constants/pokemon-stats';
import { getStatName } from '../../../../constants/pokemon-stats-name';
import { getTypeColor } from '../../../../constants/pokemon-types-color';
import { BORDER_RADIUS_BIG, BORDER_RADIUS_SMALL, PADDING_L, PADDING_XXL } from '../../../../constants/styles';
import { DESKTOP } from '../../../../constants/styles-media-queries';
import { commonStyles, MAX_WIDTH } from './pokemon.constants';

import { ISheet } from '../../../root.models';
import { IRichPokemon } from '../pokedex.models';
import { getCookie, setCookie } from '../../../../common/utils/cookies';
import { STATS_VIEW_MODE } from '../../../../constants/cookies';

const sheet: ISheet = {
  bars: {
    margin: `${PADDING_L}px auto`,
  },
  chart: {
    margin: '0 auto',
    overflow: 'hidden',
  },
  window: {
    ...commonStyles.window,
    borderRadius: `${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px `,

    [DESKTOP]: {
      margin: 0,
      marginRight: PADDING_XXL,
      marginTop: PADDING_XXL,
      width: MAX_WIDTH - PADDING_XXL,
    },
  },
  wrapper: {
    ...commonStyles.wrapper,
    borderRadius: `${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px `,
    textAlign: 'center',
  },
};

type Bars = 'bars';
const BARS: Bars = 'bars';

type Chart = 'chart';
const CHART: Chart = 'chart';

type ViewMode = Bars | Chart;

interface IOwnProps {
  classes: { [key: string]: string };
  pokemon: IRichPokemon;
}

interface IOwnState {
  viewMode: ViewMode;
}

class UnstyledPokemonStats extends React.Component<IOwnProps, IOwnState> {
  constructor(props: IOwnProps) {
    super(props);

    const viewMode = (getCookie(STATS_VIEW_MODE) as ViewMode) || CHART;
    this.state = {
      viewMode,
    };
  }

  public toggleViewMode(viewMode: ViewMode) {
    setCookie(STATS_VIEW_MODE, viewMode);
    this.setState({
      viewMode,
    });
  }

  public getStatsTabs(): IButtonProps[] {
    const { viewMode } = this.state;

    return [
      {
        id: CHART,
        isActive: viewMode === CHART,
        label: getTranslation('pokemon-details-chart'),
        onClick: () => {
          this.toggleViewMode(CHART);
        },
        type: 'button',
      },
      {
        id: BARS,
        isActive: viewMode === BARS,
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
        <p key={statId}>
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
    const { classes } = this.props;
    const { viewMode } = this.state;

    return (
      <div className={classes.window}>
        <div className={classes.wrapper}>
          <p>{getTranslation('pokemon-details-base-stats')}</p>

          {viewMode === CHART && <div className={classes.chart}>{this.renderChart()}</div>}

          {viewMode === BARS && <div className={classes.bars}>{this.renderBars()}</div>}

          <Buttons align="center" options={this.getStatsTabs()} />
        </div>
      </div>
    );
  }
}

const PokemonStats = injectSheet(sheet)(UnstyledPokemonStats);

export default PokemonStats;
