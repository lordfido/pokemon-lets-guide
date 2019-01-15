import * as React from 'react';
import injectSheet from 'react-jss';
import { getRandomNumber } from '../../utils/numbers';
import { getUiTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import Sidebar, { SIDEBAR_SIZE } from '../../components/sidebar';
import { ViewMode } from '../../components/stats-chart';
import Field from '../forms/field';
import PokemonPreview from '../pokemon/pokemon-preview';
import CalculatorCustomizations from './calculator-customizations';
import CalculatorResult from './calculator-result';

import { getPokemonImage } from '../../../constants/pokemon/pokemon-images';
import { PokemonNature } from '../../../constants/pokemon/pokemon-natures';
import { INatureEffect } from '../../../constants/pokemon/pokemon-natures-effects';
import { FOOTER_SIZE, FOOTER_SIZE_L, HEADER_SIZE, PADDING_XL } from '../../../constants/styles/styles';
import { POKEDEX_BACKGROUND } from '../../../constants/styles/styles-colors';
import { TEXT_BLACK, TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { DESKTOP_L, HD_DISPLAY, TABLET_OR_LANDSCAPE } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';
import { IDropdownOptions, IFieldOutput } from '../forms/form.models';
import { IPokemonStats, IPokemonWithBaseCP, IRichPokemon } from '../pokedex/pokedex.models';

const sheet: ISheet = {
  emptyCase: {
    textAlign: 'center',
  },
  emptyCaseImage: {
    opacity: 0.3,
  },
  result: {
    display: 'inline-block',
    paddingBottom: PADDING_XL,
    verticalAlign: 'top',
    width: '100%',

    [DESKTOP_L]: {
      width: `calc(100% - ${SIDEBAR_SIZE}px)`,
    },
  },
  sidebarWrapper: {
    color: TEXT_BLACK,
    display: 'inline-block',

    [DESKTOP_L]: {
      color: TEXT_WHITE,
    },
  },
  wrapper: {
    backgroundColor: POKEDEX_BACKGROUND,
    color: TEXT_WHITE,
    minHeight: `calc(100vh - ${HEADER_SIZE}px - ${FOOTER_SIZE}px)`,
    width: '100%',

    [TABLET_OR_LANDSCAPE]: {
      minHeight: `calc(100vh - ${HEADER_SIZE}px - ${FOOTER_SIZE_L}px)`,
    },

    [HD_DISPLAY]: {
      minHeight: 0,
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  availableViewModes: IButtonProps[];
  viewMode: ViewMode;
  pokemonList: IPokemonWithBaseCP[];
  handlePokemonChange: (field: IFieldOutput) => void;
  pokemon?: IRichPokemon;
  level: number;
  handleLevelChange: (field: IFieldOutput) => void;
  nature?: PokemonNature;
  natureEffects: INatureEffect;
  handleNatureChange: (field: IFieldOutput) => void;
  happiness: number;
  handleHappinessChange: (field: IFieldOutput) => void;
  handleResetAll: () => void;
  handleModifyAll: (isMax?: boolean) => void;
  ivs: IPokemonStats;
  handleIVsChange: (field: IFieldOutput) => void;
  candies: IPokemonStats;
  handleCandiesChange: (field: IFieldOutput) => void;
  stats?: IPokemonStats;
}

const unstyledCalculatorView = ({
  classes,
  availableViewModes,
  viewMode,
  pokemonList,
  pokemon,
  handlePokemonChange,
  level,
  handleLevelChange,
  nature,
  natureEffects,
  handleNatureChange,
  happiness,
  handleHappinessChange,
  handleResetAll,
  handleModifyAll,
  ivs,
  handleIVsChange,
  candies,
  handleCandiesChange,
  stats,
}: IOwnProps) => {
  const randomPokemon = getRandomNumber(0, pokemonList.length - 1);
  const defaultPokemon = pokemonList ? pokemonList[randomPokemon] : undefined;

  const pokemonField: IDropdownOptions = {
    defaultValue: pokemon ? [pokemon.id] : undefined,
    id: 'pokemon',
    label: getUiTranslation('calculator-select-pokemon'),
    onChange: handlePokemonChange,
    options: pokemonList.map(({ id, name }) => ({ id, label: name, value: id })),
    placeholder: defaultPokemon ? defaultPokemon.name : undefined,
    type: 'dropdown',
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.sidebarWrapper}>
        <Sidebar
          render={() => (
            <form noValidate>
              <Field options={pokemonField} />
            </form>
          )}
        />
      </div>

      <div className={classes.result}>
        {pokemon && stats && (
          <>
            <CalculatorCustomizations
              level={level}
              handleLevelChange={handleLevelChange}
              natureEffects={natureEffects}
              handleNatureChange={handleNatureChange}
              happiness={happiness}
              handleHappinessChange={handleHappinessChange}
              handleResetAll={handleResetAll}
              handleModifyAll={handleModifyAll}
              ivs={ivs}
              handleIVsChange={handleIVsChange}
              candies={candies}
              handleCandiesChange={handleCandiesChange}
            />

            <PokemonPreview src={pokemon.avatar} />

            <CalculatorResult
              availableViewModes={availableViewModes}
              viewMode={viewMode}
              nature={nature}
              pokemon={pokemon}
              stats={stats}
            />
          </>
        )}

        {!pokemon && (
          <div className={classes.emptyCase}>
            <h4>{getUiTranslation('calculator-empty-case')}</h4>
            <div className={classes.emptyCaseImage}>
              {defaultPokemon && <PokemonPreview src={getPokemonImage (defaultPokemon)} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CalculatorView = injectSheet(sheet)(unstyledCalculatorView);

export default CalculatorView;
