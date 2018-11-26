import * as React from 'react';
import { connect } from 'react-redux';

import SearchView from './search-view';

interface DispatchProps {}

class SearchWrapper extends React.Component<DispatchProps> {
  static displayName = 'SearchWrapper';

  render() {
    return <SearchView />;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchWrapper);
