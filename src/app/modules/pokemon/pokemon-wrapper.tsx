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
import { IPokemon, IPokemonPagination, IRichPokemon, pokedexInitialState } from '../pokedex/pokedex.models';

import { CALCULATOR, MOVES_SEARCH, POKEDEX } from '../../../constants/appRoutes';
import { POKEMON_VIEW_MODE } from '../../../constants/cookies';
import { POKEMON_VIEW_MODE as POKEMON_VIEW_MODE_ACTION } from '../../../constants/metrics/actions';
import { USER_PREFERENCES } from '../../../constants/metrics/categories';
import { BARS, CHART, ViewMode } from '../../components/stats-chart';
import { getUiTranslation } from '../../utils/translations';
import { filtersToString } from '../../utils/urls';

const getPokemonUrl = (pokemon: IPokemon) => POKEDEX.replace(':id?', pokemon.id);

interface IOwnProps {
  id: string;
}

interface IStateProps {
  pokemon?: IRichPokemon;
  pagination: IPokemonPagination;
}

type Props = IOwnProps & IStateProps;

interface IOwnState {
  redirectTo?: string;
  viewMode: ViewMode;
}

class PokemonWrapper extends React.Component<Props, IOwnState> {
  public state = {
    redirectTo: undefined,
    viewMode: (getCookie(POKEMON_VIEW_MODE) as ViewMode) || CHART,
  };

  public componentDidMount() {
    document.addEventListener('keyup', this.handleKeyPress);
  }

  public componentDidUpdate() {
    if (this.state.redirectTo) {
      this.setState({
        redirectTo: '',
      });
    }
  }

  public componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  public handleKeyPress = (event: KeyboardEvent) => {
    const { pagination } = this.props;
    const { keyCode } = event;

    event.preventDefault();
    let redirectTo = '';

    switch (keyCode) {
      case 37: // left
      case 38: // up
        redirectTo = getPokemonUrl(pagination.prev);
        break;

      case 39: // right
      case 40: // down
        redirectTo = getPokemonUrl(pagination.next);
        break;

      default:
    }

    if (redirectTo) {
      this.setState({
        redirectTo,
      });
    }
  };

  public toggleViewMode = (viewMode: ViewMode) => {
    setCookie(POKEMON_VIEW_MODE, viewMode);

    analyticsApi.logEvent({
      action: POKEMON_VIEW_MODE_ACTION,
      category: USER_PREFERENCES,
      label: viewMode,
    });

    this.setState({
      viewMode,
    });
  };

  public getAvailableViewModes = (): IButtonProps[] => {
    const { pokemon } = this.props;
    const { viewMode } = this.state;

    return [
      {
        id: CHART,
        isActive: viewMode === CHART,
        label: getUiTranslation('pokemon-chart'),
        onClick: () => {
          this.toggleViewMode(CHART);
        },
        type: 'button',
      },
      {
        id: BARS,
        isActive: viewMode === BARS,
        label: getUiTranslation('pokemon-bars'),
        onClick: () => {
          this.toggleViewMode(BARS);
        },
        type: 'button',
      },
      {
        id: 'calculator',
        label: getUiTranslation('header-calculator'),
        to: CALCULATOR.replace(':id?', pokemon ? pokemon.id : ''),
        type: 'button',
      },
      {
        id: 'moves',
        label: getUiTranslation('header-moves'),
        to: MOVES_SEARCH.replace(
          ':query',
          pokemon ? filtersToString({ ...pokedexInitialState.filters, canBeLearntBy: [pokemon.id] }) : ''
        ),
        type: 'button',
      },
    ];
  };

  public render() {
    const { pagination, pokemon } = this.props;
    const { redirectTo, viewMode } = this.state;

    if (redirectTo) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }

    if (!pokemon) {
      return <Redirect to={{ pathname: POKEDEX.replace(':id?', '') }} />;
    }

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
