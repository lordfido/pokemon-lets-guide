import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import Select from 'react-select';

import TouchableContent from '../../components/touchable-content';

import { PADDING_XL } from '../../../constants/styles/styles';
import { GREY_DARK } from '../../../constants/styles/styles-colors';
import { formInputStyles } from '../../../constants/styles/styles-common-rules';

import { ISheet } from '../../root.models';
import { DropdownOutput, IDropdownOptions, IOption, MultiOutput } from './form.models';

const sheet: ISheet = {
  field: {
    color: GREY_DARK,
  },
  fieldDisabled: formInputStyles.fieldDisabled,
  label: formInputStyles.label,
  wrapper: formInputStyles.wrapper,
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: IDropdownOptions;
  onChange: (value: DropdownOutput | MultiOutput) => void;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
}

const unstyledDropdown = ({ classes, className, options, onChange, onFocus }: IOwnProps) => {
  const onChangeProxy = (values?: null | IOption | IOption[]) => {
    onChange(values || undefined);
  };

  return (
    <label
      htmlFor={options.id}
      data-type={options.type}
      className={classnames(classes.wrapper, options.className, className)}
    >
      <span className={classes.label}>
        <TouchableContent options={options} />
      </span>

      <Select
        className={classnames(classes.field, { [classes.fieldDisabled]: options.isDisabled })}
        defaultValue={
          options.options
            ? options.options.filter(option => {
                if (options.defaultValue) {
                  return options.defaultValue.findIndex(o => o === option.value) >= 0;
                }

                return false;
              })
            : null
        }
        isDisabled={options.isDisabled}
        isMulti={options.isMulti}
        onChange={onChangeProxy}
        onFocus={onFocus}
        options={options.options}
        placeholder={options.placeholder}
        styles={{
          placeholder: (styles: React.CSSProperties) => ({
            ...styles,
            maxWidth: `calc(100% - ${PADDING_XL}px)`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }),
          ...options.colourStyles,
        }}
      />

      {options.error && <span className={classes.error}>{options.error}</span>}
    </label>
  );
};

const Dropdown = injectSheet(sheet)(unstyledDropdown);

export default Dropdown;
