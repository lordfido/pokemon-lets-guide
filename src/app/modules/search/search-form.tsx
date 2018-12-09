import * as React from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getTranslation } from '../../utils/translations';

import Field from '../forms/field';
import Buttons from '../../components/buttons';

import { updateFilters, resetFilters } from './search.actions';

import { SEARCH, HOME } from '../../../constants/appRoutes';
import { filtersEnabled } from '../../../constants/features';
import typesDropdown from './types-dropdown';
import statsDropdown from './stats-dropdown';

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
        ...typesDropdown,
        id: 'includedTypes',
        label: getTranslation('search-include-types'),
        onChange: (selection: Array<any>) => this.filterByType('includedTypes', selection),
        isDisabled: !filtersEnabled,
      },
      {
        ...typesDropdown,
        id: 'excludedTypes',
        label: getTranslation('search-exclude-types'),
        onChange: (selection: Array<any>) => this.filterByType('excludedTypes', selection),
        isDisabled: !filtersEnabled,
      },
      {
        ...typesDropdown,
        id: 'strongAgainst',
        label: getTranslation('search-strong-against'),
        onChange: (selection: Array<any>) => this.filterByType('strongAgainst', selection),
        isDisabled: !filtersEnabled,
      },
      {
        ...typesDropdown,
        id: 'weakAgainst',
        label: getTranslation('search-weak-against'),
        onChange: (selection: Array<any>) => this.filterByType('weakAgainst', selection),
        isDisabled: !filtersEnabled,
      },
      {
        ...statsDropdown,
        id: 'bestStats',
        label: getTranslation('search-best-stats'),
        onChange: (selection: Array<any>) => this.filterByType('bestStats', selection),
        isDisabled: !filtersEnabled,
      },
      {
        ...statsDropdown,
        id: 'worstStats',
        label: getTranslation('search-worst-stats'),
        onChange: (selection: Array<any>) => this.filterByType('worstStats', selection),
        isDisabled: !filtersEnabled,
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
