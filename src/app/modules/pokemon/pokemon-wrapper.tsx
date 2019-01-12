import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import analyticsApi from '../../../common/apis/analytics';
import { getCookie, setCookie } from '../../../common/utils/cookies';
import { getRichPokemon } from '../../utils/pokemon';

import { getPokemonPagination, getSelectedPokemon } from '../../root.reducer';

import { IButtonProps } from '../../components/button';
import PokemonView from './pokemon-view';

import { IRootState } from '../../root.models';
import { IPokemonDetailPagination, IRichPokemon } from '../pokedex/pokedex.models';

import { CALCULATOR, POKEDEX } from '../../../constants/appRoutes';
import { POKEMON_VIEW_MODE } from '../../../constants/cookies';
import { POKEMON_VIEW_MODE as POKEMON_VIEW_MODE_ACTION } from '../../../constants/metrics/actions';
import { USER_PREFERENCES } from '../../../constants/metrics/categories';
import { BARS, CHART, ViewMode } from '../../components/stats-chart';
import { getTranslation } from '../../utils/translations';

interface IOwnProps {
  id: string;
}

interface IStateProps {
  pokemon: IRichPokemon | void;
  pagination: IPokemonDetailPagination;
}

type Props = IOwnProps & IStateProps;

interface IOwnState {
  viewMode: ViewMode;
}

class PokemonWrapper extends React.Component<Props, IOwnState> {
  public state = {
    viewMode: (getCookie(POKEMON_VIEW_MODE) as ViewMode) || CHART,
  };

  public toggleViewMode(viewMode: ViewMode) {
    setCookie(POKEMON_VIEW_MODE, viewMode);

    analyticsApi.logEvent({
      action: POKEMON_VIEW_MODE_ACTION,
      category: USER_PREFERENCES,
      label: viewMode,
    });

    this.setState({
      viewMode,
    });
  }

  public getAvailableViewModes(): IButtonProps[] {
    const { pokemon } = this.props;
    const { viewMode } = this.state;

    return [
      {
        id: CHART,
        isActive: viewMode === CHART,
        label: getTranslation('pokemon-details-chart'),
        onClick: () => {
          this.toggleViewMode(CHART);
        },
        type: 'button',
      },
      {
        id: BARS,
        isActive: viewMode === BARS,
        label: getTranslation('pokemon-details-bars'),
        onClick: () => {
          this.toggleViewMode(BARS);
        },
        type: 'button',
      },
      {
        id: 'pokedex',
        label: getTranslation('header-calculator'),
        to: CALCULATOR.replace(':id?', pokemon ? pokemon.id : ''),
        type: 'button',
      },
    ];
  }

  public render() {
    const { pagination, pokemon } = this.props;
    const { viewMode } = this.state;

    if (pokemon) {
      const availableViewModes = this.getAvailableViewModes();

      return (
        <PokemonView
          availableViewModes={availableViewModes}
          pagination={pagination}
          pokemon={pokemon}
          viewMode={viewMode}
        />
      );
    }

    return <Redirect to={{ pathname: POKEDEX.replace(':id?', '') }} />;
  }
}

const mapStateToProps = (state: IRootState, ownProps: Props): IStateProps => {
  const selectedPokemon = getSelectedPokemon(state)(ownProps.id);
  const pokemon = selectedPokemon ? getRichPokemon(selectedPokemon) : undefined;

  const pagination = getPokemonPagination(state)(ownProps.id);

  return {
    pagination,
    pokemon,
  };
};

export default connect(mapStateToProps)(PokemonWrapper);
