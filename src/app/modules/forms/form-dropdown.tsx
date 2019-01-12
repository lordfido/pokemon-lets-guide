import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import Select from 'react-select';

import TouchableContent from '../../components/touchable-content';

import { WHITE } from '../../../constants/styles-colors';
import { commonStyles } from './field.styles';

import { ISheet } from '../../root.models';
import { IDropdownOptions } from './form.models';

const sheet: ISheet = {
  fieldDisabled: commonStyles.fieldDisabled,
  label: commonStyles.label,
  wrapper: commonStyles.wrapper,
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: IDropdownOptions;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
  onClick?: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
}

const unstyledDropdown = ({ classes, className, options, onChange, onFocus }: IOwnProps) => (
  <label
    htmlFor={options.id}
    data-type={options.type}
    className={classnames(classes.wrapper, options.className, className)}
  >
    <span className={classes.label}>
      <TouchableContent options={options} />
    </span>

    <Select
      className={classnames(options.isDisabled ? classes.fieldDisabled : undefined)}
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
      onChange={onChange}
      onFocus={onFocus}
      options={options.options}
      placeholder={options.placeholder}
      styles={options.colourStyles}
    />

    {options.error && <span className={classes.error}>{options.error}</span>}
  </label>
);

const Dropdown = injectSheet(sheet)(unstyledDropdown);

export default Dropdown;
