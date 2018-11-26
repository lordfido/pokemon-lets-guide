import * as React from 'react';

import PokemonListWrapper from '../pokemon-list/pokemon-list-wrapper';
import SearchForm from './search-form';

class SearchView extends React.Component {
  static displayName = 'SearchView';

  render() {
    return (
      <div className="Search">
        <div className="Search-filters">
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
