import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseCheckboxProps } from './PropsType';
import Cell from '../cell';
import Button from '../button';

function getChecked(props, defaultChecked) {
  if ('checked' in props && props.checked) {
    return props.checked;
  }
  if ('defaultChecked' in props && props.defaultChecked) {
    return props.defaultChecked;
  }
  return defaultChecked;
}

export interface CheckboxProps extends BaseCheckboxProps {
  prefixCls?: string;
  className?: string;
}

export default class Checkbox extends PureComponent<CheckboxProps, any> {
  static Group: any;

  static defaultProps = {
    prefixCls: 'za-checkbox',
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
    const { prefixCls, className, shape, type, value, block, disabled, id, children } = this.props;
    const { checked } = this.state;

    const cls = classnames(`${prefixCls}`, className, {
      [`shape-${shape}`]: !!shape,
      checked,
      disabled,
    });

    const renderCheckbox = (
      <div className={cls}>
        <div className={`${prefixCls}-wrapper`}>
          <span className={`${prefixCls}-inner`} />
          {children && <span className={`${prefixCls}-text`}>{children}</span>}
          <input
            id={id}
            type="checkbox"
            className={`${prefixCls}-input`}
            disabled={disabled}
            checked={checked}
            onChange={this.onValueChange}
          />
        </div>
      </div>
    );

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} onClick={this.onValueChange}>
          {renderCheckbox}
        </Cell>
      );
    }

    if (type === 'button') {
      return (
        <Button
          className={cls}
          theme="primary"
          shape={shape}
          size="xs"
          block={block}
          ghost={!checked}
          disabled={disabled}
        >
          <input
            type="checkbox"
            className={`${prefixCls}-input`}
            value={value}
            disabled={disabled}
            checked={checked}
            onChange={this.onValueChange}
          />
          {children}
        </Button>
      );
    }

    return renderCheckbox;
  }
}
