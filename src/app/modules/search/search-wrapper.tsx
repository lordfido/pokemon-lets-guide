import * as React from 'react';

import SearchView from './search-view';

class SearchWrapper extends React.Component {
  public static displayName = 'SearchWrapper';

  public render() {
    return <SearchView />;
  }
}

export default SearchWrapper;
