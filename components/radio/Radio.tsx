import React, { PureComponent, ChangeEvent } from 'react';
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
    this.setState({ checked: newChecked });

    if (typeof onChange === 'function') {
      onChange(e);
    }
  };

  render() {
    const { prefixCls, className, type, value, disabled, id, children } = this.props;
    const { checked } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: !!checked,
      [`${prefixCls}--disabled`]: !!disabled,
      [`${prefixCls}--untext`]: !children,
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
