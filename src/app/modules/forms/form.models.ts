interface ICommonOptions {
  type: string;
  id: string;
  updateId?: string;

  className?: string;
  label?: string;
  icon?: string | React.ReactElement<{}>;
  iconLast?: boolean;

  isRequired?: boolean;
  isSubmitted?: boolean;
  isDisabled?: boolean;

  onChange?: (params?: any) => void;
  onClick?: (params?: any) => void;
  onFocus?: (params?: any) => void;
}

export interface IGenericField extends ICommonOptions {
  isAlwaysDisabled?: boolean;
  isAlwaysEnabled?: boolean;
  isDiactivatable?: boolean;
  type: string;
}

export interface ICheckboxOptions extends ICommonOptions {
  defaultChecked?: boolean | void;
  isChecked?: boolean;
}

export interface IDateOptions extends ICommonOptions {
  defaultValue?: string;
  error?: string;
  placeholder?: string;
}

interface IOption {
  id: string;
  label: string;
  value: string;
}

export interface IDropdownOptions extends ICommonOptions {
  colourStyles?: any;
  error?: string;
  isMulti?: boolean;
  placeholder?: string;
  defaultValue?: string[];
  options: IOption[];
}

export interface ITextOptions extends ICommonOptions {
  defaultValue?: string;
  error?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  type: string;
}
