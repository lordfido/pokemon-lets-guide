import * as React from 'react';
import injectSheet, { CSSProperties } from 'react-jss';
import { getPaddedId } from '../../utils/pokemon';
import { getGameTranslation, getUiTranslation } from '../../utils/translations';

import Spacer from '../../components/spacer';
import Tag from '../../components/tag';

import { getTypeName, PokemonType } from '../../../constants/pokemon/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';
import { getTypeIcon } from '../../../constants/pokemon/pokemon-types-icons';
import { BORDER_RADIUS_BIG, BORDER_RADIUS_SMALL, PADDING_S, PADDING_XXL } from '../../../constants/styles/styles';
import { POKEDEX_WINDOW_MAX_WIDTH, pokedexWindowStyles } from '../../../constants/styles/styles-common-rules';
import { DESKTOP } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';
import { IRichPokemon } from '../pokedex/pokedex.models';

const strengthsAndWeaknesses: CSSProperties<any> = {
  display: 'inline-block',
  textAlign: 'center',
  verticalAlign: 'top',
  width: '50%',
};

const sheet: ISheet = {
  strengths: strengthsAndWeaknesses,
  weaknessess: strengthsAndWeaknesses,
  window: {
    ...pokedexWindowStyles.window,
    borderRadius: `${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px`,

    [DESKTOP]: {
      margin: 0,
      marginLeft: PADDING_XXL,
      marginTop: PADDING_XXL,
      width: POKEDEX_WINDOW_MAX_WIDTH - PADDING_XXL,
    },
  },
  wrapper: {
    ...pokedexWindowStyles.wrapper,
    borderRadius: `${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px ${BORDER_RADIUS_BIG}px ${BORDER_RADIUS_SMALL}px`,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  pokemon: IRichPokemon;
}

const unstyledPokemonInfo = ({ classes, pokemon }: IOwnProps) => (
  <>
    <div className={classes.window}>
      <div className={classes.wrapper}>
        <p>
          {getGameTranslation('pokedex-number')} {getPaddedId(String(pokemon.nationalNumber))}
        </p>
        <p>{pokemon.name}</p>
        <span>
          {pokemon.types.ownTypes.map((type: PokemonType) => (
            <Tag key={type} label={getTypeName(type)} icon={getTypeIcon(type)} backgroundColor={getTypeColor(type)} />
          ))}
        </span>
        <p>{pokemon.description}</p>

        <Spacer />

        <div className={classes.weaknessess}>
          <p>{getUiTranslation('search-weak-against')}</p>
          {pokemon.types.relations
            .filter(r => r.effectiveness > 1)
            .map(({ id, effectiveness }) => (
              <Tag
                key={id}
                label={`${getTypeName(id)} x${effectiveness}`}
                icon={getTypeIcon(id)}
                backgroundColor={getTypeColor(id)}
                style={{ marginBottom: PADDING_S }}
              />
            ))}
        </div>
        <div className={classes.strengths}>
          <p>{getUiTranslation('search-strong-against')}</p>
          {pokemon.types.relations
            .filter(r => r.effectiveness < 1)
            .map(({ id, effectiveness }) => (
              <Tag
                key={id}
                label={`${getTypeName(id)} x${effectiveness}`}
                icon={getTypeIcon(id)}
                backgroundColor={getTypeColor(id)}
                style={{ marginBottom: PADDING_S }}
              />
            ))}
        </div>
      </div>
    </div>
  </>
);

const PokemonInfo = injectSheet(sheet)(unstyledPokemonInfo);

export default PokemonInfo;
