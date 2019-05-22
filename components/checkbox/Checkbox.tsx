import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseCheckboxProps } from './PropsType';
import Cell from '../cell';
import Button from '../button';

const getChecked = (props, defaultChecked) => {
  if ('checked' in props && props.checked) {
    return props.checked;
  }
  if ('defaultChecked' in props && props.defaultChecked) {
    return props.defaultChecked;
  }
  return defaultChecked;
};

export interface CheckboxProps extends BaseCheckboxProps {
  prefixCls?: string;
  className?: string;
}

export default class Checkbox extends PureComponent<CheckboxProps, any> {
  static Group: any;

  static defaultProps = {
    prefixCls: 'za-checkbox',
    disabled: false,
    block: false,
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
    const { prefixCls, className, shape, type, value, block, disabled, id, children } = this.props;
    const { checked } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: !!checked,
      [`${prefixCls}--disabled`]: !!disabled,
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

    const renderCheckbox = (
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
          {inputRender}
          {children}
        </Button>
      );
    }

    return renderCheckbox;
  }
}
