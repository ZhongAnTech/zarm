import React, { PureComponent } from 'react';
import classnames from 'classnames';

export interface PanelBodyProps {
  prefixCls?: string;
  className?: string;
}

export default class PanelBody extends PureComponent<PanelBodyProps, {}> {
  static defaultProps = {
    prefixCls: 'za-panel',
  };

  render() {
    const { prefixCls, className, children, ...others } = this.props;
    const cls = classnames(`${prefixCls}-body`, className);

    return <div {...others} className={cls}>{children}</div>;
  }
}
