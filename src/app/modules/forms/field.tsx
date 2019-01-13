import * as React from 'react';

import Button from '../../components/button';
import Checkbox from './form-checkbox';
import Date from './form-date';
import Dropdown from './form-dropdown';
import Range from './form-range';
import Slider from './form-slider';
import Switch from './form-switch';
import Text from './form-text';

import { GenericOutput, IFieldOutput, IGenericField } from './form.models';

interface IOwnProps {
  className?: string;
  options: IGenericField & { onChange?: (value: IFieldOutput) => void };
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

const Field = ({ className, options }: IOwnProps) => {
  const onClick = (
    event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>
  ) => {
    if ('onClick' in options && options.onClick) {
      options.onClick(event);
    }
  };

  const onFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>
  ) => {
    if (options.onFocus) {
      options.onFocus(event);
    }
  };

  const onChange = (value: GenericOutput) => {
    if ('onChange' in options && options.onChange) {
      options.onChange({ id: options.id, value });
    }
  };

  const { isDiactivatable, isDisabled: disabled, isAlwaysDisabled, isAlwaysEnabled, ...defaultOptions } = options;
  const newOptions = {
    ...defaultOptions,
    isDisabled: isDisabled({ isDiactivatable, isDisabled: disabled, isAlwaysDisabled, isAlwaysEnabled }),
  };

  switch (newOptions.type) {
    case 'button':
      return (
        <Button
          className={className}
          options={{
            ...newOptions,
            onClick: !newOptions.isDisabled ? onClick : undefined,
            onFocus: !newOptions.isDisabled ? onFocus : undefined,
          }}
        />
      );

    case 'checkbox':
      return (
        <Checkbox
          className={className}
          options={newOptions}
          onChange={onChange}
          onFocus={!newOptions.isDisabled ? onFocus : undefined}
        />
      );

    case 'date':
      return (
        <Date
          className={className}
          options={newOptions}
          onChange={onChange}
          onFocus={!newOptions.isDisabled ? onFocus : undefined}
        />
      );

    case 'dropdown':
      return (
        <Dropdown
          className={className}
          options={newOptions}
          onChange={onChange}
          onFocus={!newOptions.isDisabled ? onFocus : undefined}
        />
      );

    case 'multi':
      return (
        <Dropdown
          className={className}
          options={{
            ...newOptions,
            isMulti: true,
          }}
          onChange={onChange}
          onFocus={!newOptions.isDisabled ? onFocus : undefined}
        />
      );

    case 'range':
      return (
        <Range
          className={className}
          options={newOptions}
          onChange={onChange}
          onFocus={!newOptions.isDisabled ? onFocus : undefined}
        />
      );

    case 'slider':
      return (
        <Slider
          className={className}
          options={newOptions}
          onChange={onChange}
          onFocus={!newOptions.isDisabled ? onFocus : undefined}
        />
      );

    case 'switch':
      return (
        <Switch
          className={className}
          options={newOptions}
          onChange={onChange}
          onFocus={!newOptions.isDisabled ? onFocus : undefined}
        />
      );

    case 'text':
    case 'email':
    case 'number':
    case 'password':
    case 'textarea':
      return (
        <Text
          className={className}
          options={newOptions}
          onChange={onChange}
          onFocus={!newOptions.isDisabled ? onFocus : undefined}
        />
      );

    default:
      return null;
  }
};

export default Field;
