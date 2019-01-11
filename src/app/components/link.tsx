import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link as RouterLink } from 'react-router-dom';

import Field from '../modules/forms/field';
import TouchableContent from './touchable-content';

import { TEXT_BRANDED } from '../../constants/styles-fonts';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  inherit: {
    '&, &:hover, &:visited, &:active': {
      color: 'inherit',
    },
  },
  link: {
    appearance: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    height: '100%',
    outline: 'none',

    '&, &:active, &:hover, &:focus, & > *, &:active > *, &:hover > *, &:focus > *': {
      background: 'none',
      border: 'none',
      color: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      margin: 0,
      maxWidth: 'none',
      padding: 0,
      textDecoration: 'none',
      width: '100%',
    },

    '&:active > *, &:hover > *, &:focus > *': {
      textDecoration: 'underline',
    },
  },
  wrapper: {
    color: TEXT_BRANDED,
    display: 'inline-block',
  },
};

export interface ILinkProps {
  id: string;
  className?: string;
  customIcon?: React.ReactElement<{}>;
  label?: string;
  icon?: IconName;
  iconLast?: boolean;
  iconPrefix?: IconPrefix;
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
    customIcon: options.customIcon,
    icon: options.icon,
    iconLast: options.iconLast,
    iconPrefix: options.iconPrefix,
    label: options.label,
  };

  if (options.onClick) {
    return (
      <span className={linkClasses.wrapper}>
        <Field
          options={{
            ...options,
            className: linkClasses.element,
            type: 'button',
          }}
        />
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
