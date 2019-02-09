import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { areSimilarColors } from '../../utils/colors';
import { getRandomNumber } from '../../utils/numbers';
import { filtersToString } from '../../utils/urls';

import LandingView, { ISection } from './landing-view';

import { CALCULATOR, MOVES_SEARCH, POKEDEX_SEARCH } from '../../../constants/appRoutes';
import { getPokemonOfType, getTypes, PokemonType } from '../../../constants/pokemon/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';
import { HEADER_SIZE } from '../../../constants/styles/styles';
import getQuery, { TABLET_L } from '../../../constants/styles/styles-media-queries';

import { IRootState } from '../../root.models';
import { getPokedex, getRawPokedex } from '../../root.reducer';
import { GenericOutput, IOption } from '../forms/form.models';
import { IMovesFilters, movesInitialState } from '../moves/moves.models';
import { IPokedexFilters, IPokemonWithBaseCP, pokedexInitialState } from '../pokedex/pokedex.models';

let scrollElement: HTMLElement;
const availableTypes = getTypes();

interface IStateProps {
  pokemonList: IPokemonWithBaseCP[];
  rawPokedex: IPokemonWithBaseCP[];
}

interface IOwnState {
  currentSection: number;
  randomTypes: number[];
  redirectTo?: string;
  sections: ISection[];
}

class LandingWrapper extends React.Component<IStateProps, IOwnState> {
  public state = {
    currentSection: 0,
    randomTypes: [],
    redirectTo: undefined,
    sections: [] as ISection[],
  };

  public scrollTimeout: NodeJS.Timeout = setTimeout(() => ({}), 0);

  public componentDidMount() {
    const randomTypes: number[] = [];

    for (let x = 0; x < 3; x++) {
      const generateRandomIndex = () => {
        const newTypeIndex = getRandomNumber(0, availableTypes.length - 1);
        const type = availableTypes[newTypeIndex].id;
        const isAnySimilarColor = randomTypes
          .map(t => getTypeColor(availableTypes[t].id))
          .findIndex(c => areSimilarColors(c, getTypeColor(type), 100));

        if (isAnySimilarColor >= 0) {
          generateRandomIndex();
        } else {
          randomTypes.push(newTypeIndex);
        }
      };

      generateRandomIndex();
    }

    this.setState({ randomTypes });

    scrollElement = document.querySelector('#app > div') as HTMLElement;
    scrollElement.addEventListener('scroll', this.handleScroll);
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
          type: selectedType.id,
        };
      }) as [ISection, ISection, ISection, ISection];

      this.setState({ sections: newSections });
    }
  }

  public componentWillUnmount() {
    scrollElement.removeEventListener('scroll', this.handleScroll);
  }

  public handleScroll = (e: Event) => {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      const {
        // @ts-ignore
        target: { scrollTop },
      } = e;

      const media = getQuery(TABLET_L);
      const matchMedia = window.matchMedia(media);
      const sectionScrollTop = window.innerHeight - HEADER_SIZE;
      let currentSection = 0;

      if (matchMedia.matches) {
        const rounded = Math.round((scrollTop / sectionScrollTop) * 2);
        if (rounded > 1) {
          currentSection = 2;
        } else {
          currentSection = 0;
        }
      } else {
        currentSection = Math.round(scrollTop / sectionScrollTop);
      }

      this.setState({ currentSection });
    }, 200);
  };

  public handleCalculate = (params: { id: string; value: GenericOutput }) => {
    const pokemon = params.value as IOption;

    this.setState({
      redirectTo: CALCULATOR.replace(':id?', pokemon.value),
    });
  };

  public handleFindBestMoves = (params: { id: string; value: GenericOutput }) => {
    const { rawPokedex } = this.props;
    const pokemon = params.value as IOption;

    const rival = rawPokedex.find(p => p.id === pokemon.id);

    const strongAgainst = rival ? (rival.types.ownTypes as PokemonType[]) : ([] as PokemonType[]);

    const filters: IMovesFilters = {
      ...movesInitialState.filters,
      strongAgainst,
    };

    this.setState({
      redirectTo: MOVES_SEARCH.replace(':query', filtersToString(filters)),
    });
  };

  public handleHowToDefeatPokemon = (params: { id: string; value: GenericOutput }) => {
    const { rawPokedex } = this.props;
    const pokemon = params.value as IOption;

    const rival = rawPokedex.find(p => p.id === pokemon.id);

    const strongAgainst = rival ? (rival.types.ownTypes as PokemonType[]) : ([] as PokemonType[]);

    const filters: IPokedexFilters = {
      ...pokedexInitialState.filters,
      strongAgainst,
    };

    this.setState({
      redirectTo: POKEDEX_SEARCH.replace(':query', filtersToString(filters)),
    });
  };

  public handleNavigateToPrevSection = () => {
    const { currentSection } = this.state;

    const elem = scrollElement;
    const media = getQuery(TABLET_L);
    const matchMedia = window.matchMedia(media);
    const sectionToScroll = matchMedia.matches ? currentSection - 2 : currentSection - 1;

    if (elem) {
      const target = document.querySelector(`#landing-${sectionToScroll}`);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  };

  public handleNavigateToNextSection = () => {
    const { currentSection } = this.state;

    const elem = scrollElement;
    const media = getQuery(TABLET_L);
    const matchMedia = window.matchMedia(media);
    const sectionToScroll = matchMedia.matches ? currentSection + 2 : currentSection + 1;

    if (elem) {
      const target = document.querySelector(`#landing-${sectionToScroll}`);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  };

  public render() {
    const { rawPokedex } = this.props;
    const { currentSection, redirectTo, sections } = this.state;

    if (redirectTo) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }

    return (
      <LandingView
        handleCalculate={e => {
          this.handleCalculate(e);
        }}
        handleFindBestMoves={e => {
          this.handleFindBestMoves(e);
        }}
        handleHowToDefeatPokemon={e => {
          this.handleHowToDefeatPokemon(e);
        }}
        handleNavigateToPrevSection={
          currentSection > 0
            ? () => {
                this.handleNavigateToPrevSection();
              }
            : undefined
        }
        handleNavigateToNextSection={
          currentSection < 2
            ? () => {
                this.handleNavigateToNextSection();
              }
            : undefined
        }
        pokemonList={rawPokedex}
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
