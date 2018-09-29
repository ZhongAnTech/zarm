import React from 'react';
import BaseNavbarProps from './PropsType';
import classnames from 'classnames';

export interface NavBarProps extends BaseNavbarProps {
  prefixCls?: string;
  className?: string;
}

export default class NavBar extends React.PureComponent<NavBarProps> {
  static defaultProps = {
    prefixCls: 'za-nav-bar',
  };

  render() {
    const {
      prefixCls,
      className,
      style,
      title,
      left,
      right,
    } = this.props;
    const cls = classnames(`${prefixCls}`, className);
    const titleCls = `${prefixCls}-title`;
    const iconCls = `${prefixCls}-icon`;
    const leftCls = `${iconCls} ${prefixCls}-icon-left`;
    const rightCls = `${iconCls} ${prefixCls}-icon-right`;

    return (
      <div style={style} className={cls}>
        <div className={leftCls}>{left}</div>
        <div className={titleCls}>{title}</div>
        <div className={rightCls}>{right}</div>
      </div>
    );
  }
}
