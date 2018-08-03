import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

export interface BadgeProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Badge extends PureComponent<BadgeProps, {}> {
  static defaultProps = {
    prefixCls: 'za-badge',
    theme: 'error',
    sup: false,
    visible: true,
  };

  render() {
    const { prefixCls, className, theme, shape, sup, text, visible, children, ...others } = this.props;

    const cls = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      [`shape-${shape}`]: !!shape,
    });

    const supCls = classnames(`${prefixCls}-sup`, {
      [`${prefixCls}-sup-up`]: sup,
    });

    return (
      <span className={cls}>
        {children}
        {visible && <sup className={supCls} {...others}>{text}</sup>}
      </span>
    );
  }
}
