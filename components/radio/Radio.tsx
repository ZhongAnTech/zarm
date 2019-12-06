import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseRadioProps } from './PropsType';
import RadioGroup from './RadioGroup';
import Cell from '../cell';

const getChecked = (props: RadioProps, defaultChecked: boolean) => {
  if (typeof props.checked !== 'undefined') {
    return props.checked;
  }
  if (typeof props.defaultChecked !== 'undefined') {
    return props.defaultChecked;
  }
  return defaultChecked;
};


export interface RadioProps extends BaseRadioProps {
  prefixCls?: string;
  className?: string;
}

export interface RadioStates {
  checked: boolean;
}

export default class Radio extends PureComponent<RadioProps, RadioStates> {
  static Group: typeof RadioGroup;

  static defaultProps = {
    prefixCls: 'za-radio',
    disabled: false,
    block: false,
  };

  state: RadioStates = {
    checked: getChecked(this.props, false),
  };

  static getDerivedStateFromProps(nextProps: RadioProps, state) {
    if ('checked' in nextProps && nextProps.checked !== state.prevChecked) {
      return {
        checked: nextProps.checked,
        prevChecked: nextProps.checked,
      };
    }

    return null;
  }

  onValueChange = () => {
    const { disabled, onChange } = this.props;
    const { checked } = this.state;

    if (disabled) {
      return;
    }

    const newChecked = !checked;
    this.setState({ checked: newChecked });

    if (typeof onChange === 'function') {
      onChange(newChecked);
    }
  };

  render() {
    const { prefixCls, className, type, value, disabled, id, children } = this.props;
    const { checked } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: !!checked,
      [`${prefixCls}--disabled`]: !!disabled,
    });

    const textCls = classnames(`${prefixCls}__text`, {
      [`${prefixCls}__text--disabled`]: disabled,
    });

    const inputRender = (
      <input
        id={id}
        type="radio"
        className={`${prefixCls}__input`}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={this.onValueChange}
      />
    );

    const radioRender = (
      <div className={`${prefixCls}__wrapper`}>
        <div className={cls}>
          <span className={`${prefixCls}__inner`} />
          {inputRender}
        </div>
        {children && <span className={textCls}>{children}</span>}
      </div>
    );

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} onClick={this.onValueChange}>
          {radioRender}
        </Cell>
      );
    }

    if (type === 'button') {
      return (
        <button type="button" className={cls}>
          {children && <span className={`${prefixCls}__text`}>{children}</span>}
          {inputRender}
        </button>
      );
    }

    return radioRender;
  }
}
