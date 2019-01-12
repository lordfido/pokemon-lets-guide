import * as React from 'react';
import injectSheet from 'react-jss';
import { getRandomNumber } from '../../utils/numbers';
import { getAvatarFromId } from '../../utils/pokemon';
import { getTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import Sidebar, { SIDEBAR_SIZE } from '../../components/sidebar';
import { ViewMode } from '../../components/stats-chart';
import Field from '../forms/field';
import PokemonPreview from '../pokemon/pokemon-preview';
import CalculatorCustomizations from './calculator-customizations';
import CalculatorResult from './calculator-result';

import { PokemonNature } from '../../../constants/pokemon-natures';
import { INatureEffect } from '../../../constants/pokemon-natures-effects';
import { StatId } from '../../../constants/pokemon-stats';
import { PADDING_XL } from '../../../constants/styles';
import { POKEDEX_BACKGROUND } from '../../../constants/styles-colors';
import { TEXT_BLACK, TEXT_WHITE } from '../../../constants/styles-fonts';
import { DESKTOP_L } from '../../../constants/styles-media-queries';

import { ISheet } from '../../root.models';
import { IDropdownOptions, IOption } from '../forms/form.models';
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
    paddingBottom: PADDING_XL,
    width: '100%',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  availableViewModes: IButtonProps[];
  viewMode: ViewMode;
  pokemonList: IPokemonWithBaseCP[];
  handlePokemonChange: (pokemon: { id: string; value: string }) => void;
  pokemon?: IRichPokemon;
  level: number;
  handleLevelChange: (level: { id: string; value: string }) => void;
  nature?: PokemonNature;
  natureEffects: INatureEffect;
  handleNatureChange: (nature: { id: string; value?: StatId }) => void;
  happiness: number;
  handleHappinessChange: (happiness: { id: string; value: string }) => void;
  handleResetAll: () => void;
  handleModifyAll: (isMax?: boolean) => void;
  ivs: IPokemonStats;
  handleIVsChange: (event: { stat: StatId; value: string }) => void;
  candies: IPokemonStats;
  handleCandiesChange: (event: { stat: StatId; value: string }) => void;
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

  // Pokemon
  const handlePokemonChangeProxy = (option: { id: string; value: IOption }) => {
    handlePokemonChange({ id: option.id, value: option.value.value });
  };

  const pokemonField: IDropdownOptions = {
    defaultValue: pokemon ? [pokemon.id] : undefined,
    id: 'pokemon',
    label: getTranslation('calculator-select-pokemon'),
    onChange: handlePokemonChangeProxy,
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
            <h4>{getTranslation('calculator-empty-case')}</h4>
            <div className={classes.emptyCaseImage}>
              {defaultPokemon && <PokemonPreview src={getAvatarFromId(defaultPokemon.id)} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CalculatorView = injectSheet(sheet)(unstyledCalculatorView);

export default CalculatorView;
