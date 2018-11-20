import { combineReducers, Reducer } from 'redux';
import { RootState } from './root.types';

// Import reducers
import pokemonReducer from './modules/pokemon/pokemon.reducer';

// Declare root reducer
const rootReducer: Reducer<RootState> = combineReducers({
  pokemon: pokemonReducer,
});

// Custom selectors

export default rootReducer;
