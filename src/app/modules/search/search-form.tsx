import * as React from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';
import Dropdown from '../forms/form-dropdown';
import { getTypes, getTypeIcon, PokemonType } from '../../../constants/pokemon-types';
import Field from '../forms/field';
import { SEARCH, HOME } from '../../../constants/appRoutes';

const typeFilterOptions = getTypes().map(option => ({
  type: 'option',
  id: option.id,
  label: option.name,
  value: option.id,
  icon: getTypeIcon(option.id),
}));

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

  filterByType(selection: Array<any>) {
    // @ts-ignore
    console.log('Selected', selection);

    this.setState({
      type: selection.map(option => option.value).join(','),
    });
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
    const options = {
      type: 'multi',
      id: 'type',
      form: 'search',
      label: 'Types',
      options: typeFilterOptions,
      onChange: (selection: Array<any>) => this.filterByType(selection),
    };

    const currentQuery = this.getCurrentQuery();
    const nextQuery = this.getNextQuery();
    if (currentQuery !== nextQuery) {
      return <Redirect to={{ pathname: SEARCH.replace(':query', nextQuery) }} />;
    }

    return (
      <form noValidate>
        <Field options={options} />
      </form>
    );
  }
}

export default withRouter(SearchForm);
