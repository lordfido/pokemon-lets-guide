import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { Range as ReactRange } from 'rc-slider';
import * as React from 'react';
import injectSheet from 'react-jss';

import Space from '../../components/space';

import { PADDING_L, PADDING_S } from '../../../constants/styles/styles';
import { formInputStyles } from '../../../constants/styles/styles-common-rules';

import { ISheet } from '../../root.models';
import { IRangeOptions } from './form.models';

const prevArrow = require('../../../assets/images/prev-arrow.png');
const nextArrow = require('../../../assets/images/next-arrow.png');

const arrowSize = 24;

const styles = {
  tracks: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: arrowSize,
    display: 'inline-block',
    height: arrowSize,
    position: 'absolute',
    top: '50%',
    width: arrowSize,
  },
  tracksFirst: {
    backgroundImage: `url(${nextArrow})`,
    transform: `translateX(-${arrowSize / 3}px) translateY(-50%)`,
  },
  tracksLast: {
    backgroundImage: `url(${prevArrow})`,
    transform: `translateX(${arrowSize / 3}px) translateY(-50%)`,
  },
} as { [key: string]: React.CSSProperties };

const sheet: ISheet = {
  field: {
    height: formInputStyles.field.minHeight,
    margin: '0px',
    marginLeft: arrowSize / 2,
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
  options: IRangeOptions;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface IOwnState {
  values: [number, number];
}

class UnstyledRange extends React.Component<IOwnProps, IOwnState> {
  public state = {
    values: this.props.options.defaultValue || [this.props.options.range[0], this.props.options.range[1]],
  };

  public onChangeProxy = (values: [number, number]) => {
    this.setState({
      values,
    });
  };

  public render() {
    const { classes, className, options, onClick, onFocus } = this.props;
    const { values } = this.state;

    return (
      <label htmlFor={options.id} data-type={options.type} className={classnames(classes.wrapper, className)}>
        <span className={classes.label}>
          {options.icon && <FontAwesomeIcon icon={options.icon} />}
          {options.icon && options.label && <Space />}
          {`${options.label ? `${options.label}: ` : ''}${values[0]} - ${values[1]}`}
        </span>

        <div
          className={classnames(classes.fieldWrapper, options.className, {
            [classes.fieldDisabled]: options.isDisabled,
          })}
        >
          <ReactRange
            className={classes.field}
            disabled={options.isDisabled}
            defaultValue={options.defaultValue || this.state.values}
            min={options.range[0]}
            max={options.range[1]}
            handleStyle={[
              {
                ...styles.tracks,
                ...styles.tracksFirst,
              },
              {
                ...styles.tracks,
                ...styles.tracksLast,
              },
            ]}
            dotStyle={{
              ...styles.tracks,
            }}
            count={2}
            allowCross={false}
            pushable={true}
            onChange={this.onChangeProxy}
          />
        </div>
      </label>
    );
  }
}

const Range = injectSheet(sheet)(UnstyledRange);

export default Range;
