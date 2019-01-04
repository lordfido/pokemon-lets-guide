import * as React from 'react';
import { log } from '../../../common/utils/logger';

import Button from '../../components/button';
import Checkbox from './form-checkbox';
import Date from './form-date';
import Dropdown from './form-dropdown';
import Switch from './form-switch';
import Text from './form-text';

import { ICheckboxOptions, IDateOptions, IDropdownOptions, IGenericField, ITextOptions } from './form.models';

interface IOwnProps {
  className?: string;
  options: IGenericField & (ICheckboxOptions | IDateOptions | IDropdownOptions | ITextOptions);
}

interface IDisablingProps {
  isDiactivatable?: boolean;
  isDisabled?: boolean;
  isAlwaysDisabled?: boolean;
  isAlwaysEnabled?: boolean;
}

const isDisabled = ({ isDiactivatable, isDisabled: disabled, isAlwaysDisabled, isAlwaysEnabled }: IDisablingProps) =>
  !!(
    (typeof isDiactivatable === 'undefined' || isDiactivatable) &&
    ((disabled && !isAlwaysEnabled) || isAlwaysDisabled)
  );

class Field extends React.Component<IOwnProps> {
  public onClick = (
    event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>
  ) => {
    const { options } = this.props;

    log(`onClick() of <${options.id}>`);

    if (options.onClick) {
      options.onClick(event);
    }
  };

  public onFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>
  ) => {
    const { options } = this.props;

    log(`onFocus() of <${options.id}>`);

    if (options.onFocus) {
      options.onFocus(event);
    }
  };

  public onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>
  ) => {
    const { options } = this.props;

    log(`onChange() of <${options.id}>`, this.props);

    if (options.onChange) {
      if (event.target) {
        switch (event.target.type) {
          case 'checkbox':
            // @ts-ignore
            options.onChange(event.target.checked);
            break;

          default:
            options.onChange(event.target.value);
        }
      } else {
        options.onChange(event);
      }
    }
  };

  public render() {
    const {
      className,
      options: { isDiactivatable, isDisabled: disabled, isAlwaysDisabled, isAlwaysEnabled, ...defaultOptions },
    } = this.props;

    const options = {
      ...defaultOptions,
      isDisabled: isDisabled({ isDiactivatable, isDisabled: disabled, isAlwaysDisabled, isAlwaysEnabled }),
    };

    switch (options.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'password':
      case 'textarea':
        return (
          <Text
            className={className}
            options={{
              ...options,
              defaultValue: 'defaultValue' in options ? String(options.defaultValue) : undefined,
            }}
            onChange={!options.isDisabled ? this.onChange : undefined}
            onClick={!options.isDisabled ? this.onClick : undefined}
            onFocus={!options.isDisabled ? this.onFocus : undefined}
          />
        );

      case 'switch':
        return (
          <Switch
            className={className}
            options={options}
            onChange={!options.isDisabled ? this.onChange : undefined}
            onClick={!options.isDisabled ? this.onClick : undefined}
            onFocus={!options.isDisabled ? this.onFocus : undefined}
          />
        );

      case 'checkbox':
        return (
          <Checkbox
            className={className}
            options={options}
            onChange={!options.isDisabled ? this.onChange : undefined}
            onClick={!options.isDisabled ? this.onClick : undefined}
            onFocus={!options.isDisabled ? this.onFocus : undefined}
          />
        );

      case 'dropdown':
        return (
          <Dropdown
            className={className}
            options={{
              ...options,
              defaultValue:
                'defaultValue' in options && typeof options.defaultValue !== 'string'
                  ? options.defaultValue
                  : undefined,
              options: 'options' in options ? options.options : [],
            }}
            onChange={!options.isDisabled ? this.onChange : undefined}
            onClick={!options.isDisabled ? this.onClick : undefined}
            onFocus={!options.isDisabled ? this.onFocus : undefined}
          />
        );

      case 'multi':
        return (
          <Dropdown
            className={className}
            options={{
              ...options,
              defaultValue:
                'defaultValue' in options && typeof options.defaultValue !== 'string'
                  ? options.defaultValue
                  : undefined,
              isMulti: true,
              options: 'options' in options ? options.options : [],
            }}
            onChange={!options.isDisabled ? this.onChange : undefined}
            onClick={!options.isDisabled ? this.onClick : undefined}
            onFocus={!options.isDisabled ? this.onFocus : undefined}
          />
        );

      case 'date':
        return (
          <Date
            className={className}
            options={{
              ...options,
              defaultValue:
                'defaultValue' in options && typeof options.defaultValue === 'string'
                  ? options.defaultValue
                  : undefined,
            }}
            onChange={!options.isDisabled ? this.onChange : undefined}
            onClick={!options.isDisabled ? this.onClick : undefined}
            onFocus={!options.isDisabled ? this.onFocus : undefined}
          />
        );

      case 'button':
        return (
          <Button
            className={className}
            options={{
              ...options,
              onChange: !options.isDisabled ? this.onChange : undefined,
              onClick: !options.isDisabled ? this.onClick : undefined,
              onFocus: !options.isDisabled ? this.onFocus : undefined,
            }}
          />
        );

      default:
        return null;
    }
  }
}

export default Field;
