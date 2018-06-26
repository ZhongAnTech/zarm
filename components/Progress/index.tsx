import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Spinner from '../spinner';

export interface ProgressProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Progress extends PureComponent<ProgressProps, {}> {
  static defaultProps = {
    prefixCls: 'za-progress',
    theme: 'primary',
    shape: 'line',
    strokeWidth: 5,
    percent: 15,
  };

  render() {
    const { prefixCls, className, theme, shape, strokeWidth, percent, children, ...others } = this.props;

    const cls = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      [`shape-${shape}`]: !!shape,
    });

    const innerRender = shape === 'circle'
      ? (
          <div className={`${prefixCls}-inner`}>
            <Spinner theme={theme} strokeWidth={strokeWidth} percent={percent} />
          </div>
        )
      : (
          <div className={`${prefixCls}-inner`} style={{ height: strokeWidth }}>
            <div className={`${prefixCls}-bg`} style={{ width: `${percent}%` }} />
          </div>
        );

    return (
      <div className={cls} {...others}>
        {innerRender}
        {children && <div className={`${prefixCls}-text`}>{children}</div>}
      </div>
    );
  }
}
