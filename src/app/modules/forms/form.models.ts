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

interface ICommonProps {
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

  onFocus?: (params?: any) => void;
}

export interface IButtonProps extends ICommonProps {
  isActive?: boolean;
  onClick?: (params?: any) => void;
  to?: string;
  type: 'button';
}

interface ICommonFieldProps extends ICommonProps {
  onChange?: (params: { id: string; value: GenericOutput }) => void;
}

export interface ICheckboxOptions extends ICommonFieldProps {
  defaultChecked?: boolean | void;
  isChecked?: boolean;
  type: 'checkbox' | 'switch';
}

export interface IDateOptions extends ICommonFieldProps {
  defaultValue?: number;
  error?: string;
  placeholder?: string;
  type: 'date';
}

export interface IDropdownOptions extends ICommonFieldProps {
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

export interface IRangeOptions extends ICommonFieldProps {
  defaultValue?: [number, number];
  range: [number, number];
  type: 'range';
}

export interface ISliderOptions extends ICommonFieldProps {
  defaultValue?: number;
  range: [number, number];
  type: 'slider';
}

export interface ITextOptions extends ICommonFieldProps {
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

export type CheckboxOutput = boolean;
export type DateOutput = number;
export type DropdownOutput = IOption | void;
export type MultiOutput = IOption[] | void;
export type RangeOutput = [number, number];
export type SliderOutput = number;
export type TextOutput = string;

export type GenericOutput =
  | CheckboxOutput
  | DateOutput
  | DropdownOutput
  | MultiOutput
  | RangeOutput
  | SliderOutput
  | TextOutput;

export interface IFieldOutput {
  id: string;
  value: GenericOutput;
}
