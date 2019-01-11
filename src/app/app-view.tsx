import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import FooterWrapper from './shell/footer/footer-wrapper';
import HeaderWrapper from './shell/header/header-wrapper';

import { HOME } from '../constants/appRoutes';
import { GREY_LIGHT_5 } from '../constants/styles-colors';
import { HD_DISPLAY } from '../constants/styles-media-queries';

import { ISheet } from './root.models';

const homeButtonSize = 80;

const sheet: ISheet = {
  content: {
    flexGrow: 1,
    margin: 0,
    overflow: 'hidden',
    overflowY: 'auto',
    width: '100%',
  },
  homeButton: {
    backgroundColor: 'transparent',
    display: 'none',
    height: homeButtonSize,
    left: 'calc(50% + 846px)',
    position: 'absolute',
    top: 'calc(50% + 164px)',
    width: homeButtonSize,
    zIndex: 1,
  },
  wrapper: {
    backgroundColor: GREY_LIGHT_5,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '0 auto',
    overflow: 'hidden',
    overflowY: 'auto',
    transition: 'height 0.2s, width 0.2s',
    width: '100%',
  },

  [HD_DISPLAY]: {
    homeButton: {
      display: 'block',
    },
    wrapper: {
      maxHeight: 720,
      maxWidth: 1280,
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
};
interface IOwnProps {
  children: JSX.Element;
  classes: { [key: string]: string };
}

const unstyledAppView = ({ children, classes }: IOwnProps) => (
  <>
    <Link className={classes.homeButton} to={{ pathname: HOME }} />
    <div id="app" className={classes.wrapper}>
      <HeaderWrapper />
      <div className={classes.content}>
        <>
          {children}
          <FooterWrapper />
        </>
      </div>
    </div>
  </>
);

const AppView = injectSheet(sheet)(unstyledAppView);

export default AppView;
