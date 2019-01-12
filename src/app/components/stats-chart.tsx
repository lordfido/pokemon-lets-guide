import { Line } from 'rc-progress';
import * as React from 'react';
// @ts-ignore
import RadarChart from 'react-svg-radar-chart';
import { getCookie } from '../../common/utils/cookies';

import { POKEMON_VIEW_MODE } from '../../constants/cookies';
import {
  ATTACK_ID,
  DEFENSE_ID,
  HP_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
  StatId,
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
          {Object.keys(stats).map(statId => (
            <p key={statId}>
              {getStatName(statId as StatId)}: {Math.round(stats[statId] * max)}
              <Line percent={stats[statId] * 100} strokeColor={color} strokeWidth="4" trailWidth="4" />
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
