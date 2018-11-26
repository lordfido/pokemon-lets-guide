import { AnyAction } from 'redux';

import { SearchState } from './search.types';

const initialState: SearchState = {
  number: undefined,
  name: '',
  type: [],
  bestStats: [],
  worstStats: [],
  canLearnSkills: [],
  canLearnMTs: [],
  dropsCandies: [],
  needsCandies: [],
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
