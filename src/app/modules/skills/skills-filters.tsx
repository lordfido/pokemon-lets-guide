import * as React from 'react';
import { getGameTranslation, getUiTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import Buttons from '../../components/buttons';
import Field from '../forms/field';
import typesDropdown from '../pokedex/types-dropdown';

import { filtersEnabled } from '../../../constants/features';
import {
  MAX_ACCURACY_VALUE,
  MAX_POWER_VALUE,
  MAX_PP_VALUE,
  MAX_PROBABILITY_VALUE,
  MIN_POWER_VALUE,
  MIN_PP_VALUE,
} from '../../../constants/skills/skills';
import { getCategories } from '../../../constants/skills/skills-categories';
import { getCategoryName } from '../../../constants/skills/skills-categories-names';

import { ICheckboxOptions, IDropdownOptions, IFieldOutput, IOption, IRangeOptions } from '../forms/form.models';
import { ISkillsFilters } from './skills.models';

interface IOwnProps {
  classNames: {
    form: string;
    formField: string;
  };
  skillList: IOption[];
  handleSkillChange: (field: IFieldOutput) => void;
  filters: ISkillsFilters;
  handleFilterChange: (field: IFieldOutput) => void;
  handleReset: () => void;
  handleSubmit: () => void;
}

const SkillsFilters = ({
  classNames,
  skillList,
  handleSkillChange,
  filters,
  handleFilterChange,
  handleReset,
  handleSubmit,
}: IOwnProps) => {
  const fields = [
    {
      id: 'nameOrId',
      label: getUiTranslation('search-skill'),
      onChange: (option: IFieldOutput) => {
        handleSkillChange(option);
      },
      options: skillList,
      placeholder: getUiTranslation('search-skill'),
      type: 'dropdown',
    } as IDropdownOptions,
    {
      defaultValue: filters.category,
      id: 'category',
      label: getGameTranslation('category'),
      onChange: handleFilterChange,
      options: getCategories().map(category => ({
        id: category,
        label: getCategoryName(category),
        value: category,
      })),
      placeholder: getGameTranslation('category'),
      type: 'dropdown',
    } as IDropdownOptions,
    {
      ...typesDropdown,
      defaultValue: filters.includedTypes,
      id: 'includedTypes',
      label: getUiTranslation('search-include-types'),
      onChange: handleFilterChange,
    } as IDropdownOptions,
    {
      ...typesDropdown,
      defaultValue: filters.excludedTypes,
      id: 'excludedTypes',
      label: getUiTranslation('search-exclude-types'),
      onChange: handleFilterChange,
    } as IDropdownOptions,
    {
      ...typesDropdown,
      defaultValue: filters.strongAgainst,
      id: 'strongAgainst',
      label: getUiTranslation('search-strong-against'),
      onChange: handleFilterChange,
    } as IDropdownOptions,
    {
      ...typesDropdown,
      defaultValue: filters.weakAgainst,
      id: 'weakAgainst',
      label: getUiTranslation('search-weak-against'),
      onChange: handleFilterChange,
    } as IDropdownOptions,
    {
      defaultValue: [filters.accuracy[0], filters.accuracy[1]],
      id: 'accuracy',
      label: getGameTranslation('accuracy'),
      onChange: handleFilterChange,
      range: [0, MAX_ACCURACY_VALUE],
      type: 'range',
    } as IRangeOptions,
    {
      defaultValue: [filters.power[0], filters.power[1]],
      id: 'power',
      label: getGameTranslation('power'),
      onChange: handleFilterChange,
      range: [MIN_POWER_VALUE, MAX_POWER_VALUE],
      type: 'range',
    } as IRangeOptions,
    {
      defaultValue: [filters.pp[0], filters.pp[1]],
      id: 'pp',
      label: getGameTranslation('pp'),
      onChange: handleFilterChange,
      range: [MIN_PP_VALUE, MAX_PP_VALUE],
      type: 'range',
    } as IRangeOptions,
    {
      defaultValue: [filters.probability[0], filters.probability[1]],
      id: 'probability',
      label: getGameTranslation('probability'),
      onChange: handleFilterChange,
      range: [0, MAX_PROBABILITY_VALUE],
      type: 'range',
    } as IRangeOptions,
    {
      defaultChecked: filters.tm,
      id: 'tm',
      label: getUiTranslation('search-show-tm'),
      onChange: handleFilterChange,
      type: 'switch',
    } as ICheckboxOptions,
  ];
  const buttons: IButtonProps[] = [
    {
      id: 'submit',
      label: getUiTranslation('search-filters-apply'),
      onClick: () => {
        handleSubmit();
      },
      type: 'button',
    },
    {
      id: 'reset',
      label: getUiTranslation('search-filters-reset'),
      onClick: () => {
        handleReset();
      },
      type: 'button',
    },
  ];

  return (
    <form className={classNames.form} noValidate>
      {fields.map(field => (
        <Field key={field.id} className={classNames.formField} options={{ ...field, isDisabled: !filtersEnabled }} />
      ))}

      <Buttons options={buttons} />
    </form>
  );
};

export default SkillsFilters;
