// Import reducers
import * as pokedexSelectors from './modules/pokedex/pokedex.reducer';
import * as skillsSelectors from './modules/skills/skills.reducer';

import { createRootReducer, IRootState } from './root.models';

// Declare root reducer
const rootReducer = createRootReducer();

// Custom selectors
// Pokedex
export const getPokedex = ({ pokedex }: IRootState, isPaginated?: boolean) =>
  pokedexSelectors.getPokedex(pokedex, isPaginated);
export const getRawPokedex = ({ pokedex }: IRootState) => pokedexSelectors.getRawPokedex(pokedex);
export const getPokedexPagination = ({ pokedex }: IRootState) => pokedexSelectors.getPokedexPagination(pokedex);
export const getPokedexSortOptions = ({ pokedex }: IRootState) => pokedexSelectors.getPokedexSortOptions(pokedex);
export const getPokedexFilters = ({ pokedex }: IRootState) => pokedexSelectors.getPokedexFilters(pokedex);
export const getSelectedPokemon = ({ pokedex }: IRootState) => pokedexSelectors.getSelectedPokemon(pokedex);
export const getPokemonPagination = ({ pokedex }: IRootState) => pokedexSelectors.getPokemonPagination(pokedex);

// Skills
export const getSkills = ({ skills }: IRootState, isPaginated?: boolean) =>
  skillsSelectors.getSkills(skills, isPaginated);
export const getRawSkills = ({ skills }: IRootState) => skillsSelectors.getRawSkills(skills);
export const getSkillsPagination = ({ skills }: IRootState) => skillsSelectors.getSkillsPagination(skills);
export const getSkillsSortOptions = ({ skills }: IRootState) => skillsSelectors.getSkillsSortOptions(skills);
export const getSkillsFilters = ({ skills }: IRootState) => skillsSelectors.getSkillsFilters(skills);
export const getSelectedSkill = ({ skills }: IRootState) => skillsSelectors.getSelectedSkill(skills);
export const getSkillPagination = ({ skills }: IRootState) => skillsSelectors.getSkillPagination(skills);

export default rootReducer;
