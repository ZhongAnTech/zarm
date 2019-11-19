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
    theme: 'danger',
  };

  render() {
    const { prefixCls, className, theme, shape, text, children, ...others } = this.props;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${theme}`]: !!theme,
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--sup`]: !!children,
    });

    return (
      <span className={cls}>
        {children}
        <sup className={`${prefixCls}__content`} {...others}>{shape !== 'dot' && text}</sup>
      </span>
    );
  }
}
