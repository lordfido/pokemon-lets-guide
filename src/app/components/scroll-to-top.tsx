import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type RouteProps = RouteComponentProps<{
  location: any;
}>;

class ScrollToTop extends React.Component<RouteProps> {
  public componentDidUpdate(prevProps: RouteProps) {
    if (this.props.location !== prevProps.location) {
      const scrollingElement = document.querySelector('.App-content');

      if (scrollingElement) {
        scrollingElement.scrollTo(0, 0);
      }
    }
  }

  public render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
