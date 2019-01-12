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
  classNames: {
    form: string;
    formField: string;
  };
  filters: IPokedexFilters;
  handleUpdateFilter: (option: { id: string; value: string }) => void;
  handleResetFilters: () => void;
}

const PokedexFilters = ({ classNames, filters, handleResetFilters, handleUpdateFilter }: IOwnProps) => {
  const fields: Array<IGenericField & (ITextOptions | IDropdownOptions | ICheckboxOptions)> = [
    {
      defaultValue: filters.nameOrNumber,
      id: 'nameOrNumber',
      label: getTranslation('search-name-or-number'),
      onChange: handleUpdateFilter,
      type: 'text',
    },
    {
      ...typesDropdown,
      defaultValue: filters.includedTypes,
      id: 'includedTypes',
      label: getTranslation('search-include-types'),
      onChange: handleUpdateFilter,
    },
    {
      ...typesDropdown,
      defaultValue: filters.excludedTypes,
      id: 'excludedTypes',
      label: getTranslation('search-exclude-types'),
      onChange: handleUpdateFilter,
    },
    {
      ...typesDropdown,
      defaultValue: filters.strongAgainst,
      id: 'strongAgainst',
      label: getTranslation('search-strong-against'),
      onChange: handleUpdateFilter,
    },
    {
      ...typesDropdown,
      defaultValue: filters.weakAgainst,
      id: 'weakAgainst',
      label: getTranslation('search-weak-against'),
      onChange: handleUpdateFilter,
    },
    {
      ...statsDropdown,
      defaultValue: filters.bestStats,
      id: 'bestStats',
      label: getTranslation('search-best-stats'),
      onChange: handleUpdateFilter,
    },
    {
      ...statsDropdown,
      defaultValue: filters.worstStats,
      id: 'worstStats',
      label: getTranslation('search-worst-stats'),
      onChange: handleUpdateFilter,
    },
    {
      defaultValue: filters.minBaseCP,
      id: 'minBaseCP',
      label: getTranslation('search-min-cp'),
      onChange: handleUpdateFilter,
      type: 'number',
    },
    {
      defaultValue: filters.maxBaseCP,
      id: 'maxBaseCP',
      label: getTranslation('search-max-cp'),
      onChange: handleUpdateFilter,
      type: 'number',
    },
    {
      defaultChecked: filters.showMegaevolutions,
      id: 'showMegaevolutions',
      label: getTranslation('search-show-megaevolutions'),
      onChange: handleUpdateFilter,
      type: 'switch',
    },
    {
      defaultChecked: filters.showAlolanForms,
      id: 'showAlolanForms',
      label: getTranslation('search-show-alolan-forms'),
      onChange: handleUpdateFilter,
      type: 'switch',
    },
  ];

  return (
    <form className={classNames.form} noValidate>
      {fields.map(field => (
        <Field key={field.id} className={classNames.formField} options={{ ...field, isDisabled: !filtersEnabled }} />
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
