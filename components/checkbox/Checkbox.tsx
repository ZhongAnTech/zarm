import React, { PureComponent } from 'react';
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
    block: false,
  };

  state: CheckboxStates = {
    checked: getChecked(this.props, false),
  };

  static getDerivedStateFromProps(nextProps: CheckboxProps, state) {
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
      [`${prefixCls}--checked`]: checked,
      [`${prefixCls}--disabled`]: disabled,
    });

    const textCls = classnames(`${prefixCls}__text`, {
      [`${prefixCls}__text--disabled`]: disabled,
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
      <span className={`${prefixCls}__wrapper`}>
        <span className={cls}>
          <span className={`${prefixCls}__inner`} />
          {inputRender}
        </span>
        {children && <span className={textCls}>{children}</span>}
      </span>
    );

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} onClick={this.onValueChange}>
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
