import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { getSelectedMove } from '../../root.reducer';

import { MOVES } from '../../../constants/appRoutes';

import { IRootState } from '../../root.models';
import { IRichMove } from '../moves/moves.models';
import MoveView from './move-view';

interface IOwnProps {
  id: string;
}

interface IStateProps {
  move?: IRichMove;
}

type Props = IOwnProps & IStateProps;

const MoveWrapper = ({ move }: Props) =>
  move ? <MoveView move={move} /> : <Redirect to={{ pathname: MOVES.replace(':id?', '') }} />;

const mapStateToProps = (state: IRootState, ownProps: Props): IStateProps => {
  const move = getSelectedMove(state)(ownProps.id);

  return {
    move,
  };
};

export default connect(mapStateToProps)(MoveWrapper);
