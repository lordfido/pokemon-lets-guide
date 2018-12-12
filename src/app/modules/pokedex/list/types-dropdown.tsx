import chroma from 'chroma-js';
import { sortBy } from '../../../utils/arrays';
import { getTranslation } from '../../../utils/translations';

import { getTypes, PokemonType } from '../../../../constants/pokemon-types';
import { getTypeColor } from '../../../../constants/pokemon-types-color';
import { getTypeIcon } from '../../../../constants/pokemon-types-icons';

interface IDropdownReadableData {
  data: any;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

const typeFilterOptions = getTypes()
  .map(option => ({
    icon: getTypeIcon(option.id),
    id: option.id,
    label: option.name,
    type: 'option',
    value: option.id,
  }))
  .sort(sortBy('label', 'asc'));

const getTypeDropdownColors = (type: PokemonType) => {
  const color = chroma(getTypeColor(type));

  const colors = {
    activeBackgroundColor: color.alpha(1).css(),
    backgroundColor: color.alpha(0.7).css(),
    color: '#FFF',
  };

  return colors;
};

const typeColorStyles = {
  multiValue: (styles: React.CSSProperties, { data, isDisabled }: IDropdownReadableData) => {
    const colors = getTypeDropdownColors(data.value);

    return {
      ...styles,
      backgroundColor: isDisabled ? null : colors.backgroundColor,
      color: isDisabled ? null : colors.color,
    };
  },
  multiValueLabel: (styles: React.CSSProperties, { data, isDisabled }: IDropdownReadableData) => {
    const colors = getTypeDropdownColors(data.value);

    return {
      ...styles,
      color: isDisabled ? null : colors.color,
    };
  },
  multiValueRemove: (styles: React.CSSProperties, { data, isDisabled }: IDropdownReadableData) => {
    const colors = getTypeDropdownColors(data.value);

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
    const colors = getTypeDropdownColors(data.value);

    return {
      ...styles,
      backgroundColor: isDisabled ? null : isSelected || isFocused ? colors.backgroundColor : null,
      color: isDisabled ? null : isSelected || isFocused ? colors.color : null,
    };
  },
};

const typesDropdown = {
  colourStyles: typeColorStyles,
  form: 'search',
  options: typeFilterOptions,
  placeholder: getTranslation('search-select-some-types'),
  type: 'multi',
};

export default typesDropdown;
