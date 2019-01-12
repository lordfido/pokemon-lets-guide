import * as React from 'react';
import injectSheet from 'react-jss';
import { getSuggestedIVs } from '../../utils/pokemon';
import { getTranslation } from '../../utils/translations';

import { IButtonProps } from '../../components/button';
import StatsChart, { ViewMode } from '../../components/stats-chart';
import PokemonInfo from './pokemon-info';
import PokemonPagination from './pokemon-pagination';
import PokemonPokedexEntry from './pokemon-pokedex-entry';
import PokemonPreview from './pokemon-preview';
import PokemonStats from './pokemon-stats';

import { getTypeColor } from '../../../constants/pokemon-types-color';
import { PADDING_XL } from '../../../constants/styles';
import { POKEDEX_BACKGROUND } from '../../../constants/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles-fonts';

import { ISheet } from '../../root.models';
import { IPokemonDetailPagination, IRichPokemon } from '../pokedex/pokedex.models';

const sheet: ISheet = {
  wrapper: {
    backgroundColor: POKEDEX_BACKGROUND,
    color: TEXT_WHITE,
    paddingBottom: PADDING_XL,
    width: '100%',
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
        <p>{getTranslation('pokemon-details-recommended', (index + 1).toString())}</p>
        <StatsChart stats={suggestion} viewMode={viewMode} color={getTypeColor(pokemon.types.ownTypes[0])} />
      </>
    ));
  };

  return (
    <div className={classes.wrapper}>
      <PokemonInfo pokemon={pokemon} />
      <PokemonPreview src={pokemon.avatar} alt={getTranslation('pokemon-details-preview', pokemon.name)} />
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
