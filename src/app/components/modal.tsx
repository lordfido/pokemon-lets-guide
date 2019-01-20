import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { RouteComponentProps, withRouter } from 'react-router';

import { HEADER_SIZE, PADDING_S, PADDING_XXXL } from '../../constants/styles/styles';
import { WHITE } from '../../constants/styles/styles-colors';
import {
  MODAL_BACKDROP_BAKGROUND,
  MODAL_BACKGROUND,
  MODAL_CONTENT_BACKGROUND,
} from '../../constants/styles/styles-skin';
import { MODAL, MODAL_BACKDROP } from '../../constants/styles/styles-zindex';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  backdrop: {
    backgroundColor: MODAL_BACKDROP_BAKGROUND,
    height: `calc(100% - ${HEADER_SIZE}px)`,
    position: 'fixed',
    top: HEADER_SIZE,
    width: '100%',
    zIndex: MODAL_BACKDROP,
  },
  content: {
    backgroundColor: MODAL_CONTENT_BACKGROUND,
    borderBottom: `1px solid ${WHITE}`,
    borderTop: `1px solid ${WHITE}`,
    padding: PADDING_XXXL,
    width: '100%',
  },
  wrapper: {
    background: MODAL_BACKGROUND,
    padding: `${PADDING_S}px 0px`,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
    zIndex: MODAL,
  },
};

interface IOwnProps {
  children: React.ReactElement<Element>;
  classes: { [key: string]: string };
  className?: string;
  handleClose?: () => void;
}

type RouteProps = RouteComponentProps<{
  history: any;
}>;

type Props = IOwnProps & RouteProps;

class UnstyledModal extends React.Component<Props> {
  public componentDidMount() {
    document.addEventListener('keyup', this.handleKeyPress);
  }

  public componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  public handleClose = () => {
    const { handleClose, history } = this.props;

    if (handleClose) {
      return handleClose();
    }

    return history.goBack();
  };

  public handleKeyPress = (event: KeyboardEvent) => {
    const { keyCode } = event;

    event.preventDefault();

    switch (keyCode) {
      case 27:
        this.handleClose();
        break;

      default:
    }
  };

  public render() {
    const { children, classes, className } = this.props;

    return (
      <>
        <div className={classes.backdrop} onClick={this.handleClose} />
        <div className={classnames(classes.wrapper, className)}>
          <div className={classes.content}>{children}</div>
        </div>
      </>
    );
  }
}

const Modal = injectSheet(sheet)(UnstyledModal);

export default withRouter(Modal);
