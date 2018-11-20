import { Dispatch } from 'redux';

type ActionCreator = (payload?: any) => (dispatch: Dispatch) => any;
