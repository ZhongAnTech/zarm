import React, { PureComponent, MouseEventHandler } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

export interface MaskProps extends PropsType {
  prefixCls?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default class Mask extends PureComponent<MaskProps, {}> {
  static defaultProps = {
    prefixCls: 'za-mask',
    visible: false,
    type: 'normal',
  };

  render() {
    const { prefixCls, className, visible, type, onClick, ...others } = this.props;
    const markCls = classnames(`${prefixCls}`, className, type);
    return visible && <div className={markCls} onClick={onClick} {...others} />;
  }
}
