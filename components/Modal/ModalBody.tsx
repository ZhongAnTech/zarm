import React, { PureComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import { ModalBodyProps } from './PropsType';

export { ModalBodyProps };

export default class ModalBody extends PureComponent<ModalBodyProps, {}> {

  static defaultProps = {
    prefixCls: 'za-modal',
  };

  render() {
    const { prefixCls, className, height, children, ...others } = this.props;
    const cls = classnames(`${prefixCls}-body`, className);

    const bodyStyle: CSSProperties = {};
    bodyStyle.height = height;

    return (
      <div className={cls} style={bodyStyle} {...others}>
        {children}
      </div>
    );
  }
}
