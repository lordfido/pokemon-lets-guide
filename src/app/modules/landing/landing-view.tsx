import * as React from 'react';
import injectSheet from 'react-jss';
import { getUiTranslation } from '../../utils/translations';

import HeaderItem from '../../shell/header/header-item';
import Field from '../forms/field';

import { CALCULATOR, MOVES, POKEDEX } from '../../../constants/appRoutes';
import { getPokemonImage } from '../../../constants/pokemon/pokemon-images';
import {
  FOOTER_SIZE,
  FOOTER_SIZE_L,
  HEADER_SIZE,
  PADDING_L,
  PADDING_M,
  PADDING_XXL,
  WRAPPED_HEIGH,
} from '../../../constants/styles/styles';
import { DESKTOP_L, HD_DISPLAY, TABLET_L, TABLET_OR_LANDSCAPE } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';
import { GenericOutput, IDropdownOptions } from '../forms/form.models';
import { IPokemonWithBaseCP } from '../pokedex/pokedex.models';
import PokemonPreview from '../pokemon/pokemon-preview';
import { TEXT_WHITE, FONT_XXL } from '../../../constants/styles/styles-fonts';

const sheet: ISheet = {
  ctaContent: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  ctaField: {
    textAlign: 'center',
  },
  ctaImage: {
    margin: PADDING_M,
    maxWidth: `calc(100% - ${PADDING_M * 2}px)`,
    paddingTop: 0,
    width: 'auto',
  },
  ctaLabel: {
    color: TEXT_WHITE,
    fontSize: FONT_XXL,
    marginBottom: PADDING_M,
  },
  ctaWrapper: {
    display: 'inline-block',
    flex: `1 0 100%`,
    minHeight: `calc(100vh - ${HEADER_SIZE}px - ${FOOTER_SIZE}px)`,
    padding: PADDING_L,
    textAlign: 'center',
    verticalAlign: 'top',
    width: '100%',

    [TABLET_OR_LANDSCAPE]: {
      minHeight: `calc(100vh - ${HEADER_SIZE}px - ${FOOTER_SIZE_L}px)`,
    },

    [TABLET_L]: {
      flex: `1 0 50%`,
      padding: PADDING_XXL,
    },

    [DESKTOP_L]: {
      flex: `1 0 25%`,
    },

    [HD_DISPLAY]: {
      minHeight: WRAPPED_HEIGH - HEADER_SIZE - FOOTER_SIZE_L,
    },
  },
  ctas: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  wrapper: {},
};

export interface ISection {
  backgroundColor: string;
  pokemon: IPokemonWithBaseCP;
}

interface IOwnProps {
  classes: { [key: string]: string };
  handleCalculate: (params: { id: string; value: GenericOutput }) => void;
  handleFindBestMoves: (params: { id: string; value: GenericOutput }) => void;
  handleHowToDefeatPokemon: (params: { id: string; value: GenericOutput }) => void;
  pokemonList: IPokemonWithBaseCP[];
  sections: ISection[];
}

class UnstyledLandingView extends React.Component<IOwnProps> {
  public render() {
    const {
      classes,
      handleCalculate,
      handleFindBestMoves,
      handleHowToDefeatPokemon,
      pokemonList,
      sections,
    } = this.props;

    const howToDefeatPokemonField: IDropdownOptions = {
      id: 'howToDefeatPokemon',
      label: getUiTranslation('landing-how-to-defeat'),
      onChange: handleHowToDefeatPokemon,
      options: pokemonList.map(pokemon => ({
        id: pokemon.id,
        label: pokemon.name,
        value: pokemon.id,
      })),
      type: 'dropdown',
    };

    const bestMovesAgainstField: IDropdownOptions = {
      id: 'bestMovesAgainst',
      label: getUiTranslation('landing-find-best-moves'),
      onChange: handleFindBestMoves,
      options: pokemonList.map(pokemon => ({
        id: pokemon.id,
        label: pokemon.name,
        value: pokemon.id,
      })),
      type: 'dropdown',
    };

    const calculateField: IDropdownOptions = {
      id: 'calculate',
      label: getUiTranslation('landing-calculate-cta'),
      onChange: handleCalculate,
      options: pokemonList.map(pokemon => ({
        id: pokemon.id,
        label: pokemon.name,
        value: pokemon.id,
      })),
      type: 'dropdown',
    };

    return (
      <div className={classes.wrapper}>
        <div className={classes.ctas}>
          {sections &&
            sections.map(({ backgroundColor, pokemon }, index: number) => (
              <div key={index} className={classes.ctaWrapper} style={{ backgroundColor }}>
                <div className={classes.ctaContent}>
                  {pokemon && <PokemonPreview className={classes.ctaImage} src={getPokemonImage(pokemon)} />}

                  {index === 0 && (
                    <>
                      <p className={classes.ctaLabel}>{howToDefeatPokemonField.label}</p>
                      <HeaderItem
                        image={require('../../../assets/images/pokedex.png')}
                        text={getUiTranslation('header-pokedex')}
                        to={POKEDEX.replace(':id?', '')}
                      />
                      <Field className={classes.ctaField} options={{ ...howToDefeatPokemonField, label: undefined }} />
                    </>
                  )}

                  {index === 1 && (
                    <>
                      <p className={classes.ctaLabel}>{bestMovesAgainstField.label}</p>
                      <HeaderItem
                        image={require('../../../assets/images/moves.png')}
                        text={getUiTranslation('header-moves')}
                        to={MOVES.replace(':id?', '')}
                      />
                      <Field className={classes.ctaField} options={{ ...bestMovesAgainstField, label: undefined }} />
                    </>
                  )}

                  {index === 2 && (
                    <>
                      <p className={classes.ctaLabel}>{getUiTranslation('landing-calculate')}</p>
                      <HeaderItem
                        image={require('../../../assets/images/calculator.png')}
                        text={getUiTranslation('header-calculator')}
                        to={CALCULATOR.replace(':id?', '')}
                      />
                      <Field className={classes.ctaField} options={{ ...calculateField, label: undefined }} />
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const LandingView = injectSheet(sheet)(UnstyledLandingView);

export default LandingView;
