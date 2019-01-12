import { Line } from 'rc-progress';
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
  StatId,
  MAX_STAT_VALUE,
} from '../../constants/pokemon-stats';
import { getStatName } from '../../constants/pokemon-stats-name';

import { IPokemonStats } from '../modules/pokedex/pokedex.models';

const chartLegend = {
  [HP_ID]: getStatName(HP_ID),
  [ATTACK_ID]: getStatName(ATTACK_ID),
  [DEFENSE_ID]: getStatName(DEFENSE_ID),
  [SPEED_ID]: getStatName(SPEED_ID),
  [SPECIAL_DEFENSE_ID]: getStatName(SPECIAL_DEFENSE_ID),
  [SPECIAL_ATTACK_ID]: getStatName(SPECIAL_ATTACK_ID),
};

export type ViewMode = 'bars' | 'chart';

interface IOwnProps {
  stats: IPokemonStats;
  viewMode: ViewMode;
  color: string;
  size?: number;
}

const StatsChart = ({ stats, viewMode, color, size = 272 }: IOwnProps) => {
  switch (viewMode) {
    case 'bars':
      return (
        <>
          {Object.keys(stats).map(statId => (
            <p key={statId}>
              {getStatName(statId as StatId)}: {Math.round(stats[statId] * size)}
              <Line percent={stats[statId] * 100} strokeColor={color} strokeWidth="4" trailWidth="4" />
            </p>
          ))}
        </>
      );

    case 'chart':
      return (
        <RadarChart
          captions={chartLegend}
          data={[{ data: stats, meta: { color } }]}
          size={size}
          options={{ scales: 1, dots: true }}
        />
      );

    default:
      return null;
  }
};

export default StatsChart;
