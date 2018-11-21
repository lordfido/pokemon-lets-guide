import * as React from 'react';
import StatsChart from '../../components/stats-chart';

import PokemonInfo from './pokemon-info';
import PokemonPreview from './pokemon-preview';
import PokemonStats from './pokemon-stats';
import PokemonPokedexEntry from './pokemon-pokedex-entry';
import PokemonPagination from './pokemon-pagination';

import { getTypeColor } from '../../../constants/pokemon-types-color';

import { Pokemon, PokemonPagination as PokemonPaginationModel } from '../pokemon-list/pokemon-list.types';

interface OwnProps {
  pokemon: Pokemon;
  pagination: PokemonPaginationModel;
}

class PokemonDetailsView extends React.Component<OwnProps> {
  displayName = 'PokemonDetailsView';

  render() {
    const { pokemon, pagination } = this.props;

    return (
      <div className="PokemonDetails">
        <PokemonInfo pokemon={pokemon} />
        <PokemonPreview previewUrl={pokemon.avatar} />
        <PokemonStats pokemon={pokemon} />
        <PokemonPokedexEntry text={pokemon.pokedexEntry} />

        {false &&
          pokemon.suggested &&
          pokemon.suggested.map((suggestion, index) => (
            <React.Fragment>
              <p key={`title-${index}`}>Recommended capture with {index + 1} perfect IVs</p>
              <StatsChart key={`suggested-${index}`} stats={suggestion} color={getTypeColor(pokemon.types[0])} />
            </React.Fragment>
          ))}

        <PokemonPagination pagination={pagination} />
      </div>
    );
  }
}

export default PokemonDetailsView;
