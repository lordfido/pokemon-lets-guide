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
    case 'UPDATE_FILTER':
      return {
        ...state,
        [action.payload.filter]: action.payload.value,
      };

    case 'RESET_FILTERS':
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;
