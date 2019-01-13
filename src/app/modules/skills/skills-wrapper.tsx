import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { updateCollection } from '../../utils/collections';
import { filtersToString, stringToFilters } from '../../utils/urls';

import SkillsView from './skills-view';

import {
  getRawSkills,
  getSkills,
  getSkillsFilters,
  getSkillsPagination,
  getSkillsSortOptions,
} from '../../root.reducer';
import { filterSkills, loadMoreSkills, resetSkillsFilters, sortSkills } from './skills.actions';

import { SKILLS, SKILLS_SEARCH } from '../../../constants/appRoutes';

import { IRootState } from '../../root.models';
import { DropdownOutput, IFieldOutput, IOption } from '../forms/form.models';
import { ISkill, ISkillsFilters, ISkillsPagination, skillsInitialState } from './skills.models';

interface IOwnProps {
  query?: string;
  url: string;
}

interface IStateProps {
  collection: ISkill[];
  filters: ISkillsFilters;
  pagination: ISkillsPagination;
  skillList: IOption[];
  sort: {
    sortBy: string;
    order: string;
  };
}

interface IDispatchProps {
  FilterSkills: (
    parameters: Array<{
      name: string;
      value: string | string[] | boolean;
    }>
  ) => void;
  LoadMoreSkills: () => void;
  ResetSkillsFilters: () => void;
  SortSkills: (parameters: any) => void;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

interface IOwnState {
  areFiltersOpen: boolean;
  filters: ISkillsFilters;
  redirectTo?: string;
}

class SkillsWrapper extends React.Component<Props, IOwnState> {
  public state = {
    areFiltersOpen: false,
    filters: skillsInitialState.filters,
    redirectTo: '',
  };

  public componentDidMount() {
    const { FilterSkills, query } = this.props;

    const urlFilters = stringToFilters(query);
    const parsedFilters = Object.keys(skillsInitialState.filters).map(key => ({
      name: key,
      // @ts-ignore
      value: urlFilters[key] || skillsInitialState.filters[key],
    }));

    FilterSkills(parsedFilters);
  }

  public componentDidUpdate(prevProps: Props) {
    const { redirectTo } = this.state;

    if (redirectTo) {
      this.setState({
        redirectTo: '',
      });
    }

    if (prevProps.url !== this.props.url) {
      const { FilterSkills, query } = this.props;

      const urlFilters = stringToFilters(query);
      const parsedFilters = Object.keys(skillsInitialState.filters).map(key => ({
        name: key,
        // @ts-ignore
        value: urlFilters[key] || skillsInitialState.filters[key],
      }));

      FilterSkills(parsedFilters);
    }
  }

  public handleSortBy = (sortBy: string) => {
    const { SortSkills, sort } = this.props;

    const isTheSameFilter = sortBy === sort.sortBy;
    const options = ['asc', 'desc'];
    let order = options[0];

    if ((!isTheSameFilter && sortBy !== 'id' && sortBy !== 'name') || (isTheSameFilter && order === sort.order)) {
      order = options[1];
    }

    SortSkills({ sortBy, order });
  };

  public handleSkillChange = (field: IFieldOutput) => {
    const option = field.value as DropdownOutput;

    this.setState({
      redirectTo: SKILLS.replace(':id?', option ? option.value : ''),
    });
  };

  public handleFilterChange = (field: IFieldOutput) => {
    const { filters } = this.state;

    const newFilters = {
      ...filters,
    };

    // @ts-ignore
    const prevFilter = filters[field.id];
    if (
      field.id === 'accuracy' ||
      field.id === 'category' ||
      field.id === 'power' ||
      field.id === 'pp' ||
      field.id === 'probability' ||
      field.id === 'tm'
    ) {
      // @ts-ignore
      newFilters[field.id] = typeof field.value !== 'undefined' ? field.value : prevFilter;
    } else {
      // @ts-ignore
      newFilters[field.id] = updateCollection(prevFilter, field.value.map(s => (s.value ? s.value : s)));
    }

    this.setState({
      filters: newFilters,
    });
  };

  public handleReset = () => {
    this.setState({
      redirectTo: SKILLS.replace(':id?', ''),
    });
  };

  public handleSubmit = () => {
    const { filters } = this.state;

    const redirectTo = filtersToString(filters);
    this.setState({
      redirectTo: redirectTo ? SKILLS_SEARCH.replace(':query', redirectTo) : SKILLS.replace(':id?', ''),
    });
  };

  public handleLoadMoreSkills = () => {
    const { LoadMoreSkills } = this.props;

    LoadMoreSkills();
  };

  public render() {
    const { collection, filters, url, pagination, skillList } = this.props;
    const { redirectTo } = this.state;

    if (redirectTo && redirectTo !== url) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }

    return (
      <SkillsView
        collection={collection}
        handleSortBy={this.handleSortBy}
        skillList={skillList}
        handleSkillChange={e => {
          this.handleSkillChange(e);
        }}
        filters={filters}
        handleFilterChange={e => {
          this.handleFilterChange(e);
        }}
        handleReset={() => {
          this.handleReset();
        }}
        handleSubmit={() => {
          this.handleSubmit();
        }}
        handleLoadMore={
          collection.length >= pagination.last
            ? () => {
                this.handleLoadMoreSkills();
              }
            : undefined
        }
      />
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  collection: getSkills(state),
  filters: getSkillsFilters(state),
  pagination: getSkillsPagination(state),
  skillList: getRawSkills(state).map(skill => ({
    id: skill.id,
    label: skill.name,
    value: skill.id,
  })),
  sort: getSkillsSortOptions(state),
});

const mapDispatchToProps = {
  FilterSkills: filterSkills,
  LoadMoreSkills: loadMoreSkills,
  ResetSkillsFilters: resetSkillsFilters,
  SortSkills: sortSkills,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillsWrapper);
