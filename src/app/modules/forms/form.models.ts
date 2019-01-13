import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

import { IButtonProps } from '../../components/button';

export type types =
  // Button
  | 'button'

  // Checkbox or Switch
  | 'checkbox'
  | 'switch'

  // Datepicker
  | 'date'

  // Dropdowns
  | 'dropdown'
  | 'multi'

  // Range
  | 'range'

  // Slider
  | 'slider'

  // Text
  | 'email'
  | 'number'
  | 'password'
  | 'text'
  | 'textarea';

interface ICommonOptions {
  type: types;
  id: string;
  updateId?: string;

  className?: string;
  label?: string;
  customIcon?: React.ReactElement<{}>;
  icon?: IconName;
  iconLast?: boolean;
  iconPrefix?: IconPrefix;

  isRequired?: boolean;
  isSubmitted?: boolean;
  isDisabled?: boolean;
  isAlwaysDisabled?: boolean;
  isAlwaysEnabled?: boolean;
  isDiactivatable?: boolean;

  onChange?: (params?: any) => void;
  onClick?: (params?: any) => void;
  onFocus?: (params?: any) => void;
}

export interface IButtonProps extends ICommonOptions {
  isActive?: boolean;
  to?: string;
  type: 'button';
}

export interface ICheckboxOptions extends ICommonOptions {
  defaultChecked?: boolean | void;
  isChecked?: boolean;
  type: 'checkbox' | 'switch';
}

export interface IDateOptions extends ICommonOptions {
  defaultValue?: string;
  error?: string;
  placeholder?: string;
  type: 'date';
}

export interface IDropdownOptions extends ICommonOptions {
  colourStyles?: any;
  error?: string;
  isMulti?: boolean;
  placeholder?: string;
  defaultValue?: string[];
  options: IOption[];
  type: 'dropdown' | 'multi';
}

export interface IOption {
  id: string;
  label: string;
  value: string;
}

export interface IRangeOptions extends ICommonOptions {
  defaultValue?: [number, number];
  range: [number, number];
  type: 'range';
}

export interface ISliderOptions extends ICommonOptions {
  defaultValue?: string;
  range: [number, number];
  type: 'slider';
}

export interface ITextOptions extends ICommonOptions {
  defaultValue?: string;
  error?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  type: 'email' | 'number' | 'password' | 'text' | 'textarea';
}

export type IGenericField =
  | IButtonProps
  | ICheckboxOptions
  | IDateOptions
  | IDropdownOptions
  | IRangeOptions
  | ISliderOptions
  | ITextOptions;
