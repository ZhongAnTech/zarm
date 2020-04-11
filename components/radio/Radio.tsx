import React, { PureComponent, ChangeEvent, InputHTMLAttributes, HTMLAttributes, ButtonHTMLAttributes } from 'react';
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

type RadioSpanProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'>;
type RadioCellProps = Omit<HTMLAttributes<HTMLDivElement>, 'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'>;
type RadioButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'>;

export type RadioProps = Partial<RadioSpanProps & RadioCellProps & RadioButtonProps> & BaseRadioProps & {
  prefixCls?: string;
};

export interface RadioStates {
  checked: boolean;
}

export default class Radio extends PureComponent<RadioProps, RadioStates> {
  static Group: typeof RadioGroup;

  static defaultProps = {
    prefixCls: 'za-radio',
    disabled: false,
    shape: 'radius',
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

  onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { disabled, onChange } = this.props;
    const { checked } = this.state;

    if (disabled) {
      return;
    }

    const newChecked = !checked;
    if (!('checked' in this.props)) {
      this.setState({ checked: newChecked });
    }

    if (typeof onChange === 'function') {
      onChange(e);
    }
  };

  render() {
    const { prefixCls, className, type, shape, value, checked, defaultChecked, disabled, id, children, onChange, ...rest } = this.props;
    const { checked: checkedState } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: checkedState,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--untext`]: !children,
    });

    const inputRender = (
      <input
        id={id}
        type="radio"
        className={`${prefixCls}__input`}
        value={value}
        disabled={disabled}
        checked={checkedState}
        onChange={this.onValueChange}
      />
    );

    const radioRender = (
      <span className={cls} {...rest as RadioSpanProps}>
        <span className={`${prefixCls}__widget`}>
          <span className={`${prefixCls}__inner`} />
        </span>
        {children && <span className={`${prefixCls}__text`}>{children}</span>}
        {inputRender}
      </span>
    );

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} className={className} onClick={() => {}} {...rest as RadioCellProps}>
          {radioRender}
        </Cell>
      );
    }

    if (type === 'button') {
      return (
        <button type="button" disabled={disabled} className={cls} {...rest as RadioButtonProps}>
          {children}
          {inputRender}
        </button>
      );
    }

    return radioRender;
  }
}
