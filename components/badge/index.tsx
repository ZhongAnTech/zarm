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
    shape: 'dot',
    theme: 'error',
    sup: false,
  };

  render() {
    const { prefixCls, className, theme, shape, sup, text, children, ...others } = this.props;

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
        <sup className={supCls} {...others}>{shape !== 'dot' && text}</sup>
      </span>
    );
  }
}
