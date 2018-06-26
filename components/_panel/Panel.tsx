import React, { PureComponent } from 'react';
import classnames from 'classnames';

export interface PanelProps {
  prefixCls?: string;
  className?: string;
}

export default class Panel extends PureComponent<PanelProps, {}> {
  static Header: any;
  static Body: any;
  static Footer: any;

  static defaultProps = {
    prefixCls: 'za-panel',
  };

  render() {
    const { prefixCls, className, children } = this.props;
    const cls = classnames(`${prefixCls}`, className);

    return <div className={cls}>{children}</div>;
  }
}
