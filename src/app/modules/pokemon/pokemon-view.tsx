import * as React from 'react';
import injectSheet from 'react-jss';
import { getSuggestedIVs } from '../../utils/pokemon';
import { getUiTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import StatsChart, { ViewMode } from '../../components/stats-chart';
import PokemonInfo from './pokemon-info';
import PokemonPagination from './pokemon-pagination';
import PokemonPokedexEntry from './pokemon-pokedex-entry';
import PokemonPreview from './pokemon-preview';
import PokemonStats from './pokemon-stats';

import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';
import { FOOTER_SIZE, FOOTER_SIZE_L, HEADER_SIZE, PADDING_XL } from '../../../constants/styles/styles';
import { POKEDEX_BACKGROUND } from '../../../constants/styles/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { HD_DISPLAY, TABLET_OR_LANDSCAPE } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';
import { IPokemonDetailPagination, IRichPokemon } from '../pokedex/pokedex.models';

const sheet: ISheet = {
  wrapper: {
    backgroundColor: POKEDEX_BACKGROUND,
    color: TEXT_WHITE,
    minHeight: `calc(100vh - ${HEADER_SIZE}px - ${FOOTER_SIZE}px)`,
    paddingBottom: PADDING_XL,
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
  availableViewModes: IButtonProps[];
  classes: { [key: string]: string };
  pagination: IPokemonDetailPagination;
  pokemon: IRichPokemon;
  viewMode: ViewMode;
}

const unstyledPokemonView = ({ availableViewModes, classes, pagination, pokemon, viewMode }: IOwnProps) => {
  const renderSuggestedStats = () => {
    const suggestedIVs = getSuggestedIVs(pokemon.baseStats);

    return suggestedIVs.map((suggestion, index) => (
      <>
        <p>{getUiTranslation('pokemon-recommended', (index + 1).toString())}</p>
        <StatsChart stats={suggestion} viewMode={viewMode} color={getTypeColor(pokemon.types.ownTypes[0])} />
      </>
    ));
  };

  return (
    <div className={classes.wrapper}>
      <PokemonInfo pokemon={pokemon} />
      <PokemonPreview src={pokemon.avatar} alt={getUiTranslation('pokemon-preview', pokemon.name)} />
      <PokemonStats pokemon={pokemon} availableViewModes={availableViewModes} viewMode={viewMode} />
      <PokemonPokedexEntry text={pokemon.pokedexEntry} />

      {/* TODO: Find a way to display suggested IVs */}
      {false && renderSuggestedStats()}

      <PokemonPagination currentPokemon={pokemon.id} pagination={pagination} />
    </div>
  );
};

const PokemonView = injectSheet(sheet)(unstyledPokemonView);

export default PokemonView;
