import * as React from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';

import Field from '../forms/field';
import Buttons from '../../components/buttons';

import { updateFilters, resetFilters } from './search.actions';

import { SEARCH, HOME } from '../../../constants/appRoutes';
import { getTypes, getTypeIcon } from '../../../constants/pokemon-types';
import {
  HP_ID,
  ATTACK_ID,
  DEFENSE_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
  getStatName,
} from '../../../constants/pokemon-stats';
import { filtersEnabled } from '../../../constants/features';

const typeFilterOptions = getTypes().map(option => ({
  type: 'option',
  id: option.id,
  label: option.name,
  value: option.id,
  icon: getTypeIcon(option.id),
}));

const statsFilterOptions = [HP_ID, ATTACK_ID, DEFENSE_ID, SPECIAL_ATTACK_ID, SPECIAL_DEFENSE_ID, SPEED_ID].map(
  stat => ({
    type: 'option',
    id: stat,
    label: getStatName(stat),
    value: stat,
  })
);

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
        label: 'Name or number',
        onChange: (selection: Array<any>) => this.filterByType('nameOrNumber', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'multi',
        id: 'includedTypes',
        form: 'search',
        label: 'Include types',
        placeholder: 'Select some types',
        options: typeFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('includedTypes', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'multi',
        id: 'excludedTypes',
        form: 'search',
        label: 'Exclude types',
        placeholder: 'Select some types',
        options: typeFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('excludedTypes', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'multi',
        id: 'strongAgainst',
        form: 'search',
        label: 'Strong against',
        placeholder: 'Select some types',
        options: typeFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('strongAgainst', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'multi',
        id: 'weakAgainst',
        form: 'search',
        label: 'Weak against',
        placeholder: 'Select some types',
        options: typeFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('weakAgainst', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'multi',
        id: 'bestStats',
        form: 'search',
        label: 'Best stats',
        placeholder: 'Select some stats',
        options: statsFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('bestStats', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'multi',
        id: 'worstStats',
        form: 'search',
        label: 'Worst stats',
        placeholder: 'Select some stats',
        options: statsFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('worstStats', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'number',
        id: 'minBaseCP',
        form: 'search',
        label: 'Min. Base CP',
        onChange: (selection: Array<any>) => this.filterByType('minBaseCP', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'number',
        id: 'maxBaseCP',
        form: 'search',
        label: 'Max. Base CP',
        onChange: (selection: Array<any>) => this.filterByType('maxBaseCP', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'switch',
        id: 'showMegaevolutions',
        form: 'search',
        label: 'Show megaevolutions',
        onChange: (selection: Array<any>) => this.filterByType('showMegaevolutions', selection),
        isDisabled: !filtersEnabled,
      },
      {
        type: 'switch',
        id: 'showAlolanForms',
        form: 'search',
        label: 'Show alolan forms',
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
              label: 'Reset',
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
