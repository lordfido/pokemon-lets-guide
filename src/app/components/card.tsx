import classnames from 'classnames';
import * as React from 'react';

import CustomImage from './image';

interface IOwnProps {
  className?: string;
  title?: string;
  image?: string;
}

class Card extends React.Component<IOwnProps> {
  public static displayName = 'Card';

  public render() {
    const { className, title, image, children } = this.props;

    const classes = {
      wrapper: classnames('Card', className),
    };

    return (
      <div className={classes.wrapper}>
        {!!title && <span className="Card-title">{title}</span>}
        {!!image && <CustomImage className="Card-image" src={image} />}
        {children}
      </div>
    );
  }
}

export default Card;
