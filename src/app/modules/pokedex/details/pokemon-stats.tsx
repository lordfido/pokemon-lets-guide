import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import analyticsApi from '../../../../common/apis/analytics';
import { getCookie, setCookie } from '../../../../common/utils/cookies';
import { getTranslation } from '../../../utils/translations';

import { IButtonProps } from '../../../components/button';
import Buttons from '../../../components/buttons';
import StatsChart, { ViewMode } from '../../../components/stats-chart';

import { STATS_VIEW_MODE } from '../../../../constants/cookies';
import { VIEW_MODE } from '../../../../constants/metrics/actions';
import { USER_PREFERENCES } from '../../../../constants/metrics/categories';
import { getTypeColor } from '../../../../constants/pokemon-types-color';
import { BORDER_RADIUS_BIG, BORDER_RADIUS_SMALL, PADDING_L, PADDING_XXL } from '../../../../constants/styles';
import { DESKTOP } from '../../../../constants/styles-media-queries';
import { commonStyles, MAX_WIDTH } from './pokemon.constants';

import { ISheet } from '../../../root.models';
import { IRichPokemon } from '../pokedex.models';
import { MAX_INITIAL_STAT_VALUE } from '../../../../constants/pokemon-stats';

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

const BARS: ViewMode = 'bars';
const CHART: ViewMode = 'chart';

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

    analyticsApi.logEvent({
      action: VIEW_MODE,
      category: USER_PREFERENCES,
      label: viewMode,
    });

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

  public render() {
    const { classes, pokemon } = this.props;
    const { viewMode } = this.state;

    return (
      <div className={classes.window}>
        <div className={classes.wrapper}>
          <p>{getTranslation('pokemon-details-base-stats')}</p>

          <div className={classnames({ [classes.bars]: viewMode === BARS, [classes.chart]: viewMode === CHART })}>
            {
              <StatsChart
                stats={pokemon.relativeStats}
                viewMode={viewMode}
                color={getTypeColor(pokemon.types.ownTypes[0])}
                size={viewMode === 'bars' ? MAX_INITIAL_STAT_VALUE : undefined}
              />
            }
          </div>

          <Buttons align="center" options={this.getStatsTabs()} />
        </div>
      </div>
    );
  }
}

const PokemonStats = injectSheet(sheet)(UnstyledPokemonStats);

export default PokemonStats;
