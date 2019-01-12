import chroma from 'chroma-js';
import { sortBy } from '../../utils/arrays';
import { getTranslation } from '../../utils/translations';

import { getStats, StatId } from '../../../constants/pokemon-stats';
import { getStatColor } from '../../../constants/pokemon-stats-color';
import { getStatName } from '../../../constants/pokemon-stats-name';
import { TEXT_BLACK } from '../../../constants/styles-fonts';
import { IDropdownOptions } from '../forms/form.models';

interface IDropdownReadableData {
  data: any;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

const statsFilterOptions = getStats()
  .map(stat => ({
    id: stat,
    label: getStatName(stat),
    value: stat,
  }))
  .sort(sortBy('label', 'asc'));

const getStatDropdownColors = (stat: StatId) => {
  const color = chroma(getStatColor(stat));

  const colors = {
    activeBackgroundColor: color.alpha(0.5).css(),
    backgroundColor: color.alpha(0.3).css(),
    color: TEXT_BLACK,
  };

  return colors;
};

const statsColorStyles = {
  multiValue: (styles: React.CSSProperties, { data, isDisabled }: IDropdownReadableData) => {
    const colors = getStatDropdownColors(data.value);

    return {
      ...styles,
      backgroundColor: isDisabled ? null : colors.backgroundColor,
      color: isDisabled ? null : colors.color,
    };
  },
  multiValueLabel: (styles: React.CSSProperties, { data, isDisabled }: IDropdownReadableData) => {
    const colors = getStatDropdownColors(data.value);

    return {
      ...styles,
      color: isDisabled ? null : colors.color,
    };
  },
  multiValueRemove: (styles: React.CSSProperties, { data, isDisabled }: IDropdownReadableData) => {
    const colors = getStatDropdownColors(data.value);

    return {
      ...styles,
      ':hover': {
        backgroundColor: colors.activeBackgroundColor,
      },
      backgroundColor: isDisabled ? null : 'transparent',
      color: isDisabled ? null : colors.color,
    };
  },
  option: (styles: React.CSSProperties, { data, isDisabled, isFocused, isSelected }: IDropdownReadableData) => {
    const colors = getStatDropdownColors(data.value);

    return {
      ...styles,
      backgroundColor: isDisabled ? null : isSelected || isFocused ? colors.backgroundColor : null,
      color: isDisabled ? null : isSelected || isFocused ? colors.color : null,
    };
  },
};

const statsDropdown: IDropdownOptions = {
  colourStyles: statsColorStyles,
  id: '',
  options: statsFilterOptions,
  placeholder: getTranslation('search-select-some-types'),
  type: 'multi',
};

export default statsDropdown;
