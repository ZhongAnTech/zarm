import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { PanelBodyProps } from './PropsType';

export { PanelBodyProps };

export default class PanelBody extends PureComponent<PanelBodyProps, {}> {

  static defaultProps = {
    prefixCls: 'za-panel',
  }

  render() {
    const { prefixCls, className, children, ...others } = this.props;
    const cls = classnames(`${prefixCls}-body`, className);

    return <div {...others} className={cls}>{children}</div>;
  }
}
