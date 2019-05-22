import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseRadioProps } from './PropsType';
import Cell from '../cell';
import Button from '../button';
import Icon from '../icon';

const getChecked = (props, defaultChecked) => {
  if ('checked' in props && props.checked) {
    return props.checked;
  }
  if ('defaultChecked' in props && props.defaultChecked) {
    return props.defaultChecked;
  }
  return defaultChecked;
};

export interface RadioProps extends BaseRadioProps {
  prefixCls?: string;
  className?: string;
}

export default class Radio extends PureComponent<RadioProps, any> {
  static Group: any;

  static defaultProps = {
    prefixCls: 'za-radio',
    theme: 'primary',
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

    if (disabled) {
      return;
    }

    const checked = true;
    this.setState({ checked });
    if (typeof onChange === 'function') {
      onChange(checked);
    }
  };

  render() {
    const { prefixCls, className, type, shape, block, value, disabled, children } = this.props;
    const { checked } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: !!checked,
      [`${prefixCls}--disabled`]: !!disabled,
    });

    const inputRender = (
      <input
        type="radio"
        className={`${prefixCls}__input`}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={this.onValueChange}
      />
    );

    if (type === 'cell') {
      return (
        <Cell
          className={cls}
          disabled={disabled}
          description={checked && <Icon type="right" theme={disabled ? undefined : 'primary'} />}
          onClick={() => {}}
        >
          {inputRender}
          {children}
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

    return (
      <div className={cls}>
        <div className={`${prefixCls}__wrapper`}>
          <span className={`${prefixCls}__inner`} />
          {children && <span className={`${prefixCls}__text`}>{children}</span>}
          {inputRender}
        </div>
      </div>
    );
  }
}
