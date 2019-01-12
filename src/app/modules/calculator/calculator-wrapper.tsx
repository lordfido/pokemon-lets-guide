import { Stats } from 'pokelab';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import analyticsApi from '../../../common/apis/analytics';
import { getCookie, setCookie } from '../../../common/utils/cookies';
import { getRichPokemon, getStatRatio } from '../../utils/pokemon';
import { getTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import { BARS, CHART, ViewMode } from '../../components/stats-chart';
import CalculatorView from './calculator-view';

import { getRawPokedex, getSelectedPokemon } from '../../root.reducer';

import { CALCULATOR, POKEDEX } from '../../../constants/appRoutes';
import { CALCULATOR_VIEW_MODE } from '../../../constants/cookies';
import { CALCULATOR_VIEW_MODE as CALCULATOR_VIEW_MODE_ACTION } from '../../../constants/metrics/actions';
import { USER_PREFERENCES } from '../../../constants/metrics/categories';
import { MAX_CANDIES_VALUE } from '../../../constants/pokemon-candies';
import { MAX_IV_VALUE } from '../../../constants/pokemon-ivs';
import { PokemonNature } from '../../../constants/pokemon-natures';
import { findNature, getNatureModifier, INatureEffect } from '../../../constants/pokemon-natures-effects';
import {
  ATTACK_ID,
  DEFENSE_ID,
  MAX_STAT_VALUE,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
  StatId,
} from '../../../constants/pokemon-stats';

import { IRootState } from '../../root.models';
import { IPokemonStats, IPokemonWithBaseCP, IRichPokemon } from '../pokedex/pokedex.models';

const defaultCandies = 0;
const defaultIVs = 16;
const defaultLevel = 50;
const defaultNatureEffects = {
  increases: undefined,
  reduces: undefined,
};

const getStatsRatio = (stats: IPokemonStats, max: number) => ({
  attack: getStatRatio(stats.attack, max),
  defense: getStatRatio(stats.defense, max),
  hp: getStatRatio(stats.hp, max),
  spAttack: getStatRatio(stats.spAttack, max),
  spDefense: getStatRatio(stats.spDefense, max),
  speed: getStatRatio(stats.speed, max),
});

interface IOwnProps {
  id?: string;
}

interface IStateProps {
  pokemon?: IRichPokemon;
  pokemonList: IPokemonWithBaseCP[];
}

type Props = IOwnProps & IStateProps;

interface IOwnState {
  candies: IPokemonStats;
  ivs: IPokemonStats;
  level: number;
  nature?: PokemonNature;
  natureEffects: INatureEffect;
  reRender: boolean;
  redirectTo: string;
  viewMode: ViewMode;
}

class CalculatorWrapper extends React.Component<Props, IOwnState> {
  public state = {
    candies: {
      attack: defaultCandies,
      defense: defaultCandies,
      hp: defaultCandies,
      spAttack: defaultCandies,
      spDefense: defaultCandies,
      speed: defaultCandies,
    },
    ivs: {
      attack: defaultIVs,
      defense: defaultIVs,
      hp: defaultIVs,
      spAttack: defaultIVs,
      spDefense: defaultIVs,
      speed: defaultIVs,
    },
    level: defaultLevel,
    nature: undefined,
    natureEffects: defaultNatureEffects,
    reRender: false,
    redirectTo: '',
    viewMode: (getCookie(CALCULATOR_VIEW_MODE) as ViewMode) || CHART,
  };

  public componentDidUpdate(prevProps: Props, prevState: IOwnState) {
    if (prevProps.id !== this.props.id) {
      this.setState({
        redirectTo: '',
      });
    }

    if (prevState.reRender !== this.state.reRender && this.state.reRender) {
      this.setState({
        reRender: false,
      });
    }
  }

  public toggleViewMode(viewMode: ViewMode) {
    setCookie(CALCULATOR_VIEW_MODE, viewMode);

    analyticsApi.logEvent({
      action: CALCULATOR_VIEW_MODE_ACTION,
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
        label: getTranslation('header-pokedex'),
        to: POKEDEX.replace(':id?', pokemon ? pokemon.id : ''),
        type: 'button',
      },
    ];
  }

  public handlePokemonChange = (pokemon: { id: string; value: string }) => {
    this.setState({
      redirectTo: CALCULATOR.replace(':id?', pokemon.value),
    });
  };

  public handleLevelChange = (level: { id: string; value: string }) => {
    this.setState({
      level: parseInt(level.value, 10),
    });
  };

  public handleNatureChange = (natureEffects: { id: string; value?: StatId }) => {
    const nature = findNature({
      ...this.state.natureEffects,
      [natureEffects.id]: natureEffects.value,
    });

    this.setState({
      nature,
      natureEffects: {
        ...this.state.natureEffects,
        [natureEffects.id]: natureEffects.value,
      },
    });
  };

  public handleResetAll = () => {
    this.setState({
      candies: {
        attack: defaultCandies,
        defense: defaultCandies,
        hp: defaultCandies,
        spAttack: defaultCandies,
        spDefense: defaultCandies,
        speed: defaultCandies,
      },
      ivs: {
        attack: defaultIVs,
        defense: defaultIVs,
        hp: defaultIVs,
        spAttack: defaultIVs,
        spDefense: defaultIVs,
        speed: defaultIVs,
      },
      level: defaultLevel,
      nature: undefined,
      natureEffects: {
        increases: undefined,
        reduces: undefined,
      },
      reRender: true,
    });
  };

  public handleModifyAll = (isMax?: boolean) => {
    this.setState({
      candies: {
        attack: isMax ? MAX_CANDIES_VALUE : 0,
        defense: isMax ? MAX_CANDIES_VALUE : 0,
        hp: isMax ? MAX_CANDIES_VALUE : 0,
        spAttack: isMax ? MAX_CANDIES_VALUE : 0,
        spDefense: isMax ? MAX_CANDIES_VALUE : 0,
        speed: isMax ? MAX_CANDIES_VALUE : 0,
      },
      ivs: {
        attack: isMax ? MAX_IV_VALUE : 0,
        defense: isMax ? MAX_IV_VALUE : 0,
        hp: isMax ? MAX_IV_VALUE : 0,
        spAttack: isMax ? MAX_IV_VALUE : 0,
        spDefense: isMax ? MAX_IV_VALUE : 0,
        speed: isMax ? MAX_IV_VALUE : 0,
      },
      level: isMax ? 100 : 1,
      reRender: true,
    });
  };

  public handleIVsChange = ({ stat, value }: { stat: StatId; value: string }) => {
    this.setState({
      ivs: {
        ...this.state.ivs,
        [stat]: parseInt(value, 10),
      },
    });
  };

  public handleCandiesChange = ({ stat, value }: { stat: StatId; value: string }) => {
    this.setState({
      candies: {
        ...this.state.candies,
        [stat]: parseInt(value, 10),
      },
    });
  };

  public render() {
    const { id, pokemon, pokemonList } = this.props;
    const { candies, ivs, level, nature, natureEffects, reRender, redirectTo, viewMode } = this.state;
    const currentRoute = CALCULATOR.replace(':id?', id || '');

    if (reRender) {
      return null;
    }

    if (redirectTo && redirectTo !== currentRoute) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }

    const stats = pokemon
      ? {
          hp: Stats.getStat({
            awakeningValue: candies.hp,
            baseStat: pokemon.baseStats.hp,
            individualValue: ivs.hp,
            level,
            stat: Stats.HP,
          }),
          // tslint:disable-next-line:object-literal-sort-keys
          attack: Stats.getStat({
            awakeningValue: candies.attack,
            baseStat: pokemon.baseStats.attack,
            individualValue: ivs.attack,
            level,
            nature: getNatureModifier(ATTACK_ID, natureEffects),
            stat: Stats.Attack,
          }),
          defense: Stats.getStat({
            awakeningValue: candies.defense,
            baseStat: pokemon.baseStats.defense,
            individualValue: ivs.defense,
            level,
            nature: getNatureModifier(DEFENSE_ID, natureEffects),
            stat: Stats.Defense,
          }),
          speed: Stats.getStat({
            awakeningValue: candies.speed,
            baseStat: pokemon.baseStats.speed,
            individualValue: ivs.speed,
            level,
            nature: getNatureModifier(SPEED_ID, natureEffects),
            stat: Stats.Speed,
          }),
          spDefense: Stats.getStat({
            awakeningValue: candies.spDefense,
            baseStat: pokemon.baseStats.spDefense,
            individualValue: ivs.spDefense,
            level,
            nature: getNatureModifier(SPECIAL_DEFENSE_ID, natureEffects),
            stat: Stats.SpecialDefense,
          }),
          spAttack: Stats.getStat({
            awakeningValue: candies.spAttack,
            baseStat: pokemon.baseStats.spAttack,
            individualValue: ivs.spAttack,
            level,
            nature: getNatureModifier(SPECIAL_ATTACK_ID, natureEffects),
            stat: Stats.SpecialAttack,
          }),
        }
      : undefined;

    const availableViewModes = this.getAvailableViewModes();

    return (
      <CalculatorView
        availableViewModes={availableViewModes}
        viewMode={viewMode}
        pokemonList={pokemonList}
        pokemon={pokemon}
        handlePokemonChange={e => {
          this.handlePokemonChange(e);
        }}
        level={level.toString()}
        handleLevelChange={e => {
          this.handleLevelChange(e);
        }}
        nature={nature}
        natureEffects={natureEffects}
        handleNatureChange={e => {
          this.handleNatureChange(e);
        }}
        handleResetAll={() => {
          this.handleResetAll();
        }}
        handleModifyAll={e => {
          this.handleModifyAll(e);
        }}
        ivs={ivs}
        handleIVsChange={e => {
          this.handleIVsChange(e);
        }}
        candies={candies}
        handleCandiesChange={e => {
          this.handleCandiesChange(e);
        }}
        stats={stats ? getStatsRatio(stats, MAX_STAT_VALUE) : undefined}
      />
    );
  }
}

const mapStateToProps = (state: IRootState, { id }: Props) => {
  const selectedPokemon = id ? getSelectedPokemon(state)(id) : undefined;
  const pokemonList = getRawPokedex(state);

  return {
    pokemon: selectedPokemon ? getRichPokemon(selectedPokemon) : undefined,
    pokemonList,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorWrapper);
