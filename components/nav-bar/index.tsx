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
    const leftClsIcon = `${prefixCls}-left-icon`;
    const rightClsIcon = `${prefixCls}-right-icon`;

    const renderLeft = () => {
      if (left && typeof left === 'boolean') {
        return (
          <div className={leftClsIcon}>
            <Icon type="arrow-left" />
          </div>
        );
      } else if (!!left) {
        return (
          <div className={leftClsIcon}>
            {left}
          </div>
        );
      }
    };

    const renderRight = (typeof right !== 'boolean') &&
      <div className={rightClsIcon}>
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
