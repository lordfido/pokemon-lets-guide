import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';

import { getSelectedMove } from '../../root.reducer';

import { MOVES } from '../../../constants/appRoutes';

import { IRootState } from '../../root.models';
import { IRichMove } from '../moves/moves.models';
import MoveView from './move-view';

interface IOwnProps {
  id: string;
}

type RouteProps = RouteComponentProps<{
  history: any;
}>;

interface IStateProps {
  move?: IRichMove;
}

type Props = IOwnProps & RouteProps & IStateProps;

class MoveWrapper extends React.Component<Props> {
  public componentDidMount() {
    document.addEventListener('keyup', this.handleKeyPress);
  }

  public componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  public handleClose = () => {
    const { history } = this.props;

    history.goBack();
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
    const { move } = this.props;

    if (!move) {
      return null;
      return <Redirect to={{ pathname: MOVES.replace(':id?', '') }} />;
    }

    return (
      <MoveView
        handleClose={() => {
          this.handleClose();
        }}
        move={move}
      />
    );
  }
}

const mapStateToProps = (state: IRootState, ownProps: Props): IStateProps => {
  const move = getSelectedMove(state)(ownProps.id);

  return {
    move,
  };
};

export default withRouter(connect(mapStateToProps)(MoveWrapper));
