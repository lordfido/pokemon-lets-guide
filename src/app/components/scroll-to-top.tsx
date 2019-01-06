import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import analyticsApi from '../../common/apis/analytics';

type RouteProps = RouteComponentProps<{
  location: any;
}>;

class ScrollToTop extends React.Component<RouteProps> {
  public componentDidUpdate(prevProps: RouteProps) {
    if (this.props.location !== prevProps.location) {
      const scrollingElement = document.querySelector('#app > div');

      if (scrollingElement) {
        scrollingElement.scrollTo(0, 0);
      }

      analyticsApi.logPageView(this.props.location.pathname);
    }
  }

  public render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
