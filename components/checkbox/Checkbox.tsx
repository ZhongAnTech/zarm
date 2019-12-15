import React, { PureComponent, ChangeEvent } from 'react';
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


export interface CheckboxProps extends BaseCheckboxProps {
  prefixCls?: string;
  className?: string;
}

export interface CheckboxStates {
  checked: boolean;
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

  // props有checked的情况下，通过onchange改变props的checked，从而改变内部state。
  // props没有checked的情况下，通过内部setState改变。

  static getDerivedStateFromProps(nextProps: CheckboxProps, state) {
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
    if (this.props.checked === undefined) {
      this.setState({ checked: newChecked });
    }

    if (typeof onChange === 'function') {
      onChange(e);
    }
  };

  render() {
    const { prefixCls, className, type, value, disabled, id, indeterminate, children } = this.props;
    const { checked } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: checked,
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
        checked={checked}
        onChange={this.onValueChange}
      />
    );

    const checkboxRender = (
      <span className={cls}>
        <span className={`${prefixCls}__widget`}>
          <span className={`${prefixCls}__inner`} />
        </span>
        {children && <span className={`${prefixCls}__text`}>{children}</span>}
        {inputRender}
      </span>
    );

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} onClick={() => {}}>
          {checkboxRender}
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

    return checkboxRender;
  }
}
