import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { IButtonProps } from './button';

import { FOOTER_SIZE, HEADER_SIZE, PADDING_L, PADDING_XL, PADDING_XXL } from '../../constants/styles';
import { DESKTOP_L } from '../../constants/styles-media-queries';

import { ISheet } from '../root.models';
import Buttons from './buttons';

export const SIDEBAR_SIZE = 280;

const sheet: ISheet = {
  buttons: {
    margin: 0,
    padding: `0 ${PADDING_L}px`,
    width: '100%',

    [DESKTOP_L]: {
      display: 'none',
    },
  },
  wrapper: {
    maxHeight: 54,
    overflow: 'hidden',
    padding: PADDING_XL,
    paddingBottom: 0,
    textAlign: 'center',

    [DESKTOP_L]: {
      display: 'inline-block',
      maxHeight: 'none',
      minHeight: `calc(100vh - ${HEADER_SIZE}px - ${FOOTER_SIZE}px)`,
      padding: PADDING_XXL,
      paddingRight: 0,
      textAlign: 'left',
      verticalAlign: 'top',
      width: SIDEBAR_SIZE,
    },
  },
  wrapperOpen: {
    maxHeight: 'none',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
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
    const { classes, render } = this.props;
    const { isOpen } = this.state;

    const toggleButton: IButtonProps = {
      icon: isOpen ? 'minus' : 'plus',
      id: 'toggle-sidebar',
      onClick: () => {
        this.handleToggleSidebar();
      },
      type: 'button',
    };

    return (
      <aside className={classnames(classes.wrapper, { [classes.wrapperOpen]: isOpen })}>
        <Buttons className={classes.buttons} options={[toggleButton]} />

        {render(isOpen)}
      </aside>
    );
  }
}

const Sidebar = injectSheet(sheet)(UnstyledSidebar);

export default Sidebar;
