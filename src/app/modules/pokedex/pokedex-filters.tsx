import * as React from 'react';
import { getUiTranslation, getGameTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import Buttons from '../../components/buttons';
import Field from '../forms/field';
import statsDropdown from './stats-dropdown';
import typesDropdown from './types-dropdown';

import { filtersEnabled } from '../../../constants/features';
import { IDropdownOptions, IFieldOutput, IOption, IRangeOptions, ITextOptions } from '../forms/form.models';
import { IPokedexFilters } from './pokedex.models';

interface IOwnProps {
  classNames: {
    form: string;
    formField: string;
  };
  pokemonList: IOption[];
  filters: IPokedexFilters;
  handleFilterChange: (field: IFieldOutput) => void;
  handleReset: () => void;
  handleSubmit: () => void;
}

const PokedexFilters = ({
  classNames,
  pokemonList,
  filters,
  handleFilterChange,
  handleReset,
  handleSubmit,
}: IOwnProps) => {
  const fields = [
    {
      id: 'nameOrNumber',
      label: getUiTranslation('search-pokemon'),
      onChange: handleFilterChange,
      options: pokemonList,
      placeholder: getUiTranslation('search-pokemon'),
      type: 'text',
    } as ITextOptions,
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
      ...statsDropdown,
      defaultValue: filters.bestStats,
      id: 'bestStats',
      label: getUiTranslation('search-best-stats'),
      onChange: handleFilterChange,
    } as IDropdownOptions,
    {
      ...statsDropdown,
      defaultValue: filters.worstStats,
      id: 'worstStats',
      label: getUiTranslation('search-worst-stats'),
      onChange: handleFilterChange,
    } as IDropdownOptions,
    {
      defaultValue: [Number(filters.baseCP[0]), Number(filters.baseCP[1])],
      id: 'baseCP',
      label: getUiTranslation('search-base-cp'),
      onChange: handleFilterChange,
      range: [0, 800],
      type: 'range',
    } as IRangeOptions,
    {
      defaultValue: [filters.showMegaevolutions],
      id: 'showMegaevolutions',
      label: getUiTranslation('search-show-megaevolutions'),
      onChange: handleFilterChange,
      options: [
        { id: 'show-all', value: 'show-all', label: getUiTranslation('search-show-all') },
        {
          id: 'hide',
          value: 'hide',
          label: getUiTranslation('search-hide', getGameTranslation('forms-megaevolutions')),
        },
        {
          id: 'show-only',
          value: 'show-only',
          label: getUiTranslation('search-show-only', getGameTranslation('forms-megaevolutions')),
        },
      ],
      type: 'dropdown',
    } as IDropdownOptions,
    {
      defaultValue: [filters.showAlolanForms],
      id: 'showAlolanForms',
      label: getUiTranslation('search-show-alolan-forms'),
      onChange: handleFilterChange,
      options: [
        { id: 'show-all', value: 'show-all', label: getUiTranslation('search-show-all') },
        { id: 'hide', value: 'hide', label: getUiTranslation('search-hide', getGameTranslation('forms-alolan-forms')) },
        {
          id: 'show-only',
          value: 'show-only',
          label: getUiTranslation('search-show-only', getGameTranslation('forms-alolan-forms')),
        },
      ],
      type: 'dropdown',
    } as IDropdownOptions,
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

export default PokedexFilters;
