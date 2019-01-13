import * as React from 'react';
// @ts-ignore
import RadarChart from 'react-svg-radar-chart';

import {
  ATTACK_ID,
  DEFENSE_ID,
  getStats,
  HP_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
  StatId,
} from '../../constants/pokemon/pokemon-stats';
import { getStatName } from '../../constants/pokemon/pokemon-stats-name';

import { IPokemonStats } from '../modules/pokedex/pokedex.models';
import ProgressBar from './progress-bar';

const chartLegend = {
  [HP_ID]: getStatName(HP_ID),
  [ATTACK_ID]: getStatName(ATTACK_ID),
  [DEFENSE_ID]: getStatName(DEFENSE_ID),
  [SPEED_ID]: getStatName(SPEED_ID),
  [SPECIAL_DEFENSE_ID]: getStatName(SPECIAL_DEFENSE_ID),
  [SPECIAL_ATTACK_ID]: getStatName(SPECIAL_ATTACK_ID),
};

export type ViewMode = 'bars' | 'chart';

export const BARS: ViewMode = 'bars';
export const CHART: ViewMode = 'chart';

interface IOwnProps {
  stats: IPokemonStats;
  viewMode: ViewMode;
  color: string;
  size?: number;
  max?: number;
}

const StatsChart = ({ stats, viewMode, color, size = 272, max = 100 }: IOwnProps) => {
  switch (viewMode) {
    case 'bars':
      return (
        <>
          {getStats().map(statId => (
            <p key={statId}>
              {getStatName(statId as StatId)}: {Math.round(stats[statId] * max)}
              <ProgressBar percentage={stats[statId] * 100} color={color} />
            </p>
          ))}
        </>
      );

    case 'chart':
    default:
      return (
        <div style={{ textAlign: 'center' }}>
          <RadarChart
            captions={chartLegend}
            data={[{ data: stats, meta: { color } }]}
            size={size}
            options={{ scales: 1, dots: true }}
          />
        </div>
      );
  }
};

export default StatsChart;
