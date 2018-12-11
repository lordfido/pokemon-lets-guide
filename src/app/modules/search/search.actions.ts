import { ActionCreator } from '../../../definitions/action-creator';

interface IUpdateArgs {
  filter: string;
  value: string | string[] | boolean;
}

export const updateFilters: ActionCreator = ({ filter, value }: IUpdateArgs) => dispatch => {
  const parsedValue = value === 'on' ? true : value === 'off' ? false : value;

  dispatch({
    payload: {
      filter,
      value: parsedValue,
    },
    type: 'UPDATE_FILTER',
  });
};

export const resetFilters: ActionCreator = () => dispatch => {
  dispatch({
    type: 'RESET_FILTERS',
  });
};
