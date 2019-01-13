import * as React from 'react';
import { getUiTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import Buttons from '../../components/buttons';
import Field from '../forms/field';
import statsDropdown from './stats-dropdown';
import typesDropdown from './types-dropdown';

import { filtersEnabled } from '../../../constants/features';
import { ICheckboxOptions, IDropdownOptions, IFieldOutput, IOption, IRangeOptions } from '../forms/form.models';
import { IPokedexFilters } from './pokedex.models';

interface IOwnProps {
  classNames: {
    form: string;
    formField: string;
  };
  pokemonList: IOption[];
  handlePokemonChange: (field: IFieldOutput) => void;
  filters: IPokedexFilters;
  handleFilterChange: (field: IFieldOutput) => void;
  handleReset: () => void;
  handleSubmit: () => void;
}

const PokedexFilters = ({
  classNames,
  pokemonList,
  handlePokemonChange,
  filters,
  handleFilterChange,
  handleReset,
  handleSubmit,
}: IOwnProps) => {
  const fields = [
    {
      id: 'nameOrNumber',
      label: getUiTranslation('search-pokemon'),
      onChange: (option: IFieldOutput) => {
        handlePokemonChange(option);
      },
      options: pokemonList,
      placeholder: getUiTranslation('search-pokemon'),
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
      defaultValue: [filters.baseCP[0], filters.baseCP[1]],
      id: 'baseCP',
      label: getUiTranslation('search-base-cp'),
      onChange: handleFilterChange,
      range: [0, 800],
      type: 'range',
    } as IRangeOptions,
    {
      defaultChecked: filters.showMegaevolutions,
      id: 'showMegaevolutions',
      label: getUiTranslation('search-show-megaevolutions'),
      onChange: handleFilterChange,
      type: 'switch',
    } as ICheckboxOptions,
    {
      defaultChecked: filters.showAlolanForms,
      id: 'showAlolanForms',
      label: getUiTranslation('search-show-alolan-forms'),
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

export default PokedexFilters;
