import * as React from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';

import Field from '../forms/field';

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

interface OwnState {
  type: string | void;
}

class SearchForm extends React.Component<RouteProps, OwnState> {
  static displayName = 'SearchForm';

  constructor(props: RouteProps) {
    super(props);

    this.state = {
      type: undefined,
    };
  }

  filterByType(filter: string, selection: any) {
    console.log({ filter, selection });
  }

  getCurrentQuery() {
    const {
      location: { pathname },
    } = this.props;

    if (pathname === HOME) return '';
    return pathname.replace(SEARCH.replace(':query', ''), '');
  }

  getNextQuery() {
    const { type } = this.state;
    let query = '';

    if (type) query += `type=${type};`;

    return query;
  }

  render() {
    const fields = [
      {
        type: 'text',
        id: 'nameOrNumber',
        form: 'search',
        label: 'Name or number',
        onChange: (selection: Array<any>) => this.filterByType('nameOrNumber', selection),
        isDisabled: true,
      },
      {
        type: 'multi',
        id: 'includedTypes',
        form: 'search',
        label: 'Include types',
        placeholder: 'Select some types',
        options: typeFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('includedTypes', selection),
        isDisabled: true,
      },
      {
        type: 'multi',
        id: 'excludedTypes',
        form: 'search',
        label: 'Exclude types',
        placeholder: 'Select some types',
        options: statsFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('excludedTypes', selection),
        isDisabled: true,
      },
      {
        type: 'multi',
        id: 'bestStats',
        form: 'search',
        label: 'Best stats',
        placeholder: 'Select some stats',
        options: statsFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('bestStats', selection),
        isDisabled: true,
      },
      {
        type: 'multi',
        id: 'worstStats',
        form: 'search',
        label: 'Worst stats',
        placeholder: 'Select some stats',
        options: statsFilterOptions,
        onChange: (selection: Array<any>) => this.filterByType('worstStats', selection),
        isDisabled: true,
      },
      {
        type: 'switch',
        id: 'showMegaevolutions',
        form: 'search',
        label: 'Show megaevolutions',
        onChange: (selection: Array<any>) => this.filterByType('showMegaevolutions', selection),
        isDisabled: true,
      },
      {
        type: 'switch',
        id: 'showAlolanForms',
        form: 'search',
        label: 'Show alolan forms',
        onChange: (selection: Array<any>) => this.filterByType('showAlolanForms', selection),
        isDisabled: true,
      },
    ];

    const currentQuery = this.getCurrentQuery();
    const nextQuery = this.getNextQuery();
    if (currentQuery !== nextQuery) {
      return <Redirect to={{ pathname: SEARCH.replace(':query', nextQuery) }} />;
    }

    return (
      <form noValidate>
        {fields.map(field => (
          <Field key={field.id} options={field} />
        ))}
      </form>
    );
  }
}

export default withRouter(SearchForm);
