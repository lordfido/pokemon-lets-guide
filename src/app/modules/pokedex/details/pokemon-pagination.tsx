import * as React from 'react';
import { Link } from 'react-router-dom';
import { getAvatarFromId } from '../../../utils/pokemon';

import Avatar from '../../../components/avatar';

import { POKEMON } from '../../../../constants/appRoutes';

import { IPokemonDetailPagination } from '../pokedex.models';

interface IOwnProps {
  currentPokemon: string;
  pagination: IPokemonDetailPagination;
}

const PokemonPagination = ({ currentPokemon, pagination: { prev, next } }: IOwnProps) =>
  currentPokemon !== prev.id || currentPokemon !== next.id ? (
    <div className="PokemonPagination">
      {currentPokemon !== prev.id && (
        <Link
          className="PokemonPagination-link PokemonPagination--left"
          to={{ pathname: `${POKEMON.replace(':id', String(prev.id))}` }}
        >
          <span className="PokemonPagination-content">
            <span className="PokemonPagination-label">{prev.name}</span> <Avatar picture={getAvatarFromId(prev.id)} />
          </span>
        </Link>
      )}

      {currentPokemon !== next.id && (
        <Link
          className="PokemonPagination-link PokemonPagination--right"
          to={{ pathname: `${POKEMON.replace(':id', String(next.id))}` }}
        >
          <span className="PokemonPagination-content">
            <Avatar picture={getAvatarFromId(next.id)} /> <span className="PokemonPagination-label">{next.name}</span>
          </span>
        </Link>
      )}
    </div>
  ) : null;

export default PokemonPagination;
