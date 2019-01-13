import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import ReactSlider from 'rc-slider';
import * as React from 'react';
import injectSheet from 'react-jss';

import Space from '../../components/space';

import { PADDING_S } from '../../../constants/styles/styles';
import { formInputStyles } from '../../../constants/styles/styles-common-rules';

import { ISheet } from '../../root.models';
import { ISliderOptions, SliderOutput } from './form.models';

const prevArrow = require('../../../assets/images/prev-arrow.png');
const nextArrow = require('../../../assets/images/next-arrow.png');

const arrowSize = 24;

const styles = {
  tracks: {
    backgroundImage: `url(${prevArrow}), url(${nextArrow})`,
    backgroundPositionX: `0px, ${arrowSize}px`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: arrowSize,
    display: 'inline-block',
    height: arrowSize,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: arrowSize * 2,
  },
} as { [key: string]: React.CSSProperties };

const sheet: ISheet = {
  field: {
    height: formInputStyles.field.minHeight,
    margin: '0px auto',
    position: 'relative',
    width: `calc(100% - ${arrowSize * 2}px)`,
  },
  fieldDisabled: formInputStyles.fieldDisabled,
  fieldWrapper: {
    ...formInputStyles.field,
    overflow: 'hidden',
    padding: `${PADDING_S / 2}px 0px`,
    position: 'relative',
  },
  label: formInputStyles.label,
  wrapper: formInputStyles.wrapper,
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: ISliderOptions;
  onChange: (value: SliderOutput) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface IOwnState {
  value: number;
}

class UnstyledSlider extends React.Component<IOwnProps, IOwnState> {
  public state = {
    value: this.props.options.defaultValue || 0,
  };

  public onChangeProxy = (value: SliderOutput) => {
    const { onChange } = this.props;

    this.setState({
      value,
    });

    onChange(value);
  };

  public render() {
    const { classes, className, options } = this.props;
    const { value } = this.state;

    return (
      <label htmlFor={options.id} data-type={options.type} className={classnames(classes.wrapper, className)}>
        <span className={classes.label}>
          {options.icon && <FontAwesomeIcon icon={options.icon} />}
          {options.icon && options.label && <Space />}
          {options.label && `${options.label}: ${value}`}
        </span>

        <span
          className={classnames(classes.fieldWrapper, options.className, {
            [classes.fieldDisabled]: options.isDisabled,
          })}
        >
          <ReactSlider
            className={classes.field}
            disabled={options.isDisabled}
            defaultValue={options.defaultValue || this.state.value}
            min={options.range[0]}
            max={options.range[1]}
            handleStyle={styles.tracks}
            onChange={this.onChangeProxy}
          />
        </span>
      </label>
    );
  }
}

const Slider = injectSheet(sheet)(UnstyledSlider);

export default Slider;
