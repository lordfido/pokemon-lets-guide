import * as React from 'react';
import { getTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import Buttons from '../../components/buttons';
import Field from '../forms/field';
import statsDropdown from './stats-dropdown';
import typesDropdown from './types-dropdown';

import { filtersEnabled } from '../../../constants/features';
import { ICheckboxOptions, IDropdownOptions, IGenericField, IOption, ITextOptions } from '../forms/form.models';
import { IPokedexFilters } from './pokedex.models';

interface IOwnProps {
  classNames: {
    form: string;
    formField: string;
  };
  pokemonList: IOption[];
  handlePokemonChange: (pokemon: { id: string; value: string }) => void;
  filters: IPokedexFilters;
  handleFilterChange: (option: { id: string; value: string }) => void;
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
  const fields: Array<IGenericField & (ITextOptions | IDropdownOptions | ICheckboxOptions)> = [
    {
      id: 'nameOrNumber',
      label: getTranslation('search-pokemon'),
      onChange: (option: { id: string; value: IOption }) => {
        handlePokemonChange({ id: option.id, value: option.value.value });
      },
      options: pokemonList,
      placeholder: getTranslation('search-pokemon'),
      type: 'dropdown',
    },
    {
      ...typesDropdown,
      defaultValue: filters.includedTypes,
      id: 'includedTypes',
      label: getTranslation('search-include-types'),
      onChange: handleFilterChange,
    },
    {
      ...typesDropdown,
      defaultValue: filters.excludedTypes,
      id: 'excludedTypes',
      label: getTranslation('search-exclude-types'),
      onChange: handleFilterChange,
    },
    {
      ...typesDropdown,
      defaultValue: filters.strongAgainst,
      id: 'strongAgainst',
      label: getTranslation('search-strong-against'),
      onChange: handleFilterChange,
    },
    {
      ...typesDropdown,
      defaultValue: filters.weakAgainst,
      id: 'weakAgainst',
      label: getTranslation('search-weak-against'),
      onChange: handleFilterChange,
    },
    {
      ...statsDropdown,
      defaultValue: filters.bestStats,
      id: 'bestStats',
      label: getTranslation('search-best-stats'),
      onChange: handleFilterChange,
    },
    {
      ...statsDropdown,
      defaultValue: filters.worstStats,
      id: 'worstStats',
      label: getTranslation('search-worst-stats'),
      onChange: handleFilterChange,
    },
    {
      defaultValue: filters.minBaseCP,
      id: 'minBaseCP',
      label: getTranslation('search-min-cp'),
      onChange: handleFilterChange,
      type: 'number',
    },
    {
      defaultValue: filters.maxBaseCP,
      id: 'maxBaseCP',
      label: getTranslation('search-max-cp'),
      onChange: handleFilterChange,
      type: 'number',
    },
    {
      defaultChecked: filters.showMegaevolutions,
      id: 'showMegaevolutions',
      label: getTranslation('search-show-megaevolutions'),
      onChange: handleFilterChange,
      type: 'switch',
    },
    {
      defaultChecked: filters.showAlolanForms,
      id: 'showAlolanForms',
      label: getTranslation('search-show-alolan-forms'),
      onChange: handleFilterChange,
      type: 'switch',
    },
  ];
  const buttons: IButtonProps[] = [
    {
      id: 'submit',
      label: getTranslation('search-filters-apply'),
      onClick: () => {
        handleSubmit();
      },
      type: 'button',
    },
    {
      id: 'reset',
      label: getTranslation('search-filters-reset'),
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
