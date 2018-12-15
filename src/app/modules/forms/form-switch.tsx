import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../utils/translations';

import Space from '../../components/space';

import { commonStyles } from './field.styles';

import { ISheet } from '../../root.models';
import { ICheckboxOptions } from './form.models';

const prevArrow = require('../../../assets/images/prev-arrow.png');
const nextArrow = require('../../../assets/images/next-arrow.png');

const arrowSize = 18;

const sheet: ISheet = {
  arrow: {
    cursor: 'pointer',
    display: 'flex !important',
    height: arrowSize,
    justifyContent: 'center',
    transition: 'transform 0.2s',
    width: arrowSize,

    '&:hover': {
      transform: 'scale(1.2)',
    },
    ':disabled ~ span > &': {
      opacity: 0.3,
    },
  },
  field: {
    display: 'none',
  },
  label: {
    display: 'inline-block',
    fontFamily: commonStyles.field.fontFamily,
    fontSize: commonStyles.field.fontSize,
    lineHeight: commonStyles.field.lineHeight,
    width: 'calc(100% - 80px)',
  },
  optionLabel: {
    display: 'none',
    flex: 1,
    justifyContent: 'center',
  },
  optionNo: {
    ':checked ~ span > &': {
      display: 'none !important',
    },
    ':not(:checked) ~ span > &': {
      display: 'flex',
    },
  },
  optionYes: {
    ':checked ~ span > &': {
      display: 'flex',
    },
  },
  options: {
    alignItems: 'center',
    display: 'inline-flex',
    flexDirection: 'row',
    marginLeft: 4,
    textAlign: 'center',
    verticalAlign: 'top',
    width: 76,
  },
  wrapper: {
    ...commonStyles.field,
    color: commonStyles.wrapper.color,
    fontSize: commonStyles.wrapper.fontSize,
    margin: commonStyles.wrapper.margin,
    marginTop: commonStyles.wrapper.marginTop,
    paddingBottom: 7,
    paddingTop: 7,
    width: commonStyles.wrapper.width,

    '&:active, &focus': {
      border: commonStyles.field.border,
      boxShadow: 'none',
    },
  },
  wrapperDisabled: commonStyles.fieldDisabled,
};

interface IOwnProps {
  classes: { [key: string]: string };
  options: ICheckboxOptions;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const unstyledSwitch = ({ classes, options, onChange, onClick, onFocus }: IOwnProps) => (
  <label
    htmlFor={options.id}
    className={classnames(classes.wrapper, options.className, options.isDisabled ? classes.wrapperDisabled : undefined)}
  >
    <input
      id={options.id}
      name={options.id}
      className={classes.field}
      type="checkbox"
      required={options.isRequired}
      disabled={options.isDisabled}
      defaultChecked={!!options.defaultChecked}
      onClick={onClick}
      onChange={onChange}
      onFocus={onFocus}
    />

    <span className={classes.label}>
      {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
      {options.icon && options.label && <Space />}
      {options.label}
    </span>

    <span className={classes.options}>
      <img className={classes.arrow} src={prevArrow} />
      <span className={classnames(classes.optionLabel, classes.optionNo)}>{getTranslation('generic-no')}</span>
      <span className={classnames(classes.optionLabel, classes.optionYes)}>{getTranslation('generic-yes')}</span>
      <img className={classes.arrow} src={nextArrow} />
    </span>
  </label>
);

const Switch = injectSheet(sheet)(unstyledSwitch);

export default Switch;
