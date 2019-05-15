import React, { PureComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

const getChecked = (props, defaultChecked) => {
  if ('checked' in props && props.checked) {
    return props.checked;
  }
  if ('defaultChecked' in props && props.defaultChecked) {
    return props.defaultChecked;
  }
  return defaultChecked;
};

export type SwitchProps = {
  prefixCls?: string;
} & HTMLAttributes<HTMLSpanElement> & PropsType;

export default class Switch extends PureComponent<SwitchProps, any> {
  static defaultProps = {
    prefixCls: 'za-switch',
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: getChecked(props, false),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
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
    const { prefixCls, className, disabled, style } = this.props;
    const { checked } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--disabled`]: !!disabled,
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
