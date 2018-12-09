import * as React from 'react';
import StatsChart from '../../components/stats-chart';

import PokemonInfo from './pokemon-info';
import PokemonPreview from './pokemon-preview';
import PokemonStats from './pokemon-stats';
import PokemonPokedexEntry from './pokemon-pokedex-entry';
import PokemonPagination from './pokemon-pagination';

import { getTypeColor } from '../../../constants/pokemon-types-color';

import { RichPokemon, PokemonPagination as PokemonPaginationModel } from '../pokemon-list/pokemon-list.types';
import { getTranslation } from '../../utils/translations';
import { getSuggestedIVs } from '../../utils/pokemon';

interface OwnProps {
  pokemon: RichPokemon;
  pagination: PokemonPaginationModel;
}

class PokemonDetailsView extends React.Component<OwnProps> {
  displayName = 'PokemonDetailsView';

  renderSuggestedStats() {
    const { pokemon } = this.props;
    const suggestedIVs = getSuggestedIVs(pokemon.baseStats);

    return suggestedIVs.map((suggestion, index) => (
      <React.Fragment key={`suggested-${index}`}>
        <p>{getTranslation('pokemon-details-recommended', (index + 1).toString())}</p>
        <StatsChart stats={suggestion} color={getTypeColor(pokemon.types.ownTypes[0])} size={272} />
      </React.Fragment>
    ));
  }

  render() {
    const { pokemon, pagination } = this.props;

    return (
      <div className="PokemonDetails">
        <PokemonInfo pokemon={pokemon} />
        <PokemonPreview src={pokemon.avatar} alt={getTranslation('pokemon-details-preview', pokemon.name)} />
        <PokemonStats pokemon={pokemon} />
        <PokemonPokedexEntry text={pokemon.pokedexEntry} />

        {false && this.renderSuggestedStats()}

        <PokemonPagination currentPokemon={pokemon.id} pagination={pagination} />
      </div>
    );
  }
}

export default PokemonDetailsView;
