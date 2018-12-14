import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link as RouterLink } from 'react-router-dom';

import TouchableContent from './touchable-content';

import { BRAND_COLOR } from '../../constants/styles-colors';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  inherit: {
    '&, &:hover, &:visited, &:active': {
      color: 'inherit',
    },
  },
  link: {
    color: 'inherit',
    cursor: 'pointer',
    display: 'inline-block',
    height: '100%',
    textDecoration: 'none',
    width: '100%',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  wrapper: {
    color: BRAND_COLOR,
    display: 'inline-block',
  },
};

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
  classes: { [key: string]: string };
  isTransparent?: boolean;
  options: ILinkProps;
  shouldInherit?: boolean;
}

const unstyledLink = ({ classes, isTransparent, options, shouldInherit }: IOwnProps) => {
  const onClick = (link?: ILinkProps) => {
    if (link && link.onClick) {
      link.onClick();
    }
  };

  const linkClasses = {
    element: '',
    wrapper: '',
  };

  // If component should inherit color properties
  if (shouldInherit) {
    linkClasses.element = classes.inherit;

    // If component should not have own properties
  } else if (isTransparent) {
    linkClasses.element = options.className || '';

    // Normal component
  } else {
    linkClasses.wrapper = classes.wrapper;
    linkClasses.element = classnames(classes.link, options.className);
  }

  const touchable = {
    icon: options.icon,
    iconLast: options.iconLast,
    label: options.label,
  };

  if (options.onClick) {
    return (
      <span className={linkClasses.wrapper}>
        <button
          id={options.id}
          className={linkClasses.element}
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
      <span className={linkClasses.wrapper}>
        <a
          id={options.id}
          href={options.to}
          className={linkClasses.element}
          onClick={() => {
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
    <span className={linkClasses.wrapper}>
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
        className={linkClasses.element}
        onClick={() => {
          onClick();
        }}
      >
        <TouchableContent options={touchable} />
      </RouterLink>
    </span>
  );
};

const Link = injectSheet(sheet)(unstyledLink);

export default Link;
