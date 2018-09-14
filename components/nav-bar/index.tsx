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
    const leftCls = `${prefixCls}-left`;
    const leftClsIcon = classnames(`${prefixCls}-left-icon`, iconCls);
    const rightCls = `${prefixCls}-right`;

    const renderLeft = () => {
      if (left && typeof left === 'boolean') {
        return (
          <Icon className={leftClsIcon} theme="success" type="arrow-left" />
        );
      } else if (!!left) {
        return (
          <div className={leftCls}>
            {left}
          </div>
        );
      }
    };

    const renderRight = () => {
      if (right && typeof right !== 'boolean') {
        return (
          <div className={rightCls}>
            {right}
          </div>
        );
      }
    };

    return <div className={cls} style={style}>
        {renderLeft()}
        <div className={titleCls}>{title}</div>
        {renderRight()}
      </div>;
  }
}
