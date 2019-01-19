import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { IButtonProps } from './button';

import { FOOTER_SIZE_L, HEADER_SIZE, PADDING_L, PADDING_XL, PADDING_XXL } from '../../constants/styles/styles';
import { DESKTOP_L, HD_DISPLAY } from '../../constants/styles/styles-media-queries';
import { SIDEBAR_BACKDROP_BACKGROUND, SIDEBAR_BACKGROUND } from '../../constants/styles/styles-skin';
import { BACKGROUND, SIDEBAR, SIDEBAR_BACKDROP } from '../../constants/styles/styles-zindex';

import { ISheet } from '../root.models';
import Buttons from './buttons';

export const SIDEBAR_SIZE = 280;

const sheet: ISheet = {
  backdrop: {
    backgroundColor: SIDEBAR_BACKDROP_BACKGROUND,
    height: `calc(100% - ${HEADER_SIZE}px)`,
    left: 0,
    opacity: 0,
    position: 'fixed',
    top: HEADER_SIZE,
    transition: 'opacity 0.3s',
    width: '100%',
    zIndex: BACKGROUND,
  },
  backdropOpen: {
    opacity: 1,
    zIndex: SIDEBAR_BACKDROP,
  },
  buttons: {
    margin: 0,
    padding: `0 ${PADDING_L}px`,
    width: '100%',

    [DESKTOP_L]: {
      display: 'none',
    },
  },
  sidebar: {
    backgroundColor: SIDEBAR_BACKGROUND,
    display: 'inline-block',
    height: `calc(100vh - ${HEADER_SIZE}px)`,
    left: 0,
    marginLeft: -SIDEBAR_SIZE,
    overflow: 'hidden',
    overflowY: 'auto',
    padding: PADDING_XL,
    position: 'fixed',
    textAlign: 'left',
    top: HEADER_SIZE,
    transition: 'margin 0.3s',
    width: SIDEBAR_SIZE,
    zIndex: SIDEBAR,

    [DESKTOP_L]: {
      backgroundColor: 'transparent',
      color: 'inherit',
      height: 'auto',
      marginLeft: 0,
      minHeight: `calc(100vh - ${HEADER_SIZE}px - ${PADDING_XXL * 2}px - ${FOOTER_SIZE_L}px - 6px)`,
      padding: 0,
      position: 'initial',
      width: SIDEBAR_SIZE - PADDING_XXL,
    },

    [HD_DISPLAY]: {
      minHeight: `calc(720px - ${HEADER_SIZE}px - ${PADDING_XXL * 2}px - ${FOOTER_SIZE_L}px - 6px)`,
    },
  },
  sidebarOpen: {
    marginLeft: 0,
  },
  wrapper: {
    display: 'inline-block',
    padding: PADDING_XL,
    paddingBottom: 0,
    width: '100%',

    [DESKTOP_L]: {
      padding: PADDING_XXL,
      paddingRight: 0,
      width: SIDEBAR_SIZE,
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  render: (isOpen: boolean) => React.ReactElement<any>;
}

interface IOwnState {
  isOpen: boolean;
}

class UnstyledSidebar extends React.Component<IOwnProps, IOwnState> {
  public state = {
    isOpen: false,
  };

  public handleToggleSidebar = () => {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  };

  public render() {
    const { classes, className, render } = this.props;
    const { isOpen } = this.state;

    const toggleButton: IButtonProps = {
      icon: 'bars',
      id: 'toggle-sidebar',
      onClick: () => {
        this.handleToggleSidebar();
      },
      type: 'button',
    };

    return (
      <div className={classnames(classes.wrapper, className)}>
        <Buttons className={classes.buttons} options={[toggleButton]} align="left" />

        <aside className={classnames(classes.sidebar, { [classes.sidebarOpen]: isOpen })}>{render(isOpen)}</aside>
        <div
          className={classnames(classes.backdrop, { [classes.backdropOpen]: isOpen })}
          onClick={this.handleToggleSidebar}
        />
      </div>
    );
  }
}

const Sidebar = injectSheet(sheet)(UnstyledSidebar);

export default Sidebar;
