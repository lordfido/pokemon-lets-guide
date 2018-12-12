import classnames from 'classnames';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import TouchableContent from './touchable-content';

export interface ILinkProps {
  id: string;
  className?: string;
  label?: string;
  icon?: string | React.ReactElement<{}>;
  iconLast?: boolean;
  isExternal?: boolean;
  to?: any;
  onClick?: (params?: any) => void;
}

interface IOwnProps {
  options: ILinkProps;
  isTransparent?: boolean;
  shouldInherit?: boolean;
}

const Link = ({ options, isTransparent, shouldInherit }: IOwnProps) => {
  const onClick = (link?: ILinkProps) => {
    if (link && link.onClick) {
      link.onClick();
    }
  };

  const classes = {
    element: '',
    wrapper: '',
  };

  // If component should inherit color properties
  if (shouldInherit) {
    classes.element = 'is-inherit';

    // If component should not have own properties
  } else if (isTransparent) {
    classes.element = options.className || '';

    // Normal component
  } else {
    classes.wrapper = 'Link';
    classes.element = classnames('Link-elem', options.className);
  }

  const touchable = {
    icon: options.icon,
    iconLast: options.iconLast,
    label: options.label,
  };

  if (options.onClick) {
    return (
      <span className={classes.wrapper}>
        <button
          id={options.id}
          className={classes.element}
          onClick={() => {
            onClick(options);
          }}
        >
          <TouchableContent options={touchable} />
        </button>
      </span>
    );
  }

  if (options.isExternal) {
    return (
      <span className={classes.wrapper}>
        <a
          id={options.id}
          href={options.to}
          className={classes.element}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            onClick();
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TouchableContent options={touchable} />
        </a>
      </span>
    );
  }

  if (typeof options.to === 'undefined') {
    return <span>Undefined Link</span>;
  }

  return (
    <span className={classes.wrapper}>
      <RouterLink
        id={options.id}
        to={
          typeof options.to !== 'string'
            ? options.to
            : {
                pathname: options.to,
                state: { from: location && location.pathname },
              }
        }
        className={classes.element}
        onClick={() => {
          onClick();
        }}
      >
        <TouchableContent options={touchable} />
      </RouterLink>
    </span>
  );
};

export default Link;
