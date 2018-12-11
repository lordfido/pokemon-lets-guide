import * as React from 'react';
// @ts-ignore
import RadarChart from 'react-svg-radar-chart';

import {
  ATTACK_ID,
  DEFENSE_ID,
  HP_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
} from '../../constants/pokemon-stats';
import { getStatName } from '../../constants/pokemon-stats-name';

import { IPokemonStats } from '../modules/pokemon-list/pokemon-list.types';

const chartLegend = {
  [HP_ID]: getStatName(HP_ID),
  [ATTACK_ID]: getStatName(ATTACK_ID),
  [DEFENSE_ID]: getStatName(DEFENSE_ID),
  [SPEED_ID]: getStatName(SPEED_ID),
  [SPECIAL_DEFENSE_ID]: getStatName(SPECIAL_DEFENSE_ID),
  [SPECIAL_ATTACK_ID]: getStatName(SPECIAL_ATTACK_ID),
};

interface IOwnProps {
  stats: IPokemonStats;
  color: string;
  size?: number;
}

class StatsChart extends React.Component<IOwnProps> {
  public static displayName = 'StatsChart';

  public render() {
    const { stats, color, size } = this.props;
    const chartData = [{ data: stats, meta: { color } }];

    return <RadarChart captions={chartLegend} data={chartData} size={size} options={{ scales: 1, dots: true }} />;
  }
}

export default StatsChart;
