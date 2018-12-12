import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { getTranslation } from '../../../utils/translations';

import Buttons from '../../../components/buttons';
import Field from '../../forms/field';
import statsDropdown from './stats-dropdown';
import typesDropdown from './types-dropdown';

import { resetFilters, updateFilters } from '../pokedex.actions';

import { HOME, SEARCH } from '../../../../constants/appRoutes';
import { filtersEnabled } from '../../../../constants/features';

interface IMatchParams {
  query: string;
}

type RouteProps = RouteComponentProps<IMatchParams>;

interface IDispatchProps {
  ResetFilters: () => void;
  UpdateFilters: (parameters: any) => void;
}

type Props = RouteProps & IDispatchProps;

class SearchForm extends React.Component<Props> {
  public static displayName = 'SearchForm';

  public filterByType(filter: string, selection: any) {
    const { UpdateFilters } = this.props;

    UpdateFilters({ filter, value: selection.map ? selection.map((s: any) => s.value) : selection });
  }

  public getCurrentQuery() {
    const {
      location: { pathname },
    } = this.props;

    if (pathname === HOME) {
      return '';
    }

    return pathname.replace(SEARCH.replace(':query', ''), '');
  }

  public getNextQuery() {
    // const { type } = this.state;
    // let query = '';

    // if (type) query += `type=${type};`;

    // return query;
    return '';
  }

  public render() {
    const { ResetFilters } = this.props;

    const fields = [
      {
        form: 'search',
        id: 'nameOrNumber',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-name-or-number'),
        onChange: (selection: any[]) => this.filterByType('nameOrNumber', selection),
        type: 'text',
      },
      {
        ...typesDropdown,
        id: 'includedTypes',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-include-types'),
        onChange: (selection: any[]) => this.filterByType('includedTypes', selection),
      },
      {
        ...typesDropdown,
        id: 'excludedTypes',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-exclude-types'),
        onChange: (selection: any[]) => this.filterByType('excludedTypes', selection),
      },
      {
        ...typesDropdown,
        id: 'strongAgainst',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-strong-against'),
        onChange: (selection: any[]) => this.filterByType('strongAgainst', selection),
      },
      {
        ...typesDropdown,
        id: 'weakAgainst',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-weak-against'),
        onChange: (selection: any[]) => this.filterByType('weakAgainst', selection),
      },
      {
        ...statsDropdown,
        id: 'bestStats',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-best-stats'),
        onChange: (selection: any[]) => this.filterByType('bestStats', selection),
      },
      {
        ...statsDropdown,
        id: 'worstStats',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-worst-stats'),
        onChange: (selection: any[]) => this.filterByType('worstStats', selection),
      },
      {
        form: 'search',
        id: 'minBaseCP',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-min-cp'),
        onChange: (selection: any[]) => this.filterByType('minBaseCP', selection),
        type: 'number',
      },
      {
        form: 'search',
        id: 'maxBaseCP',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-max-cp'),
        onChange: (selection: any[]) => this.filterByType('maxBaseCP', selection),
        type: 'number',
      },
      {
        form: 'search',
        id: 'showMegaevolutions',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-show-megaevolutions'),
        onChange: (selection: any[]) => this.filterByType('showMegaevolutions', selection),
        type: 'switch',
      },
      {
        form: 'search',
        id: 'showAlolanForms',
        isDisabled: !filtersEnabled,
        label: getTranslation('search-show-alolan-forms'),
        onChange: (selection: any[]) => this.filterByType('showAlolanForms', selection),
        type: 'switch',
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
              label: getTranslation('search-reset-filters'),
              onClick: () => {
                ResetFilters();
              },
              type: 'button',
            },
          ]}
        />
      </form>
    );
  }
}

const mapDispatchToProps = {
  ResetFilters: resetFilters,
  UpdateFilters: updateFilters,
};

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(SearchForm)
);
