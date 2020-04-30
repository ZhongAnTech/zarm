import React, { PureComponent, ChangeEvent, InputHTMLAttributes, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';
import { BaseCheckboxProps } from './PropsType';
import CheckboxGroup from './CheckboxGroup';
import Cell from '../cell';

const getChecked = (props: CheckboxProps, defaultChecked: boolean) => {
  if (typeof props.checked !== 'undefined') {
    return props.checked;
  }
  if (typeof props.defaultChecked !== 'undefined') {
    return props.defaultChecked;
  }
  return defaultChecked;
};

type CheckboxSpanProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'>;
type CheckboxCellProps = Omit<HTMLAttributes<HTMLDivElement>, 'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'>;
type CheckboxButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'>;

export type CheckboxProps = Partial<CheckboxSpanProps & CheckboxCellProps & CheckboxButtonProps> & BaseCheckboxProps & {
  prefixCls?: string;
};

export interface CheckboxStates {
  checked?: boolean;
  prevChecked?: boolean;
}

export default class Checkbox extends PureComponent<CheckboxProps, CheckboxStates> {
  static Group: typeof CheckboxGroup;

  static displayName = 'Checkbox';

  static defaultProps = {
    prefixCls: 'za-checkbox',
    disabled: false,
    indeterminate: false,
  };

  state: CheckboxStates = {
    checked: getChecked(this.props, false),
  };

  static getDerivedStateFromProps(nextProps: CheckboxProps, state: CheckboxStates) {
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

    typeof onChange === 'function' && onChange(e);
  };

  render() {
    const { prefixCls, className, type, shape, value, checked, defaultChecked, disabled, id, indeterminate, children, onChange, ...rest } = this.props;
    const { checked: checkedState } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: checkedState,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--indeterminate`]: indeterminate,
      [`${prefixCls}--untext`]: !children,
    });

    const inputRender = (
      <input
        id={id}
        type="checkbox"
        className={`${prefixCls}__input`}
        value={value}
        disabled={disabled}
        checked={checkedState}
        onChange={this.onValueChange}
      />
    );

    const checkboxRender = (
      <span className={cls} {...rest as CheckboxSpanProps}>
        <span className={`${prefixCls}__widget`}>
          <span className={`${prefixCls}__inner`} />
        </span>
        {children && <span className={`${prefixCls}__text`}>{children}</span>}
        {inputRender}
      </span>
    );

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} className={className} onClick={() => {}} {...rest as CheckboxCellProps}>
          {checkboxRender}
        </Cell>
      );
    }

    if (type === 'button') {
      return (
        <button type="button" disabled={disabled} className={cls} {...rest as CheckboxButtonProps}>
          {children}
          {inputRender}
        </button>
      );
    }

    return checkboxRender;
  }
}
