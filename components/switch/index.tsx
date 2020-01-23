import React, { PureComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

const getChecked = (props: SwitchProps, defaultChecked: boolean) => {
  if (typeof props.checked !== 'undefined') {
    return props.checked;
  }
  if (typeof props.defaultChecked !== 'undefined') {
    return props.defaultChecked;
  }

  return defaultChecked;
};

export type SwitchProps = {
  prefixCls?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> & PropsType;

export interface SwitchStates {
  checked: boolean;
}

export default class Switch extends PureComponent<SwitchProps, SwitchStates> {
  static displayName = 'Switch';

  static defaultProps = {
    prefixCls: 'za-switch',
    disabled: false,
  };

  state: SwitchStates = {
    checked: getChecked(this.props, false),
  };

  static getDerivedStateFromProps(nextProps: SwitchProps) {
    if (typeof nextProps.checked !== 'undefined') {
      return {
        checked: nextProps.checked,
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
    if (!('checked' in this.props)) {
      this.setState({ checked: newChecked });
    }

    if (typeof onChange === 'function') {
      onChange(newChecked);
    }
  };

  render() {
    const { prefixCls, className, disabled, style } = this.props;
    const { checked } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--disabled`]: disabled,
    });

    return (
      <span className={cls} style={style}>
        <input
          type="checkbox"
          className={`${prefixCls}__input`}
          disabled={disabled}
          checked={checked}
          onChange={this.onValueChange}
          value={checked ? 'on' : 'off'}
        />
      </span>
    );
  }
}
