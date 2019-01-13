import { sortBy } from '../../utils/arrays';
import { getTypeRelations } from '../../utils/pokemon';

import {
  SKILLS_CREATE,
  SKILLS_FILTER,
  SKILLS_LOAD_MORE,
  SKILLS_RESET_FILTERS,
  SKILLS_SORT,
} from '../../../constants/actionTypes';
import { paginationSize } from '../../../constants/features';

import { IRichSkill, ISkillsAction, ISkillsState, skillsInitialState } from './skills.models';

const reducer = (state = skillsInitialState, action: ISkillsAction): ISkillsState => {
  switch (action.type) {
    case SKILLS_CREATE:
      return {
        ...state,
        collection: action.payload.collection,
      };

    case SKILLS_FILTER:
      const newFilters = {
        ...state.filters,
      };

      if (action.payload && action.payload.filters) {
        action.payload.filters.forEach((filter: { name: string; value: string | string[] | boolean }) => {
          // @ts-ignore
          newFilters[filter.name] = filter.value;
        });
      }

      return {
        ...state,
        filters: newFilters,
      };

    case SKILLS_LOAD_MORE:
      return {
        ...state,
        pagination: {
          first: 0,
          last: state.pagination.last + paginationSize,
        },
      };

    case SKILLS_RESET_FILTERS:
      return {
        ...state,
        filters: {
          ...skillsInitialState.filters,
        },
      };

    case SKILLS_SORT:
      return {
        ...state,
        sort: action.payload.sort,
      };

    default:
      return state;
  }
};

// Get a list of skills (already filtered)
export const getSkills = (state: ISkillsState, isPaginated: boolean = true) => {
  const { collection, filters, pagination } = state;

  return collection
    .filter(skill => {
      // Filter list by included types
      if (filters.includedTypes.length) {
        let shouldShow = false;
        filters.includedTypes.forEach(type => {
          if (skill.types.ownType === type) {
            shouldShow = true;
          }
        });

        if (!shouldShow) {
          return false;
        }
      }

      // Filter list by excluded types
      if (filters.excludedTypes.length) {
        let shouldSkip = false;
        filters.excludedTypes.forEach(type => {
          if (skill.types.ownType === type) {
            shouldSkip = true;
          }
        });

        if (shouldSkip) {
          return false;
        }
      }

      // Filter list by strong against
      if (filters.strongAgainst.length) {
        const relations = getTypeRelations([skill.types.ownType]);

        let shouldSkip = true;
        filters.strongAgainst.forEach(type => {
          const strongAgainst = relations.filter(relation => relation.id === type && relation.effectiveness < 1);
          if (strongAgainst.length) {
            shouldSkip = false;
          }
        });

        if (shouldSkip) {
          return false;
        }
      }

      // Filter list by weak against
      if (filters.weakAgainst.length) {
        const relations = getTypeRelations([skill.types.ownType]);

        let shouldSkip = true;
        filters.weakAgainst.forEach(type => {
          const weakAgainst = relations.filter(relation => relation.id === type && relation.effectiveness > 1);
          if (weakAgainst.length) {
            shouldSkip = false;
          }
        });

        if (shouldSkip) {
          return false;
        }
      }

      // Filter by accuracy
      if (typeof filters.accuracy !== 'undefined') {
        if (skill.accuracy < filters.accuracy[0] || skill.accuracy > filters.accuracy[1]) {
          return false;
        }
      }

      // Filter by power
      if (typeof filters.power !== 'undefined') {
        if (skill.power < filters.power[0] || skill.power > filters.power[1]) {
          return false;
        }
      }

      // Filter by pp
      if (typeof filters.pp !== 'undefined') {
        if (skill.pp < filters.pp[0] || skill.pp > filters.pp[1]) {
          return false;
        }
      }

      // Filter by probability
      if (typeof filters.probability !== 'undefined') {
        if (skill.probability < filters.probability[0] || skill.probability > filters.probability[1]) {
          return false;
        }
      }

      // Filter by category
      if (typeof filters.category !== 'undefined' && filters.category) {
        if (skill.category !== filters.category) {
          return false;
        }
      }

      return true;
    })
    .sort(sortBy(state.sort.sortBy, state.sort.order))
    .slice(pagination.first, isPaginated ? pagination.last : state.collection.length);
};

// Get a complete list of skills (without paginate, order or filter)
export const getRawSkills = (state: ISkillsState) => state.collection;

// Get pagination data for skills list
export const getSkillsPagination = (state: ISkillsState) => state.pagination;

// Get sorting options for skills list
export const getSkillsSortOptions = (state: ISkillsState) => state.sort;

// Returns all filters
export const getSkillsFilters = (state: ISkillsState) => state.filters;

// Skill Details
// Get details of selected pokemon
export const getSelectedSkill = (state: ISkillsState) => (skillId: string) =>
  state.collection.find(skill => skill.id === skillId);

// Get pagination data for a particular pokemon (already filtered)
export const getSkillPagination = (state: ISkillsState) => (skillId: string) => {
  const sameSkill = (skill: IRichSkill) => skill.id === skillId;

  // Select filtered collection or complete collection
  const filteredCollection = getSkills(state, false);
  const collection = filteredCollection.findIndex(sameSkill) >= 0 ? filteredCollection : state.collection;

  // Select pokemon position in that position
  const position = collection.findIndex(sameSkill);

  return {
    next: position < collection.length - 1 ? collection[position + 1] : collection[0],
    prev: position > 0 ? collection[position - 1] : collection[collection.length - 1],
  };
};

export default reducer;
