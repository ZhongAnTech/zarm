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
    const { prefixCls, className, style, title, left, right } = this.props;
    const rightOnly = classnames(`${prefixCls}`, `${prefixCls}-right-only`, className);
    const cls = (!left || typeof left === 'boolean') && (right && typeof right !== 'boolean')
      ? rightOnly
      : classnames(`${prefixCls}`, className);
    const titleCls = `${prefixCls}-title`;
    const iconCls = `${prefixCls}-icon`;
    const leftCls = `${iconCls} ${prefixCls}-icon-left`;
    const rightCls = `${iconCls} ${prefixCls}-icon-right`;

    const renderLeft = (left && typeof left !== 'boolean') && <div className={leftCls}>{left}</div>;
    const renderRight = (right && typeof right !== 'boolean') && <div className={rightCls}>{right}</div>;

    return (
      <div className={cls} style={style}>
        {renderLeft}
        <div className={titleCls}>{title}</div>
        {renderRight}
      </div>
    );
  }
}
