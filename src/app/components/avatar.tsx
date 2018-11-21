import * as React from 'react';
import classnames from 'classnames';

import { Pokemon } from '../modules/pokemon-list/pokemon-list.types';
import CustomImage from './image';

interface OwnProps {
  pokemon: Pokemon;
}

class Avatar extends React.Component<OwnProps> {
  static displayName = 'Avatar';

  render() {
    const { pokemon } = this.props;

    return (
      <div className="Avatar">
        <CustomImage className="Avatar-picture" src={pokemon.avatar} />
      </div>
    );
  }
}

export default Avatar;
