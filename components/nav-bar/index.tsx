import React from 'react';
import BaseNavbarProps from './PropsType';
import Icon from '../icon';
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
    const cls = classnames(`${prefixCls}`, className);
    const titleCls = `${prefixCls}-title`;
    const iconCls = `${prefixCls}-icon`;
    const leftCls = `${prefixCls}-left ${iconCls}`;
    const rightCls = `${prefixCls}-right ${iconCls}`;

    const renderLeft = () => {
      if (left && typeof left === 'boolean') {
        return (
          <div className={leftCls}>
            <Icon type="arrow-left" />
          </div>
        );
      } else if (!!left) {
        return (
          <div className={leftCls}>
            {left}
          </div>
        );
      }
    };

    const renderRight = (typeof right !== 'boolean') &&
      <div className={rightCls}>
        {right}
      </div>;

    return (
      <div className={cls} style={style}>
        {renderLeft()}
        <div className={titleCls}>{title}</div>
        {renderRight}
      </div>
    );
  }
}
