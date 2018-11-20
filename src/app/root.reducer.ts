import { combineReducers, Reducer } from 'redux';
import { RootState } from './root.types';

// Import reducers
import pokemonReducer from './modules/pokemon-list/pokemon-list.reducer';

// Declare root reducer
const rootReducer: Reducer<RootState> = combineReducers({
  pokemon: pokemonReducer,
});

// Custom selectors

export default rootReducer;
