import * as React from 'react';
import { getSuggestedIVs } from '../../../utils/pokemon';
import { getTranslation } from '../../../utils/translations';

import StatsChart from '../../../components/stats-chart';
import PokemonInfo from './pokemon-info';
import PokemonPagination from './pokemon-pagination';
import PokemonPokedexEntry from './pokemon-pokedex-entry';
import PokemonPreview from './pokemon-preview';
import PokemonStats from './pokemon-stats';

import { getTypeColor } from '../../../../constants/pokemon-types-color';

import { IPokemonDetailPagination, IRichPokemon } from '../pokedex.models';

interface IOwnProps {
  pokemon: IRichPokemon;
  pagination: IPokemonDetailPagination;
}

const PokemonDetailsView = ({ pokemon, pagination }: IOwnProps) => {
  const renderSuggestedStats = () => {
    const suggestedIVs = getSuggestedIVs(pokemon.baseStats);

    return suggestedIVs.map((suggestion, index) => (
      <React.Fragment key={`suggested-${index}`}>
        <p>{getTranslation('pokemon-details-recommended', (index + 1).toString())}</p>
        <StatsChart stats={suggestion} color={getTypeColor(pokemon.types.ownTypes[0])} size={272} />
      </React.Fragment>
    ));
  };

  return (
    <div className="PokemonDetails">
      <PokemonInfo pokemon={pokemon} />
      <PokemonPreview src={pokemon.avatar} alt={getTranslation('pokemon-details-preview', pokemon.name)} />
      <PokemonStats pokemon={pokemon} />
      <PokemonPokedexEntry text={pokemon.pokedexEntry} />

      {/* TODO: Find a way to display suggested IVs */}
      {false && renderSuggestedStats()}

      <PokemonPagination currentPokemon={pokemon.id} pagination={pagination} />
    </div>
  );
};

export default PokemonDetailsView;
