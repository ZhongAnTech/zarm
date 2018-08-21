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
    // size: 'normal',
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
    if (disabled) {
      return;
    }

    const checked = !this.state.checked;
    this.setState({ checked });
    if (typeof onChange === 'function') {
      onChange(checked);
    }
  }

  render() {
    const { prefixCls, className, disabled, ...others } = this.props;
    const { checked } = this.state;

    const cls = classnames(`${prefixCls}`, className, {
      // [`${prefixCls}-small`]: size === 'small',
      checked,
      disabled,
    });

    return (
      <span {...others} className={cls} >
        <input
          type="checkbox"
          className={`${prefixCls}-input`}
          disabled={disabled}
          checked={checked}
          onChange={this.onValueChange}
        />
      </span>
    );
  }
}
