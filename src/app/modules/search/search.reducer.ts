import { AnyAction } from 'redux';

import { SearchState } from './search.types';

const initialState: SearchState = {
  nameOrNumber: undefined,
  includedTypes: [],
  excludedTypes: [],
  bestStats: [],
  worstStats: [],
  showMegaevolutions: false,
  showAlolanForms: false,
  // canLearnSkills: [],
  // canLearnMTs: [],
  // dropsCandies: [],
  // needsCandies: [],
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
