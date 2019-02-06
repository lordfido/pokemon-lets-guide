import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getUiTranslation } from '../../utils/translations';

import HeaderItem from '../../shell/header/header-item';
import Field from '../forms/field';
import PokemonPreview from '../pokemon/pokemon-preview';

import { CALCULATOR, MOVES, POKEDEX } from '../../../constants/appRoutes';
import { getPokemonImage } from '../../../constants/pokemon/pokemon-images';
import { PokemonType } from '../../../constants/pokemon/pokemon-types';
import { getTypeIcon, getTypeWaterMarkStyles } from '../../../constants/pokemon/pokemon-types-icons';
import {
  FOOTER_SIZE_L,
  PADDING_L,
  PADDING_M,
  PADDING_XXL,
  PADDING_XXXL,
  WRAPPED_HEIGH,
} from '../../../constants/styles/styles';
import { FONT_XXL, TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { DESKTOP_L, HD_DISPLAY, MOBILE_L, TABLET_L } from '../../../constants/styles/styles-media-queries';
import { CONTENT } from '../../../constants/styles/styles-zindex';

import { ISheet } from '../../root.models';
import { GenericOutput, IDropdownOptions } from '../forms/form.models';
import { IPokemonWithBaseCP } from '../pokedex/pokedex.models';

const sheet: ISheet = {
  ctaContent: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: CONTENT,
  },
  ctaField: {
    textAlign: 'center',
  },
  ctaImage: {
    margin: PADDING_M,
    maxWidth: `calc(80% - ${PADDING_M * 2}px)`,
    paddingTop: 0,
    width: 'auto',

    [MOBILE_L]: {
      maxWidth: `calc(100% - ${PADDING_M * 2}px)`,
    },
  },
  ctaLabel: {
    color: TEXT_WHITE,
    fontSize: FONT_XXL,
    lineHeight: 1.3,
    marginBottom: PADDING_M,
  },
  ctaType: {
    opacity: 0.4,
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'translate(25%, -25%)',
    zIndex: CONTENT - 1,
  },
  ctaWrapper: {
    display: 'inline-block',
    flex: `1 0 100%`,
    minHeight: '100vh',
    overflowX: 'hidden',
    padding: PADDING_L,
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'top',
    width: '100%',

    [TABLET_L]: {
      flex: `1 0 50%`,
      padding: PADDING_XXL,
    },

    [DESKTOP_L]: {
      flex: `1 0 25%`,
      minHeight: `calc(100vh - ${FOOTER_SIZE_L}px)`,
    },

    [HD_DISPLAY]: {
      minHeight: WRAPPED_HEIGH - FOOTER_SIZE_L,
    },
  },
  ctas: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  navigation: {
    cursor: 'pointer',
    left: '50%',
    position: 'fixed',
    textAlign: 'center',
    zIndex: CONTENT,

    [DESKTOP_L]: {
      display: 'none',
    },

    '& img': {
      margin: '0 auto',
    },
  },
  navigationNext: {
    bottom: 0,
    transform: `rotate(90deg) translateX(35px) translateY(${PADDING_XXXL}px)`,
  },
  navigationPrev: {
    top: 0,
    transform: `rotate(-90deg) translateX(35px) translateY(${-PADDING_XXXL}px)`,
  },
  wrapper: {},
};

export interface ISection {
  backgroundColor: string;
  pokemon: IPokemonWithBaseCP;
  type: PokemonType;
}

interface IOwnProps {
  classes: { [key: string]: string };
  handleCalculate: (params: { id: string; value: GenericOutput }) => void;
  handleFindBestMoves: (params: { id: string; value: GenericOutput }) => void;
  handleHowToDefeatPokemon: (params: { id: string; value: GenericOutput }) => void;
  handleNavigateToPrevSection?: () => void;
  handleNavigateToNextSection?: () => void;
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
      handleNavigateToPrevSection,
      handleNavigateToNextSection,
      pokemonList,
      sections,
    } = this.props;

    const commonProps: IDropdownOptions = {
      id: '',
      menuPlacement: 'top',
      options: pokemonList.map(pokemon => ({
        id: pokemon.id,
        label: pokemon.name,
        value: pokemon.id,
      })),
      type: 'dropdown',
    };

    const howToDefeatPokemonField: IDropdownOptions = {
      ...commonProps,
      id: 'howToDefeatPokemon',
      label: getUiTranslation('landing-how-to-defeat'),
      onChange: handleHowToDefeatPokemon,
    };

    const bestMovesAgainstField: IDropdownOptions = {
      ...commonProps,
      id: 'bestMovesAgainst',
      label: getUiTranslation('landing-find-best-moves'),
      onChange: handleFindBestMoves,
    };

    const calculateField: IDropdownOptions = {
      ...commonProps,
      id: 'calculate',
      label: getUiTranslation('landing-calculate-cta'),
      onChange: handleCalculate,
    };

    return (
      <div className={classes.wrapper}>
        {handleNavigateToPrevSection && (
          <span
            className={classnames(classes.navigation, classes.navigationPrev)}
            onClick={() => handleNavigateToPrevSection()}
          >
            <img src={require('../../../assets/images/move-next-arrow.png')} />
          </span>
        )}

        <div className={classes.ctas}>
          {sections &&
            sections.map(({ backgroundColor, pokemon, type }, index: number) => {
              const styles = getTypeWaterMarkStyles(type);
              const doubledStyles = {
                height: 200,
                width: 200,
              };
              Object.keys(styles).forEach(key => {
                // @ts-ignore
                doubledStyles[key] = typeof styles[key] !== 'number' ? styles[key] : styles[key] * 2;

                if (key === 'width') {
                  // @ts-ignore
                  doubledStyles.height = styles[key] * 2;
                }
              });

              return (
                <div key={index} id={`landing-${index}`} className={classes.ctaWrapper} style={{ backgroundColor }}>
                  <div className={classes.ctaContent}>
                    {pokemon && (
                      <PokemonPreview className={classes.ctaImage} hard={true} src={getPokemonImage(pokemon)} />
                    )}

                    {index === 0 && (
                      <>
                        <p className={classes.ctaLabel}>{howToDefeatPokemonField.label}</p>
                        <HeaderItem
                          image={require('../../../assets/images/pokedex.png')}
                          text={getUiTranslation('header-pokedex')}
                          to={POKEDEX.replace(':id?', '')}
                        />
                        <Field
                          className={classes.ctaField}
                          options={{ ...howToDefeatPokemonField, label: undefined }}
                        />
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
                  <span
                    className={classes.ctaType}
                    style={{
                      // @ts-ignore
                      display: doubledStyles.display,
                      height: doubledStyles.height,
                      width: doubledStyles.width,
                    }}
                  >
                    <img style={{ width: doubledStyles.width }} src={getTypeIcon(type)} />
                  </span>
                </div>
              );
            })}
        </div>

        {handleNavigateToNextSection && (
          <span
            className={classnames(classes.navigation, classes.navigationNext)}
            onClick={() => handleNavigateToNextSection()}
          >
            <img src={require('../../../assets/images/move-next-arrow.png')} />
          </span>
        )}
      </div>
    );
  }
}

const LandingView = injectSheet(sheet)(UnstyledLandingView);

export default LandingView;
