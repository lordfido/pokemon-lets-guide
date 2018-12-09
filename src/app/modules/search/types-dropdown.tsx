import chroma from 'chroma-js';
import { sortBy } from '../../utils/arrays';
import { getTranslation } from '../../utils/translations';

import { getTypes, PokemonType } from '../../../constants/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon-types-color';
import { getTypeIcon } from '../../../constants/pokemon-types-icons';

interface DropdownReadableData {
  data: any;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

const typeFilterOptions = getTypes()
  .map(option => ({
    type: 'option',
    id: option.id,
    label: option.name,
    value: option.id,
    icon: getTypeIcon(option.id),
  }))
  .sort(sortBy('label', 'asc'));

const getTypeDropdownColors = (type: PokemonType) => {
  const color = chroma(getTypeColor(type));

  const colors = {
    backgroundColor: color.alpha(0.7).css(),
    activeBackgroundColor: color.alpha(1).css(),
    color: '#FFF',
  };

  return colors;
};

const typeColorStyles = {
  option: (styles: React.CSSProperties, { data, isDisabled, isFocused, isSelected }: DropdownReadableData) => {
    const colors = getTypeDropdownColors(data.value);

    return {
      ...styles,
      backgroundColor: isDisabled ? null : isSelected || isFocused ? colors.backgroundColor : null,
      color: isDisabled ? null : isSelected || isFocused ? colors.color : null,
    };
  },
  multiValue: (styles: React.CSSProperties, { data, isDisabled }: DropdownReadableData) => {
    const colors = getTypeDropdownColors(data.value);

    return {
      ...styles,
      backgroundColor: isDisabled ? null : colors.backgroundColor,
      color: isDisabled ? null : colors.color,
    };
  },
  multiValueLabel: (styles: React.CSSProperties, { data, isDisabled }: DropdownReadableData) => {
    const colors = getTypeDropdownColors(data.value);

    return {
      ...styles,
      color: isDisabled ? null : colors.color,
    };
  },
  multiValueRemove: (styles: React.CSSProperties, { data, isDisabled }: DropdownReadableData) => {
    const colors = getTypeDropdownColors(data.value);

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

const typesDropdown = {
  type: 'multi',
  form: 'search',
  placeholder: getTranslation('search-select-some-types'),
  options: typeFilterOptions,
  colourStyles: typeColorStyles,
};

export default typesDropdown;
