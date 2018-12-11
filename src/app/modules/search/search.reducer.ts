import { AnyAction } from 'redux';

import { ISearchState } from './search.types';

const initialState: ISearchState = {
  bestStats: [],
  // canLearnMTs: [],
  // canLearnSkills: [],
  // dropsCandies: [],
  excludedTypes: [],
  includedTypes: [],
  maxBaseCP: undefined,
  minBaseCP: undefined,
  nameOrNumber: undefined,
  // needsCandies: [],
  showAlolanForms: false,
  showMegaevolutions: false,
  strongAgainst: [],
  weakAgainst: [],
  worstStats: [],
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

export const getFilters = (state: ISearchState) => state;

export default reducer;
