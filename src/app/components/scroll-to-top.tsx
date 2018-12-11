import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type RouteProps = RouteComponentProps<{
  location: any;
}>;

class ScrollToTop extends React.Component<RouteProps> {
  public static displayName = 'ScrollToTop';

  public componentDidUpdate(prevProps: RouteProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
