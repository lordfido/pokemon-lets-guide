import chroma from 'chroma-js';
import { sortBy } from '../../utils/arrays';
import { getTranslation } from '../../utils/translations';

import {
  HP_ID,
  ATTACK_ID,
  DEFENSE_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
  StatId,
} from '../../../constants/pokemon-stats';
import { getStatName } from '../../../constants/pokemon-stats-name';
import { getStatColor } from '../../../constants/pokemon-stats-color';

interface DropdownReadableData {
  data: any;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

const statsFilterOptions = [HP_ID, ATTACK_ID, DEFENSE_ID, SPECIAL_ATTACK_ID, SPECIAL_DEFENSE_ID, SPEED_ID]
  .map(stat => ({
    type: 'option',
    id: stat,
    label: getStatName(stat),
    value: stat,
  }))
  .sort(sortBy('label', 'asc'));

const getStatDropdownColors = (stat: StatId) => {
  const color = chroma(getStatColor(stat));

  const colors = {
    backgroundColor: color.alpha(0.3).css(),
    activeBackgroundColor: color.alpha(0.5).css(),
    color: '#000',
  };

  return colors;
};

const statsColorStyles = {
  option: (styles: React.CSSProperties, { data, isDisabled, isFocused, isSelected }: DropdownReadableData) => {
    const colors = getStatDropdownColors(data.value);

    return {
      ...styles,
      backgroundColor: isDisabled ? null : isSelected || isFocused ? colors.backgroundColor : null,
      color: isDisabled ? null : isSelected || isFocused ? colors.color : null,
    };
  },
  multiValue: (styles: React.CSSProperties, { data, isDisabled }: DropdownReadableData) => {
    const colors = getStatDropdownColors(data.value);

    return {
      ...styles,
      backgroundColor: isDisabled ? null : colors.backgroundColor,
      color: isDisabled ? null : colors.color,
    };
  },
  multiValueLabel: (styles: React.CSSProperties, { data, isDisabled }: DropdownReadableData) => {
    const colors = getStatDropdownColors(data.value);

    return {
      ...styles,
      color: isDisabled ? null : colors.color,
    };
  },
  multiValueRemove: (styles: React.CSSProperties, { data, isDisabled }: DropdownReadableData) => {
    const colors = getStatDropdownColors(data.value);

    return {
      ...styles,
      backgroundColor: isDisabled ? null : 'transparent',
      color: isDisabled ? null : colors.color,
      ':hover': {
        backgroundColor: colors.activeBackgroundColor,
      },
    };
  },
};

const statsDropdown = {
  type: 'multi',
  form: 'search',
  placeholder: getTranslation('search-select-some-types'),
  options: statsFilterOptions,
  colourStyles: statsColorStyles,
};

export default statsDropdown;
