import classnames from 'classnames';
import * as React from 'react';

import PokemonListWrapper from '../pokemon-list/pokemon-list-wrapper';
import SearchForm from './search-form';
import Buttons from '../../components/buttons';

interface IOwnState {
  isOpen: boolean;
}

class SearchView extends React.Component<{}, IOwnState> {
  public static displayName = 'SearchView';

  public state = {
    isOpen: false,
  };

  public toggleFilters() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  public render() {
    const { isOpen } = this.state;

    const filtersButton = {
      className: 'Search-toggle',
      icon: 'search',
      id: 'toggle-filters',
      onClick: () => {
        this.toggleFilters();
      },
      type: 'button',
    };

    return (
      <div className="Search">
        <div className={classnames('Search-filters', { ['is-open']: isOpen })}>
          <Buttons className="Search-buttons" options={[filtersButton]} />

          <SearchForm />
        </div>
        <div className="Search-results">
          <PokemonListWrapper />
        </div>
      </div>
    );
  }
}

export default SearchView;
