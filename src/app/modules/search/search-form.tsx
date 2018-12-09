import * as React from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import chroma from 'chroma-js';

import Field from '../forms/field';
import Buttons from '../../components/buttons';

import { updateFilters, resetFilters } from './search.actions';

import { SEARCH, HOME } from '../../../constants/appRoutes';
import { filtersEnabled } from '../../../constants/features';
import { getTypes, getTypeIcon } from '../../../constants/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon-types-color';
import {
  HP_ID,
  ATTACK_ID,
  DEFENSE_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
  getStatName,
  getStatColor,
  StatId,
} from '../../../constants/pokemon-stats';

import { Type } from 'pokelab-lets-go/dist/cjs/types';
import { getTranslation } from '../../../constants/translations';

interface DropdownReadableData {
  data: any;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

const typeFilterOptions = getTypes().map(option => ({
  type: 'option',
  id: option.id,
  label: option.name,
  value: option.id,
  icon: getTypeIcon(option.id),
}));

const getTypeDropdownColors = (type: Type) => {
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

const statsFilterOptions = [HP_ID, ATTACK_ID, DEFENSE_ID, SPECIAL_ATTACK_ID, SPECIAL_DEFENSE_ID, SPEED_ID].map(
  stat => ({
    type: 'option',
    id: stat,
    label: getStatName(stat),
    value: stat,
  })
);

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

interface MatchParams {
  query: string;
}

type RouteProps = RouteComponentProps<MatchParams>;

interface DispatchProps {
  updateFilters: Function;
  resetFilters: Function;
}

type Props = RouteProps & DispatchProps;

class SearchForm extends React.Component<Props> {
  static displayName = 'SearchForm';

  filterByType(filter: string, selection: any) {
    const { updateFilters } = this.props;

    updateFilters({ filter, value: selection.map ? selection.map((s: any) => s.value) : selection });
  }

  getCurrentQuery() {
    const {
      location: { pathname },
    } = this.props;

    if (pathname === HOME) return '';
    return pathname.replace(SEARCH.replace(':query', ''), '');
  }

  getNextQuery() {
    // const { type } = this.state;
    // let query = '';

    // if (type) query += `type=${type};`;

    // return query;
    return '';
  }

  render() {
    const { resetFilters } = this.props;

    const fields = [
      {
        type: 'text',
        id: 'nameOrNumber',
        form: 'search',
        label: getTranslation('search-name-or-number'),
        onChange: (selection: Array<any>) => this.filterByType('nameOrNumber', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'multi',
        id: 'includedTypes',
        form: 'search',
        label: getTranslation('search-include-types'),
        placeholder: getTranslation('search-select-some-types'),
        options: typeFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('includedTypes', selection),
        isDisabled: !filtersEnabled,
        colourStyles: typeColorStyles,
      },
      {
        type: 'multi',
        id: 'excludedTypes',
        form: 'search',
        label: getTranslation('search-exclude-types'),
        placeholder: getTranslation('search-select-some-types'),
        options: typeFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('excludedTypes', selection),
        isDisabled: !filtersEnabled,
        colourStyles: typeColorStyles,
      },
      {
        type: 'multi',
        id: 'strongAgainst',
        form: 'search',
        label: getTranslation('search-strong-against'),
        placeholder: getTranslation('search-select-some-types'),
        options: typeFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('strongAgainst', selection),
        isDisabled: !filtersEnabled,
        colourStyles: typeColorStyles,
      },
      {
        type: 'multi',
        id: 'weakAgainst',
        form: 'search',
        label: getTranslation('search-weak-against'),
        placeholder: getTranslation('search-select-some-types'),
        options: typeFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('weakAgainst', selection),
        isDisabled: !filtersEnabled,
        colourStyles: typeColorStyles,
      },
      {
        type: 'multi',
        id: 'bestStats',
        form: 'search',
        label: getTranslation('search-best-stats'),
        placeholder: getTranslation('search-select-some-stats'),
        options: statsFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('bestStats', selection),
        isDisabled: !filtersEnabled,
        colourStyles: statsColorStyles,
      },
      {
        type: 'multi',
        id: 'worstStats',
        form: 'search',
        label: getTranslation('search-worst-stats'),
        placeholder: getTranslation('search-select-some-stats'),
        options: statsFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('worstStats', selection),
        isDisabled: !filtersEnabled,
        colourStyles: statsColorStyles,
      },
      {
        type: 'number',
        id: 'minBaseCP',
        form: 'search',
        label: getTranslation('search-min-cp'),
        onChange: (selection: Array<any>) => this.filterByType('minBaseCP', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'number',
        id: 'maxBaseCP',
        form: 'search',
        label: getTranslation('search-max-cp'),
        onChange: (selection: Array<any>) => this.filterByType('maxBaseCP', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'switch',
        id: 'showMegaevolutions',
        form: 'search',
        label: getTranslation('search-show-megaevolutions'),
        onChange: (selection: Array<any>) => this.filterByType('showMegaevolutions', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'switch',
        id: 'showAlolanForms',
        form: 'search',
        label: getTranslation('search-show-alolan-forms'),
        onChange: (selection: Array<any>) => this.filterByType('showAlolanForms', selection),
        isDisabled: !filtersEnabled,
      },
    ];

    const currentQuery = this.getCurrentQuery();
    const nextQuery = this.getNextQuery();
    if (false && currentQuery !== nextQuery) {
      return <Redirect to={{ pathname: SEARCH.replace(':query', nextQuery) }} />;
    }

    return (
      <form noValidate>
        {fields.map(field => (
          <Field key={field.id} options={field} />
        ))}

        <Buttons
          options={[
            {
              id: 'reset',
              type: 'button',
              label: getTranslation('search-reset-filters'),
              onClick: () => {
                resetFilters();
              },
            },
          ]}
        />
      </form>
    );
  }
}

const mapDispatchToProps = {
  updateFilters,
  resetFilters,
};

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(SearchForm)
);
