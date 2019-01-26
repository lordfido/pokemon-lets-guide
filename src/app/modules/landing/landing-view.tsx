import * as React from 'react';
import injectSheet from 'react-jss';
import { getUiTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import Field from '../forms/field';

import { CALCULATOR, POKEDEX } from '../../../constants/appRoutes';
import { getPokemonImage } from '../../../constants/pokemon/pokemon-images';
import { HEADER_SIZE, PADDING_L, PADDING_M, PADDING_XXL } from '../../../constants/styles/styles';
import { DESKTOP_L, TABLET } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';
import { GenericOutput, IDropdownOptions } from '../forms/form.models';
import { IPokemonWithBaseCP } from '../pokedex/pokedex.models';
import PokemonPreview from '../pokemon/pokemon-preview';

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
    paddingTop: 0,
    width: '100%',
  },
  ctaLabel: {
    marginBottom: PADDING_M,
  },
  ctaWrapper: {
    display: 'inline-block',
    flex: `1 0 100%`,
    minHeight: `calc(100vh - ${HEADER_SIZE}px)`,
    padding: PADDING_L,
    textAlign: 'center',
    verticalAlign: 'top',
    width: '100%',

    [TABLET]: {
      flex: `1 0 50%`,
      padding: PADDING_XXL,
    },

    [DESKTOP_L]: {
      flex: `1 0 25%`,
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
  handleFindBestMoves: (params: { id: string; value: GenericOutput }) => void;
  handleHowToDefeatPokemon: (params: { id: string; value: GenericOutput }) => void;
  pokemonList: IPokemonWithBaseCP[];
  sections: ISection[];
}

class UnstyledLandingView extends React.Component<IOwnProps> {
  public render() {
    const { classes, handleFindBestMoves, handleHowToDefeatPokemon, pokemonList, sections } = this.props;

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

    const findBestPokemonField: IButtonProps = {
      id: 'bestPokemon',
      label: getUiTranslation('search-filters-apply'),
      to: POKEDEX.replace(':id?', ''),
      type: 'button',
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

    const calculateField: IButtonProps = {
      id: 'calculate',
      label: getUiTranslation('landing-calculate-cta'),
      to: CALCULATOR.replace(':id?', ''),
      type: 'button',
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
                      <Field className={classes.ctaField} options={{ ...howToDefeatPokemonField, label: undefined }} />
                    </>
                  )}

                  {index === 1 && (
                    <>
                      <p className={classes.ctaLabel}>{getUiTranslation('landing-find-best-pokemon')}</p>
                      <Field className={classes.ctaField} options={findBestPokemonField} />
                    </>
                  )}

                  {index === 2 && (
                    <>
                      <p className={classes.ctaLabel}>{bestMovesAgainstField.label}</p>
                      <Field className={classes.ctaField} options={{ ...bestMovesAgainstField, label: undefined }} />
                    </>
                  )}

                  {index === 3 && (
                    <>
                      <p className={classes.ctaLabel}>{getUiTranslation('landing-calculate')}</p>
                      <Field className={classes.ctaField} options={calculateField} />
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
