import * as React from 'react';

import LandingView from './landing-view';

class LandingWrapper extends React.Component {
  static displayName = 'LandingWrapper';

  render() {
    return <LandingView />;
  }
}

export default LandingWrapper;
