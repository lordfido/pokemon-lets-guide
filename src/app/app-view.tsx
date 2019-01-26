import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import FooterWrapper from './shell/footer/footer-wrapper';
import HeaderWrapper from './shell/header/header-wrapper';

import { HOME } from '../constants/appRoutes';
import { HD_DISPLAY } from '../constants/styles/styles-media-queries';
import { APP_BACKGROUND } from '../constants/styles/styles-skin';
import { CONTENT } from '../constants/styles/styles-zindex';

import { ISheet } from './root.models';
import { WRAPPED_HEIGH, WRAPPED_WIDTH } from '../constants/styles/styles';

const homeButtonSize = 80;

const sheet: ISheet = {
  content: {
    flexGrow: 1,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
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
    zIndex: CONTENT,

    [HD_DISPLAY]: {
      display: 'block',
    },
  },
  wrapper: {
    backgroundColor: APP_BACKGROUND,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '0 auto',
    overflow: 'hidden',
    overflowY: 'auto',
    transition: 'height 0.2s, width 0.2s',
    width: '100%',

    [HD_DISPLAY]: {
      maxHeight: WRAPPED_HEIGH,
      maxWidth: WRAPPED_WIDTH,
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
      <div className={classes.contentWrapper}>
        <div className={classes.content}>{children}</div>
        <FooterWrapper />
      </div>
    </div>
  </>
);

const AppView = injectSheet(sheet)(unstyledAppView);

export default AppView;
