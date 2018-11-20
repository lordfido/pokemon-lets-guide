import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type RouteProps = RouteComponentProps<{
  location: any;
}>;

class ScrollToTop extends React.Component<RouteProps> {
  static displayName = 'ScrollToTop';

  componentDidUpdate(prevProps: RouteProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
