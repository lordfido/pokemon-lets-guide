import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../utils/translations';

import Space from '../../components/space';

import { PADDING_S } from '../../../constants/styles/styles';
import { formInputStyles } from '../../../constants/styles/styles-common-rules';

import { ISheet } from '../../root.models';
import { CheckboxOutput, ICheckboxOptions } from './form.models';

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
    fontFamily: formInputStyles.field.fontFamily,
    fontSize: formInputStyles.field.fontSize,
    lineHeight: formInputStyles.field.lineHeight,
    textAlign: formInputStyles.field.textAlign,
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
    marginLeft: PADDING_S,
    textAlign: 'center',
    verticalAlign: 'top',
    width: 76,
  },
  wrapper: {
    ...formInputStyles.field,
    color: formInputStyles.wrapper.color,
    fontSize: formInputStyles.wrapper.fontSize,
    margin: formInputStyles.wrapper.margin,
    marginTop: formInputStyles.wrapper.marginTop,
    paddingBottom: 7,
    paddingTop: 7,
    textAlign: formInputStyles.wrapper.textAlign,
    width: formInputStyles.wrapper.width,

    '&:active, &focus': {
      border: formInputStyles.field.border,
      boxShadow: 'none',
    },
  },
  wrapperDisabled: formInputStyles.fieldDisabled,
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: ICheckboxOptions;
  onChange: (value: CheckboxOutput) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const unstyledSwitch = ({ classes, className, options, onChange, onFocus }: IOwnProps) => {
  const onChangeProxy = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      htmlFor={options.id}
      data-type={options.type}
      className={classnames(
        classes.wrapper,
        options.className,
        className,
        options.isDisabled ? classes.wrapperDisabled : undefined
      )}
    >
      <input
        id={options.id}
        name={options.id}
        className={classes.field}
        type="checkbox"
        required={options.isRequired}
        disabled={options.isDisabled}
        defaultChecked={!!options.defaultChecked}
        onChange={onChangeProxy}
        onFocus={onFocus}
      />

      <span className={classes.label}>
        {options.icon && <FontAwesomeIcon icon={options.icon} />}
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
};

const Switch = injectSheet(sheet)(unstyledSwitch);

export default Switch;
