import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Space from '../../components/space';

import { PADDING_L, PADDING_S } from '../../../constants/styles/styles';
import { formInputStyles } from '../../../constants/styles/styles-common-rules';

import { ISheet } from '../../root.models';
import { ISliderOptions } from './form.models';

const prevArrow = require('../../../assets/images/prev-arrow.png');
const nextArrow = require('../../../assets/images/next-arrow.png');

const sheet: ISheet = {
  field: {
    ...formInputStyles.field,
    padding: `${PADDING_S / 2}px 0px`,

    '&::-webkit-slider-thumb': {
      appearance: 'none',
      backgroundImage: `url(${prevArrow}), url(${nextArrow})`,
      backgroundPositionX: '0px, 24px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '24px 24px',
      height: 24,
      width: 48,
    },
  },
  fieldDisabled: formInputStyles.fieldDisabled,
  label: formInputStyles.label,
  textArea: {
    minHeight: 150,
    padding: PADDING_L,
    resize: 'vertical',
  },
  wrapper: formInputStyles.wrapper,
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: ISliderOptions;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface IOwnState {
  value: string;
}

class UnstyledSlider extends React.Component<IOwnProps, IOwnState> {
  public state = {
    value: '0',
  };

  public componentDidMount() {
    this.setState({
      value: this.props.options.defaultValue || '0',
    });
  }

  public onChangeProxy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const { value } = event.target;

    this.setState({
      value,
    });

    if (onChange) {
      onChange(event);
    }
  };

  public render() {
    const { classes, className, options, onClick, onFocus } = this.props;
    const { value } = this.state;

    return (
      <label htmlFor={options.id} data-type={options.type} className={classnames(classes.wrapper, className)}>
        <span className={classes.label}>
          {options.icon && <FontAwesomeIcon icon={options.icon} />}
          {options.icon && options.label && <Space />}
          {options.label && `${options.label}: ${value}`}
        </span>

        <input
          id={options.id}
          name={options.id}
          className={classnames(
            classes.field,
            options.className,
            options.isDisabled ? classes.fieldDisabled : undefined
          )}
          type="range"
          required={options.isRequired}
          disabled={options.isDisabled}
          defaultValue={options.defaultValue}
          min={options.range[0]}
          max={options.range[1]}
          onClick={onClick}
          onChange={this.onChangeProxy}
          onFocus={onFocus}
        />
      </label>
    );
  }
}

const Slider = injectSheet(sheet)(UnstyledSlider);

export default Slider;
