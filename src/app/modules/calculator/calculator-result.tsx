import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import Buttons from '../../components/buttons';
import Spacer from '../../components/spacer';
import StatsChart, { BARS, CHART, ViewMode } from '../../components/stats-chart';

import { PokemonNature } from '../../../constants/pokemon/pokemon-natures';
import { getNatureName } from '../../../constants/pokemon/pokemon-natures-name';
import { MAX_STAT_VALUE } from '../../../constants/pokemon/pokemon-stats';
import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';
import { BORDER_RADIUS_BIG, BORDER_RADIUS_SMALL, PADDING_L, PADDING_XXL } from '../../../constants/styles/styles';
import { POKEDEX_WINDOW_MAX_WIDTH, pokedexWindowStyles } from '../../../constants/styles/styles-common-rules';
import { DESKTOP } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';
import { IPokemonStats, IRichPokemon } from '../pokedex/pokedex.models';

const sheet: ISheet = {
  bars: {
    margin: `${PADDING_L}px auto`,
  },
  chart: {
    margin: '0 auto',
    overflow: 'hidden',
  },
  window: {
    ...pokedexWindowStyles.window,
    borderRadius: `${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px `,

    [DESKTOP]: {
      margin: 0,
      marginRight: PADDING_XXL,
      marginTop: PADDING_XXL,
      width: POKEDEX_WINDOW_MAX_WIDTH - PADDING_XXL,
    },
  },
  wrapper: {
    ...pokedexWindowStyles.wrapper,
    borderRadius: `${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px `,
    textAlign: 'center',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  availableViewModes: IButtonProps[];
  viewMode: ViewMode;
  nature?: PokemonNature;
  pokemon: IRichPokemon;
  stats?: IPokemonStats;
}

const unstyledCalculatorResult = ({ classes, availableViewModes, viewMode, nature, pokemon, stats }: IOwnProps) =>
  stats ? (
    <div className={classes.window}>
      <div className={classes.wrapper}>
        <Buttons align="center" options={availableViewModes.slice(0, 2)} />
        <Spacer />

        <p>{getTranslation('calculator-final-stats')}</p>

        <div className={classnames({ [classes.bars]: viewMode === BARS, [classes.chart]: viewMode === CHART })}>
          {
            <StatsChart
              stats={stats}
              viewMode={viewMode}
              color={getTypeColor(pokemon.types.ownTypes[0])}
              max={MAX_STAT_VALUE}
            />
          }
        </div>

        <h4>{getTranslation('calculator-nature')}</h4>
        <p>{getNatureName(nature)}</p>
        <Spacer />

        <Buttons align="center" options={availableViewModes.slice(2)} />
      </div>
    </div>
  ) : null;

const CalculatorResult = injectSheet(sheet)(unstyledCalculatorResult);

export default CalculatorResult;
