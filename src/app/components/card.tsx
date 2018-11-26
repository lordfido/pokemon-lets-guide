import * as React from 'react';
import classnames from 'classnames';
import CustomImage from './image';

interface OwnProps {
  className?: string;
  title?: string;
  image?: string;
}

class Card extends React.Component<OwnProps> {
  static displayName = 'Card';

  render() {
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
