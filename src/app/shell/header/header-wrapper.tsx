import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import HeaderView from './header-view';

import { HOME } from '../../../constants/appRoutes';

type RouteProps = RouteComponentProps<{
  location: any;
}>;

const HeaderWrapper = ({ location }: RouteProps) => <HeaderView showLandingHeader={location.pathname === HOME} />;

export default withRouter(HeaderWrapper);
