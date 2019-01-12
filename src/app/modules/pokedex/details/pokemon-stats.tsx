import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../../utils/translations';

import { IButtonProps } from '../../../components/button';
import Buttons from '../../../components/buttons';
import StatsChart, { BARS, CHART, ViewMode } from '../../../components/stats-chart';

import { MAX_INITIAL_STAT_VALUE } from '../../../../constants/pokemon-stats';
import { getTypeColor } from '../../../../constants/pokemon-types-color';
import { BORDER_RADIUS_BIG, BORDER_RADIUS_SMALL, PADDING_L, PADDING_XXL } from '../../../../constants/styles';
import { DESKTOP } from '../../../../constants/styles-media-queries';
import { commonStyles, MAX_WIDTH } from './pokemon.constants';

import { ISheet } from '../../../root.models';
import { IRichPokemon } from '../pokedex.models';

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

interface IOwnProps {
  availableViewModes: IButtonProps[];
  classes: { [key: string]: string };
  pokemon: IRichPokemon;
  viewMode: ViewMode;
}

const UnstyledPokemonStats = ({ availableViewModes, classes, pokemon, viewMode }: IOwnProps) => (
  <div className={classes.window}>
    <div className={classes.wrapper}>
      <p>{getTranslation('pokemon-details-base-stats')}</p>

      <div className={classnames({ [classes.bars]: viewMode === BARS, [classes.chart]: viewMode === CHART })}>
        {
          <StatsChart
            stats={pokemon.relativeStats}
            viewMode={viewMode}
            color={getTypeColor(pokemon.types.ownTypes[0])}
            max={MAX_INITIAL_STAT_VALUE}
          />
        }
      </div>

      <Buttons align="center" options={availableViewModes} />
    </div>
  </div>
);

const PokemonStats = injectSheet(sheet)(UnstyledPokemonStats);

export default PokemonStats;
