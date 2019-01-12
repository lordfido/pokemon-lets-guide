import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import Buttons from '../../components/buttons';
import Field from '../forms/field';

import { MAX_CANDIES_VALUE } from '../../../constants/pokemon-candies';
import { MAX_IV_VALUE } from '../../../constants/pokemon-ivs';
import { INatureEffect } from '../../../constants/pokemon-natures-effects';
import { getStats, StatId } from '../../../constants/pokemon-stats';
import { getStatName } from '../../../constants/pokemon-stats-name';
import { BORDER_RADIUS_BIG, BORDER_RADIUS_SMALL, PADDING_XXL } from '../../../constants/styles';
import { DESKTOP } from '../../../constants/styles-media-queries';
import statsDropdown from '../pokedex/stats-dropdown';
import { commonStyles, MAX_WIDTH } from '../pokemon/pokemon.constants';

import { ISheet } from '../../root.models';
import { IDropdownOptions, IOption, ISliderOptions } from '../forms/form.models';
import { IPokemonStats } from '../pokedex/pokedex.models';
import Spacer from '../../components/spacer';

export const MAX_HAPPINESS_VALUE = 255;
export const MAX_LEVEL_VALUE = 100;

const sheet: ISheet = {
  window: {
    ...commonStyles.window,
    borderRadius: `${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px`,

    [DESKTOP]: {
      margin: 0,
      marginLeft: PADDING_XXL,
      marginTop: PADDING_XXL,
      width: MAX_WIDTH - PADDING_XXL,
    },
  },
  wrapper: {
    ...commonStyles.wrapper,
    borderRadius: `${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px`,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  level: number;
  handleLevelChange: (level: { id: string; value: string }) => void;
  natureEffects: INatureEffect;
  handleNatureChange: (nature: { id: string; value?: StatId }) => void;
  happiness: number;
  handleHappinessChange: (happiness: { id: string; value: string }) => void;
  handleResetAll: () => void;
  handleModifyAll: (isMax?: boolean) => void;
  ivs: IPokemonStats;
  handleIVsChange: (event: { stat: StatId; value: string }) => void;
  candies: IPokemonStats;
  handleCandiesChange: (event: { stat: StatId; value: string }) => void;
}

type Tab = 'generic' | 'ivs' | 'candies';
const genericTab: Tab = 'generic';
const ivsTab: Tab = 'ivs';
const candiesTab: Tab = 'candies';

interface IOwnState {
  activeTab: Tab;
}

class UnstyledCalculatorCustomizations extends React.Component<IOwnProps, IOwnState> {
  public state = {
    activeTab: genericTab,
  };

  public handleTabChange = (activeTab: Tab) => {
    this.setState({
      activeTab,
    });
  };

  public render() {
    const {
      classes,
      level,
      handleLevelChange,
      natureEffects,
      handleNatureChange,
      happiness,
      handleHappinessChange,
      handleResetAll,
      handleModifyAll,
      ivs,
      handleIVsChange,
      candies,
      handleCandiesChange,
    } = this.props;
    const { activeTab } = this.state;

    const buttonsCommonProps: IButtonProps = {
      id: '',
      type: 'button',
    };

    const availableTabs: IButtonProps[] = [
      {
        ...buttonsCommonProps,
        id: `tab-${genericTab}`,
        isActive: activeTab === genericTab,
        label: getTranslation(`calculator-${genericTab}`),
        onClick: () => {
          this.setState({
            activeTab: genericTab,
          });
        },
      },
      {
        ...buttonsCommonProps,
        id: `tab-${ivsTab}`,
        isActive: activeTab === ivsTab,
        label: getTranslation(`calculator-${ivsTab}`),
        onClick: () => {
          this.setState({
            activeTab: ivsTab,
          });
        },
      },
      {
        ...buttonsCommonProps,
        id: `tab-${candiesTab}`,
        isActive: activeTab === candiesTab,
        label: getTranslation(`calculator-${candiesTab}`),
        onClick: () => {
          this.setState({
            activeTab: candiesTab,
          });
        },
      },
    ];

    // Level
    const levelField: ISliderOptions = {
      defaultValue: level.toString(),
      id: 'level',
      label: getTranslation('calculator-level'),
      onChange: handleLevelChange,
      range: [1, MAX_LEVEL_VALUE],
      type: 'slider',
    };

    // Nature
    const handleNatureChangeProxy = (option: { id: string; value: IOption }) => {
      handleNatureChange({ id: option.id.replace('nature-', ''), value: option.value.value as StatId });
    };

    const natureCommonProps: IDropdownOptions = {
      ...statsDropdown,
      id: '',
      onChange: handleNatureChangeProxy,
      options: getStats(false).map(statId => ({
        id: statId,
        label: getStatName(statId),
        value: statId,
      })),
      type: 'dropdown',
    };

    const natureFields: IDropdownOptions[] = [
      {
        ...natureCommonProps,
        defaultValue: natureEffects.increases ? [natureEffects.increases] : undefined,
        id: 'nature-increases',
        label: getTranslation('calculator-nature-increase'),
      },
      {
        ...natureCommonProps,
        defaultValue: natureEffects.reduces ? [natureEffects.reduces] : undefined,
        id: 'nature-reduces',
        label: getTranslation('calculator-nature-reduce'),
      },
    ];

    // Happiness
    const happinessField: ISliderOptions = {
      defaultValue: happiness.toString(),
      id: 'happiness',
      label: getTranslation('calculator-happiness'),
      onChange: handleHappinessChange,
      range: [0, MAX_HAPPINESS_VALUE],
      type: 'slider',
    };

    // Quick actions
    const quickActions: IButtonProps[] = [
      {
        ...buttonsCommonProps,
        id: 'level-up',
        label: getTranslation('calculator-level-up'),
        onClick: () => {
          handleModifyAll(true);
        },
      },
      {
        ...buttonsCommonProps,
        id: 'level-down',
        label: getTranslation('calculator-level-down'),
        onClick: () => {
          handleModifyAll(false);
        },
      },
      {
        ...buttonsCommonProps,
        id: 'reset',
        label: getTranslation('calculator-reset'),
        onClick: handleResetAll,
      },
    ];

    // IVs
    const handleIVsChangeProxy = (option: IOption) => {
      handleIVsChange({ stat: option.id.replace('ivs-', '') as StatId, value: option.value });
    };

    const commonIVsProps: ISliderOptions = {
      id: '',
      onChange: handleIVsChangeProxy,
      range: [0, MAX_IV_VALUE],
      type: 'slider',
    };

    const ivsFields: ISliderOptions[] = getStats().map(statId => ({
      ...commonIVsProps,
      defaultValue: ivs[statId].toString(),
      id: `ivs-${statId}`,
      label: getStatName(statId),
    }));

    // Candies
    const handleCandiesChangeProxy = (option: IOption) => {
      handleCandiesChange({ stat: option.id.replace('candies-', '') as StatId, value: option.value });
    };

    const commonCandiesProps: ISliderOptions = {
      id: '',
      onChange: handleCandiesChangeProxy,
      range: [0, MAX_CANDIES_VALUE],
      type: 'slider',
    };

    const candiesFields: ISliderOptions[] = getStats().map(statId => ({
      ...commonCandiesProps,
      defaultValue: candies[statId].toString(),
      id: `candies-${statId}`,
      label: getTranslation(`calculator-candy-${statId}`),
    }));

    return (
      <div className={classes.window}>
        <div className={classes.wrapper}>
          <Buttons options={availableTabs} align="center" />
          <Spacer />

          {activeTab === genericTab && (
            <>
              <Field options={levelField} />

              <Field options={happinessField} />

              {natureFields.map(field => (
                <Field key={field.id} options={field} />
              ))}
            </>
          )}
          {activeTab === ivsTab && (
            <>
              {ivsFields.map(field => (
                <Field key={field.id} options={field} />
              ))}
            </>
          )}
          {activeTab === candiesTab && (
            <>
              {candiesFields.map(field => (
                <Field key={field.id} options={field} />
              ))}
            </>
          )}
          <Spacer />

          <Buttons options={quickActions} />
        </div>
      </div>
    );
  }
}

const CalculatorCustomizations = injectSheet(sheet)(UnstyledCalculatorCustomizations);

export default CalculatorCustomizations;
