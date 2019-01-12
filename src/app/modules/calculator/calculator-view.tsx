import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../utils/translations';

import Sidebar, { SIDEBAR_SIZE } from '../../components/sidebar';
import StatsChart from '../../components/stats-chart';
import Field from '../forms/field';
import PokemonPreview from '../pokedex/details/pokemon-preview';

import { MAX_CANDIES_VALUE } from '../../../constants/pokemon-candies';
import { MAX_IV_VALUE } from '../../../constants/pokemon-ivs';
import {
  ATTACK_ID,
  DEFENSE_ID,
  HP_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
  StatId,
  MAX_STAT_VALUE,
} from '../../../constants/pokemon-stats';
import { getTypeColor } from '../../../constants/pokemon-types-color';
import { PADDING_XXL } from '../../../constants/styles';
import { DESKTOP, DESKTOP_L } from '../../../constants/styles-media-queries';
import { commonStyles, MAX_WIDTH } from '../pokedex/details/pokemon.constants';

import { ISheet } from '../../root.models';
import { IOption, ISliderOptions } from '../forms/form.models';
import { IPokemonStats, IPokemonWithBaseCP, IRichPokemon } from '../pokedex/pokedex.models';
import { getStatName } from '../../../constants/pokemon-stats-name';

const sheet: ISheet = {
  customization: {
    ...commonStyles.window,
    backgroundColor: 'initial',
    border: 'none',

    [DESKTOP]: {
      margin: 0,
      marginLeft: PADDING_XXL,
      marginTop: PADDING_XXL,
      width: MAX_WIDTH - PADDING_XXL,
    },
  },
  result: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '100%',

    [DESKTOP_L]: {
      width: `calc(100% - ${SIDEBAR_SIZE}px)`,
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  pokemonList: IPokemonWithBaseCP[];
  handlePokemonSelect: (event: any) => void;
  pokemon?: IRichPokemon;
  level: string;
  handleLevelChange: (level: { id: string; value: string }) => void;
  candies: IPokemonStats;
  handleCandiesChange: (event: { stat: StatId; value: string }) => void;
  ivs: IPokemonStats;
  handleIVsChange: (event: { stat: StatId; value: string }) => void;
  stats?: IPokemonStats;
}

const unstyledCalculatorView = ({
  classes,
  pokemonList,
  pokemon,
  level,
  handleLevelChange,
  handlePokemonSelect,
  candies,
  handleCandiesChange,
  ivs,
  handleIVsChange,
  stats,
}: IOwnProps) => {
  const levelField: ISliderOptions = {
    defaultValue: level,
    id: 'level',
    label: getTranslation('calculator-level'),
    onChange: handleLevelChange,
    range: [1, 100],
    type: 'slider',
  };

  const handleCandiesChangeProxy = (option: IOption) => {
    handleCandiesChange({ stat: option.id.replace('candies-', '') as StatId, value: option.value });
  };

  const commonCandiesProps: ISliderOptions = {
    id: '',
    onChange: handleCandiesChangeProxy,
    range: [0, MAX_CANDIES_VALUE],
    type: 'slider',
  };

  const candiesFields: ISliderOptions[] = [
    {
      ...commonCandiesProps,
      defaultValue: candies.hp.toString(),
      id: `candies-${HP_ID}`,
      label: getTranslation('calculator-candy-hp'),
    },
    {
      ...commonCandiesProps,
      defaultValue: candies.attack.toString(),
      id: `candies-${ATTACK_ID}`,
      label: getTranslation('calculator-candy-attack'),
    },
    {
      ...commonCandiesProps,
      defaultValue: candies.defense.toString(),
      id: `candies-${DEFENSE_ID}`,
      label: getTranslation('calculator-candy-defense'),
    },
    {
      ...commonCandiesProps,
      defaultValue: candies.speed.toString(),
      id: `candies-${SPEED_ID}`,
      label: getTranslation('calculator-candy-speed'),
    },
    {
      ...commonCandiesProps,
      defaultValue: candies.spDefense.toString(),
      id: `candies-${SPECIAL_DEFENSE_ID}`,
      label: getTranslation('calculator-candy-spDefense'),
    },
    {
      ...commonCandiesProps,
      defaultValue: candies.spAttack.toString(),
      id: `candies-${SPECIAL_ATTACK_ID}`,
      label: getTranslation('calculator-candy-spAttack'),
    },
  ];

  const handleIVsChangeProxy = (option: IOption) => {
    handleIVsChange({ stat: option.id.replace('ivs-', '') as StatId, value: option.value });
  };

  const commonIVsProps: ISliderOptions = {
    id: '',
    onChange: handleIVsChangeProxy,
    range: [0, MAX_IV_VALUE],
    type: 'slider',
  };

  const ivsFields: ISliderOptions[] = [
    {
      ...commonIVsProps,
      defaultValue: ivs.hp.toString(),
      id: `ivs-${HP_ID}`,
      label: getStatName(HP_ID),
    },
    {
      ...commonIVsProps,
      defaultValue: ivs.attack.toString(),
      id: `ivs-${ATTACK_ID}`,
      label: getStatName(ATTACK_ID),
    },
    {
      ...commonIVsProps,
      defaultValue: ivs.defense.toString(),
      id: `ivs-${DEFENSE_ID}`,
      label: getStatName(DEFENSE_ID),
    },
    {
      ...commonIVsProps,
      defaultValue: ivs.speed.toString(),
      id: `ivs-${SPEED_ID}`,
      label: getStatName(SPEED_ID),
    },
    {
      ...commonIVsProps,
      defaultValue: ivs.spDefense.toString(),
      id: `ivs-${SPECIAL_DEFENSE_ID}`,
      label: getStatName(SPECIAL_DEFENSE_ID),
    },
    {
      ...commonIVsProps,
      defaultValue: ivs.spAttack.toString(),
      id: `ivs-${SPECIAL_ATTACK_ID}`,
      label: getStatName(SPECIAL_ATTACK_ID),
    },
  ];

  return (
    <>
      <Sidebar
        render={() => (
          <form noValidate>
            <Field
              options={{
                defaultValue: pokemon ? pokemon.id : undefined,
                id: 'pokemon',
                label: getTranslation('calculator-select-pokemon'),
                onChange: handlePokemonSelect,
                options: pokemonList.map(({ id, name }) => ({ id, label: name, value: id })),
                placeholder: 'Pikachu',
                type: 'dropdown',
              }}
            />
          </form>
        )}
      />

      <div className={classes.result}>
        {pokemon && stats && (
          <>
            <div className={classes.customization}>
              <Field options={levelField} />

              <h4>{getTranslation('calculator-candies')}</h4>
              {candiesFields.map(field => (
                <Field key={field.id} options={field} />
              ))}

              <h4>{getTranslation('calculator-ivs')}</h4>
              {ivsFields.map(field => (
                <Field key={field.id} options={field} />
              ))}
            </div>

            <PokemonPreview src={pokemon.avatar} />

            <div className={classes.customization}>
              <h4>{getTranslation('calculator-final-stats')}</h4>
              <StatsChart
                stats={stats}
                viewMode="bars"
                color={getTypeColor(pokemon.types.ownTypes[0])}
                size={MAX_STAT_VALUE}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

const CalculatorView = injectSheet(sheet)(unstyledCalculatorView);

export default CalculatorView;
