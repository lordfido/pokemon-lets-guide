import * as React from 'react';
import { connect } from 'react-redux';
import { log } from '../../../common/utils/logger';
import { getRandomNumber } from '../../utils/numbers';

import LandingView, { ISection } from './landing-view';

import { getTypes, getPokemonOfType } from '../../../constants/pokemon/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';

import { IRootState } from '../../root.models';
import { getPokedex, getRawPokedex } from '../../root.reducer';
import { GenericOutput, IOption } from '../forms/form.models';
import { IPokemonWithBaseCP } from '../pokedex/pokedex.models';

const availableTypes = getTypes();

interface IStateProps {
  pokemonList: IPokemonWithBaseCP[];
  rawPokedex: IPokemonWithBaseCP[];
}

interface IOwnState {
  randomTypes: number[];
  redirectTo?: string;
  sections: ISection[];
}

class LandingWrapper extends React.Component<IStateProps, IOwnState> {
  public state = {
    randomTypes: [],
    redirectTo: undefined,
    sections: [] as ISection[],
  };

  public componentDidMount() {
    const randomTypes: [number, number, number, number] = [
      getRandomNumber(0, availableTypes.length - 1),
      getRandomNumber(0, availableTypes.length - 1),
      getRandomNumber(0, availableTypes.length - 1),
      getRandomNumber(0, availableTypes.length - 1),
    ];

    this.setState({ randomTypes });
  }

  public componentDidUpdate(prevProps: IStateProps) {
    const { rawPokedex } = this.props;
    const { randomTypes, sections } = this.state;

    if (rawPokedex.length && (!sections.length || prevProps.rawPokedex.length !== rawPokedex.length)) {
      const newSections = randomTypes.map(typeIndex => {
        const selectedType = availableTypes[typeIndex];
        const backgroundColor = getTypeColor(selectedType.id);
        const availablePokemon = getPokemonOfType(selectedType.id, rawPokedex);
        const pokemon = availablePokemon[getRandomNumber(0, availablePokemon.length - 1)];

        return {
          backgroundColor,
          pokemon,
        };
      }) as [ISection, ISection, ISection, ISection];

      this.setState({ sections: newSections });
    }
  }

  public handleFindBestMoves = (params: { id: string; value: GenericOutput }) => {
    const pokemon = params.value as IOption;

    log(`Searching best moves against <${pokemon.value}|${pokemon.label}>`);
  };

  public handleHowToDefeatPokemon = (params: { id: string; value: GenericOutput }) => {
    const pokemon = params.value as IOption;

    log(`Calculating how to defeat <${pokemon.value}|${pokemon.label}>`);
  };

  public render() {
    const { pokemonList } = this.props;
    const { sections } = this.state;

    return (
      <LandingView
        handleFindBestMoves={e => {
          this.handleFindBestMoves(e);
        }}
        handleHowToDefeatPokemon={e => {
          this.handleHowToDefeatPokemon(e);
        }}
        pokemonList={pokemonList}
        sections={sections}
      />
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  const pokemonList = getPokedex(state);
  const rawPokedex = getRawPokedex(state);

  return {
    pokemonList,
    rawPokedex,
  };
};

export default connect(mapStateToProps)(LandingWrapper);
