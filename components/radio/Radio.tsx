import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseRadioProps } from './PropsType';
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
  static Group: any;

  static defaultProps = {
    prefixCls: 'za-radio',
    theme: 'primary',
    disabled: false,
    block: false,
  };

  state: RadioStates = {
    checked: getChecked(this.props, false),
  };

  static getDerivedStateFromProps(nextProps: RadioProps) {
    if (typeof nextProps.checked !== 'undefined') {
      return {
        checked: nextProps.checked,
      };
    }

    return null;
  }

  onValueChange = () => {
    const { disabled, onChange } = this.props;

    if (disabled) {
      return;
    }

    const checked = true;
    this.setState({ checked });
    if (typeof onChange === 'function') {
      onChange(checked);
    }
  };

  render() {
    const { prefixCls, className, type, value, disabled, children } = this.props;
    const { checked } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: !!checked,
      [`${prefixCls}--disabled`]: !!disabled,
    });

    const inputRender = (
      <input
        type="radio"
        className={`${prefixCls}__input`}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={this.onValueChange}
      />
    );

    const radioRender = (
      <div className={cls}>
        <div className={`${prefixCls}__wrapper`}>
          <span className={`${prefixCls}__inner`} />
          {children && <span className={`${prefixCls}__text`}>{children}</span>}
          {inputRender}
        </div>
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
