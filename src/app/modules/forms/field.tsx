import * as React from 'react';
import { log } from '../../../common/utils/logger';

import Text from './form-text';
import Switch from './form-switch';
import Checkbox from './form-checkbox';
import Dropdown from './form-dropdown';
import Date from './form-date';
import { Button } from '../../components/buttons';

interface Resource {
  type: string;
  id: number | void;
}

interface Option {
  id: string;
  type: string;
  label: string;
  value: string;
  icon?: string;
}

export interface FieldProps {
  type: string;
  id: string;
  updateId?: string;
  model?: string | void;
  form?: string;

  className?: string;
  label?: string;
  icon?: string | React.ReactElement<{}>;
  iconLast?: boolean;
  placeholder?: string;

  isRequired?: boolean;
  isSubmitted?: boolean;
  isChecked?: boolean;
  isDiactivatable?: boolean;
  isDisabled?: boolean;
  isAlwaysDisabled?: boolean;
  isAlwaysEnabled?: boolean;
  isMulti?: boolean;

  error?: string;

  minLength?: number;
  maxLength?: number;
  options?: Array<Option>;
  fields?: Array<FieldProps>;
  resource?: Resource;

  onClick?: Function;
  onChange?: Function;
  onFocus?: Function;
  onUpload?: (result: string, response: any) => void;
}

const checkIsDisabled = (options: FieldProps) =>
  (typeof options.isDiactivatable === 'undefined' || options.isDiactivatable) &&
  ((options.isDisabled && !options.isAlwaysEnabled) || options.isAlwaysDisabled);

interface OwnProps {
  options: FieldProps;
}

class Field extends React.Component<OwnProps> {
  static displayName = 'Field';

  onClick = (
    event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>
  ) => {
    const { options } = this.props;

    log(`onClick() of <${options.id}>`);

    if (options.onClick) {
      options.onClick(event);
    }
  };

  onFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>
  ) => {
    const { options } = this.props;

    log(`onFocus() of <${options.id}>`);

    if (options.onFocus) {
      options.onFocus(event);
    }
  };

  onChange = (
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

  renderWrappedField(field: React.ReactElement<{}>) {
    const { options } = this.props;

    const styles = {
      wrapper: {
        display: 'block',
        textAlign: options.type === 'button' ? 'center' : 'initial',
      } as React.CSSProperties,
    };

    return (
      <span key={options.updateId || options.id} style={styles.wrapper}>
        {field}
      </span>
    );
  }

  render() {
    const { options: defaultOptions } = this.props;

    const options = {
      ...defaultOptions,
      isDisabled: checkIsDisabled(defaultOptions),
    };

    switch (options.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'password':
      case 'textarea':
        return this.renderWrappedField(
          <Text options={options} onClick={this.onClick} onChange={this.onChange} onFocus={this.onFocus} />
        );

      case 'switch':
        return this.renderWrappedField(
          <Switch options={options} onClick={this.onClick} onChange={this.onChange} onFocus={this.onFocus} />
        );

      case 'checkbox':
        return this.renderWrappedField(
          <Checkbox options={options} onClick={this.onClick} onChange={this.onChange} onFocus={this.onFocus} />
        );

      case 'dropdown':
        return this.renderWrappedField(
          <Dropdown options={options} onClick={this.onClick} onChange={this.onChange} onFocus={this.onFocus} />
        );

      case 'multi':
        return this.renderWrappedField(
          <Dropdown
            options={{ ...options, isMulti: true }}
            onClick={this.onClick}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />
        );

      case 'date':
        return this.renderWrappedField(
          <Date options={options} onClick={this.onClick} onChange={this.onChange} onFocus={this.onFocus} />
        );

      case 'button':
        return this.renderWrappedField(<Button options={options} />);

      default:
        return null;
    }
  }
}

export default Field;
