import { ActionCreator } from '../../../definitions/action-creator';

interface UpdateArgs {
  filter: string;
  value: string | Array<string> | boolean;
}

export const updateFilters: ActionCreator = ({ filter, value }: UpdateArgs) => dispatch => {
  const parsedValue = value === 'on' ? true : value === 'off' ? false : value;

  dispatch({
    type: 'UPDATE_FILTER',
    payload: {
      filter,
      value: parsedValue,
    },
  });
};

export const resetFilters: ActionCreator = () => dispatch => {
  dispatch({
    type: 'RESET_FILTERS',
  });
};
