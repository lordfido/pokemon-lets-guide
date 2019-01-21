import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { getMovePagination, getSelectedMove } from '../../root.reducer';

import { MOVES } from '../../../constants/appRoutes';

import { IRootState } from '../../root.models';
import { IMovePagination, IRichMove } from '../moves/moves.models';
import MoveView from './move-view';

const getMoveUrl = (move: IRichMove) => MOVES.replace(':id?', move.id);

interface IOwnProps {
  id: string;
}

interface IStateProps {
  move?: IRichMove;
  pagination: IMovePagination;
}

type Props = IOwnProps & IStateProps;

interface IOwnState {
  redirectTo?: string;
}

class MoveWrapper extends React.Component<Props, IOwnState> {
  public state = {
    redirectTo: undefined,
  };

  public componentDidMount() {
    document.addEventListener('keyup', this.handleKeyPress);
  }

  public componentDidUpdate() {
    if (this.state.redirectTo) {
      this.setState({
        redirectTo: '',
      });
    }
  }

  public componentWillUnmount() {
    document.addEventListener('keyup', this.handleKeyPress);
  }

  public handleKeyPress = (event: KeyboardEvent) => {
    const { pagination } = this.props;
    const { keyCode } = event;

    event.preventDefault();
    let redirectTo = '';

    switch (keyCode) {
      case 37: // left
      case 38: // up
        redirectTo = getMoveUrl(pagination.prev);
        break;

      case 39: // right
      case 40: // down
        redirectTo = getMoveUrl(pagination.next);
        break;

      default:
    }

    if (redirectTo) {
      this.setState({
        redirectTo,
      });
    }
  };

  public handleModalClose = () => {
    this.setState({
      redirectTo: MOVES.replace(':id?', ''),
    });
  };

  public render() {
    const { move, pagination } = this.props;
    const { redirectTo } = this.state;

    if (redirectTo) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }

    if (!move) {
      return <Redirect to={{ pathname: MOVES.replace(':id?', '') }} />;
    }

    return (
      <MoveView
        handleModalClose={() => {
          this.handleModalClose();
        }}
        move={move}
        pagination={pagination}
      />
    );
  }
}

const mapStateToProps = (state: IRootState, ownProps: Props): IStateProps => {
  const move = getSelectedMove(state)(ownProps.id);

  const pagination = getMovePagination(state)(ownProps.id);

  return {
    move,
    pagination,
  };
};

export default connect(mapStateToProps)(MoveWrapper);
