import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseInputTextProps } from './PropsType';

export interface InputTextProps extends BaseInputTextProps {
  prefixCls?: string;
  className?: string;
}

export default class InputText extends PureComponent<InputTextProps, {}> {

  static defaultProps = {
    prefixCls: 'za-input',
    disabled: false,
  };

  onInputChange = (e) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(e.target.value);
    }
  }

  render() {
    const { prefixCls, className, disabled, ...others } = this.props;
    const cls = classnames(prefixCls, `${prefixCls}-text`, className, {
      disabled,
    });

    return (
      <div className={cls}>
        <input
          {...others}
          type="text"
          disabled={disabled}
          onChange={this.onInputChange}
        />
      </div>
    );
  }
}
