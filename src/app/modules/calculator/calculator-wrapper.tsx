import { Stats } from 'pokelab';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getRichPokemon, getStatRatio } from '../../utils/pokemon';

import CalculatorView from './calculator-view';

import { getRawPokedex, getSelectedPokemon } from '../../root.reducer';

import { CALCULATOR } from '../../../constants/appRoutes';
import { MAX_STAT_VALUE, StatId } from '../../../constants/pokemon-stats';

import { IRootState } from '../../root.models';
import { IOption } from '../forms/form.models';
import { IPokemonStats, IPokemonWithBaseCP, IRichPokemon } from '../pokedex/pokedex.models';

const defaultCandies = 0;
const defaultIVs = 16;
const defaultLevel = 50;
const defaultNature = 1.1;

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
  nature: number;
  redirectTo: string;
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
    nature: defaultNature,
    redirectTo: '',
  };

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.id !== this.props.id) {
      this.setState({
        redirectTo: '',
      });
    }
  }

  public handlePokemonSelect = (selectedOption: { id: string; value: IOption }) => {
    this.setState({
      redirectTo: CALCULATOR.replace(':id?', selectedOption.value.value),
    });
  };

  public handleLevelChange = (level: { id: string; value: string }) => {
    this.setState({
      level: parseInt(level.value, 10),
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

  public handleIVsChange = ({ stat, value }: { stat: StatId; value: string }) => {
    this.setState({
      ivs: {
        ...this.state.ivs,
        [stat]: parseInt(value, 10),
      },
    });
  };

  public render() {
    const { id, pokemon, pokemonList } = this.props;
    const { candies, ivs, level, nature, redirectTo } = this.state;
    const currentRoute = CALCULATOR.replace(':id?', id || '');

    if (redirectTo && redirectTo !== currentRoute) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }

    const stats = pokemon
      ? {
          attack: Stats.getStat({
            awakeningValue: candies.attack,
            baseStat: pokemon.baseStats.attack,
            individualValue: ivs.attack,
            level,
            nature,
            stat: Stats.Attack,
          }),
          defense: Stats.getStat({
            awakeningValue: candies.defense,
            baseStat: pokemon.baseStats.defense,
            individualValue: ivs.defense,
            level,
            nature,
            stat: Stats.Defense,
          }),
          hp: Stats.getStat({
            awakeningValue: candies.hp,
            baseStat: pokemon.baseStats.hp,
            individualValue: ivs.hp,
            level,
            stat: Stats.HP,
          }),
          spAttack: Stats.getStat({
            awakeningValue: candies.spAttack,
            baseStat: pokemon.baseStats.spAttack,
            individualValue: ivs.spAttack,
            level,
            nature,
            stat: Stats.SpecialAttack,
          }),
          spDefense: Stats.getStat({
            awakeningValue: candies.spDefense,
            baseStat: pokemon.baseStats.spDefense,
            individualValue: ivs.spDefense,
            level,
            nature,
            stat: Stats.SpecialDefense,
          }),
          speed: Stats.getStat({
            awakeningValue: candies.speed,
            baseStat: pokemon.baseStats.speed,
            individualValue: ivs.speed,
            level,
            nature,
            stat: Stats.Speed,
          }),
        }
      : undefined;

    return (
      <CalculatorView
        pokemonList={pokemonList}
        pokemon={pokemon}
        handlePokemonSelect={e => {
          this.handlePokemonSelect(e);
        }}
        level={level.toString()}
        handleLevelChange={e => {
          this.handleLevelChange(e);
        }}
        candies={candies}
        handleCandiesChange={e => {
          this.handleCandiesChange(e);
        }}
        ivs={ivs}
        handleIVsChange={e => {
          this.handleIVsChange(e);
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
