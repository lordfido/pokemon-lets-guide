import * as React from 'react';
import { getTranslation } from '../../../utils/translations';

import Buttons from '../../../components/buttons';
import Field from '../../forms/field';
import statsDropdown from './stats-dropdown';
import typesDropdown from './types-dropdown';

import { filtersEnabled } from '../../../../constants/features';
import { ICheckboxOptions, IDropdownOptions, IGenericField, ITextOptions } from '../../forms/form.models';
import { IPokedexFilters } from '../pokedex.models';

interface IOwnProps {
  filters: IPokedexFilters;
  handleUpdateFilter: (filter: string, selection: any) => void;
  handleResetFilters: () => void;
}

const PokedexFilters = ({ filters, handleResetFilters, handleUpdateFilter }: IOwnProps) => {
  const fields: Array<IGenericField & (ITextOptions | IDropdownOptions | ICheckboxOptions)> = [
    {
      defaultValue: filters.nameOrNumber,
      id: 'nameOrNumber',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-name-or-number'),
      onChange: (selection: any[]) => handleUpdateFilter('nameOrNumber', selection),
      type: 'text',
    },
    {
      ...typesDropdown,
      defaultValue: filters.includedTypes,
      id: 'includedTypes',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-include-types'),
      onChange: (selection: any[]) => handleUpdateFilter('includedTypes', selection),
    },
    {
      ...typesDropdown,
      defaultValue: filters.excludedTypes,
      id: 'excludedTypes',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-exclude-types'),
      onChange: (selection: any[]) => handleUpdateFilter('excludedTypes', selection),
    },
    {
      ...typesDropdown,
      defaultValue: filters.strongAgainst,
      id: 'strongAgainst',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-strong-against'),
      onChange: (selection: any[]) => handleUpdateFilter('strongAgainst', selection),
    },
    {
      ...typesDropdown,
      defaultValue: filters.weakAgainst,
      id: 'weakAgainst',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-weak-against'),
      onChange: (selection: any[]) => handleUpdateFilter('weakAgainst', selection),
    },
    {
      ...statsDropdown,
      defaultValue: filters.bestStats,
      id: 'bestStats',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-best-stats'),
      onChange: (selection: any[]) => handleUpdateFilter('bestStats', selection),
    },
    {
      ...statsDropdown,
      defaultValue: filters.worstStats,
      id: 'worstStats',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-worst-stats'),
      onChange: (selection: any[]) => handleUpdateFilter('worstStats', selection),
    },
    {
      defaultValue: filters.minBaseCP,
      id: 'minBaseCP',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-min-cp'),
      onChange: (selection: any[]) => handleUpdateFilter('minBaseCP', selection),
      type: 'number',
    },
    {
      defaultValue: filters.maxBaseCP,
      id: 'maxBaseCP',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-max-cp'),
      onChange: (selection: any[]) => handleUpdateFilter('maxBaseCP', selection),
      type: 'number',
    },
    {
      defaultChecked: filters.showMegaevolutions,
      id: 'showMegaevolutions',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-show-megaevolutions'),
      onChange: (selection: any[]) => handleUpdateFilter('showMegaevolutions', selection),
      type: 'switch',
    },
    {
      defaultChecked: filters.showAlolanForms,
      id: 'showAlolanForms',
      isDisabled: !filtersEnabled,
      label: getTranslation('search-show-alolan-forms'),
      onChange: (selection: any[]) => handleUpdateFilter('showAlolanForms', selection),
      type: 'switch',
    },
  ];

  return (
    <form noValidate>
      {fields.map(field => (
        <Field key={field.id} options={field} />
      ))}

      <Buttons
        options={[
          {
            id: 'reset',
            label: getTranslation('search-reset-filters'),
            onClick: () => {
              handleResetFilters();
            },
            type: 'button',
          },
        ]}
      />
    </form>
  );
};

export default PokedexFilters;
