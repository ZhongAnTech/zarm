import React, { PureComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import Drag from '../drag';
import TabBasePropsType from './PropsType';
import CONSTANS from './constans';

export interface TabHeaderProps extends TabBasePropsType {
  prefixCls?: string;
  className?: string;
  activeIndex?: number;
  animationDuration?: number;
  onTabHeaderClick: (tab, index) => void;
}

export default class IsPrevTabHeader extends PureComponent<TabHeaderProps, any> {
  static defaultProps = {
    prefixCls: 'za-tabs',
    tabWidth: CONSTANS.TAB_WIDTH,
    tabHeight: CONSTANS.TAB_HEIGHT,
    scrollThreshold: 4,
  };

  private tabsHeaderBar;
  private tabsHeaderline;
  private translateX: number = 0;
  private tabBarWidth: number = 0;
  private barWidth: number = 0;
  private tabInEndCritical: number = 0;  // tab滑动右侧临界值

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
      linePosition: 0,
    };
  }

  componentDidMount() {
    const { tabWidth, children, activeIndex } = this.props;
    this.tabBarWidth = tabWidth! * children.length;
    this.barWidth = this.tabsHeaderBar.offsetWidth || 420;
    this.tabInEndCritical = this.barWidth - this.tabBarWidth;
    this.onMoveTo(activeIndex, 0);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ activeIndex: nextProps.activeIndex });
    if (this.tabsHeaderBar) {
      this.onMoveTo(nextProps.activeIndex, CONSTANS.ANIMATION_DURATION);
    }
  }

  // 移动到指定编号
  onMoveTo = (nextIndex, animationDuration) => {
    const { children, onChange, tabWidth, scrollThreshold } = this.props;
    const { activeIndex } = this.state;

    let translateDistance = 0;
    const sdX = - nextIndex * tabWidth! - this.translateX;     // 需要位移的距离 stepDistanceX
    let linePosition;
    if (scrollThreshold && children.length > scrollThreshold) {
      const isF = nextIndex - activeIndex > 0;   // isF = isForward

      const cd = this.barWidth / 2;   // 中间点，临界值 cd = criticalCenterDistance
      translateDistance = -nextIndex * tabWidth! + cd;  // 可以移动距离
      // 左需不要移动
      let tAW = tabWidth! * nextIndex;    //
      if (tAW < cd || (isF && this.isTabInFront({ offsetX: sdX, offsetY: 0 }))) {
        translateDistance = 0;
      } else if (this.tabBarWidth - cd < tAW || (isF && this.isTabInEnd({ offsetX: sdX, offsetY: 0 }))) {
        translateDistance = this.tabInEndCritical;
      }
      linePosition = translateDistance + tAW;
      this.doTabTransition({ x: translateDistance, y: 0 }, animationDuration, true);

      this.setState({
        activeIndex: nextIndex,
      });
      if (typeof onChange === 'function' && activeIndex !== nextIndex) {
        onChange(nextIndex);
      }
    } else {
      linePosition = this.barWidth / children.length * nextIndex;
    }

    this.doLineTransition({ x: linePosition, y: 0 }, animationDuration);
  }

  // 执行过渡line动画
  doLineTransition = (offset, animationDuration) => {
    Object.assign(this.tabsHeaderline.style, {
      webkitTransformDuration: `${animationDuration}ms`,
      transitionDuration: `${animationDuration}ms`,
      webkitTransform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    });
  }

  // 执行过渡tab动画
  doTabTransition = (offset, animationDuration, update) => {
    let x = 0;
    if (this.props.direction === 'top') {
      x = offset.x;
    }
    if (update) {
      this.translateX = x;
    }
    Object.assign(this.tabsHeaderBar.style, {
      WebkitTransformDuration: `${animationDuration}ms`,
      transitionDuration: `${animationDuration}ms`,
      WebkitTransform: `translate3d(${x}px, 0px, 0)`,
      transform: `translate3d(${x}px, 0px, 0)`,
    });
  }

  onItemClick = (tab, index) => {
    const { onTabHeaderClick } = this.props;
    if (typeof onTabHeaderClick === 'function') {
      onTabHeaderClick(tab, index);
    }
  }

  onDragMove = (event, { offsetX, offsetY }) => {
    const { activeIndex } = this.state;
    // if (!this.props.scrollElastic) {  // 不带弹性滑动
    if (this.isTabScrollingInEnd({ offsetX, offsetY })) {
      return false;
    }
    // }
    let linePosition = this.translateX + offsetX + this.props.tabWidth! * activeIndex;
    this.doTabTransition({ x: this.translateX + offsetX, y: 0 }, 0, false);
    this.doLineTransition({ x: linePosition, y: 0 }, 0);
    if (event.cancelable && !event.defaultPrevented) {
      event.preventDefault();
    }
    return true;
  }
  onDragEnd = (_event, { offsetX, offsetY }) => {
    if (!offsetX && !offsetY) {
      return;
    }
    const { direction, tabWidth } = this.props;
    let { activeIndex } = this.state;
    if (direction === 'top') {
      let offsetXDis = this.translateX + offsetX!; // 位移
      this.doTabTransition({ x: offsetXDis, y: 0 }, 500, true);
      this.doLineTransition({ x: offsetXDis + tabWidth! * activeIndex, y: 0 }, 500);
    }
  }
  // tab 是否滑动到了头部or尾部
  isTabScrollingInEnd = (offset) => {
    const { direction } = this.props;
    const isprev = (direction === 'top' && offset.offsetX < 0); // ->right / down
    if ((isprev && this.isTabInEnd(offset)) || (!isprev && this.isTabInFront(offset))) {
      return true;
    }
    return false;
  }

  // 判断当前是否滑动到最前
  isTabInFront = (offset) => {
    return this.translateX + offset.offsetX > 0;
  }

  // 判断当前是否否滑动到最后
  isTabInEnd = (offset) => {
    return this.tabInEndCritical > this.translateX + offset.offsetX!;
  }

  renderHeader = (children, scrollThreshold) => {
    const innerUlDom = (<ul role="tablist" ref={(ele) => { this.tabsHeaderBar = ele; }}>
      {React.Children.map(children, this.renderTabs)}
    </ul>);
    if (scrollThreshold && children.length > scrollThreshold) {
      return (
        <Drag
          onDragMove={this.onDragMove}
          onDragEnd={this.onDragEnd}
        >
          {innerUlDom}
        </Drag>
      );
    } else {
      return (innerUlDom);
    }
  }

  // 是否横向移动
  renderTabs = (tab, index) => {
    const { prefixCls, direction, tabWidth, scrollThreshold, children } = this.props;
    const itemCls = classnames(`${prefixCls}__header__item`, tab.props.className, {
      [`${prefixCls}__header__item--disabled`]: tab.props.disabled,
    });
    const ifUseTabWidth = scrollThreshold && children.length > scrollThreshold && direction === 'top';
    const tabItemStyle: CSSProperties = {
      flexBasis: ifUseTabWidth ? tabWidth : 'unset',
      height: 'auto',
    };

    return (
      <li
        role="tab"
        key={+index}
        className={itemCls}
        style={tabItemStyle}
        onClick={() => this.onItemClick(tab, index)}
      >
        {tab.props.title}
      </li>
    );
  }
  render() {
    const { children, prefixCls, tabWidth, scrollThreshold } = this.props;
    const usePage = scrollThreshold && children.length > scrollThreshold;
    const lineStyle: CSSProperties = {
      width: usePage ? tabWidth : `${100 / children.length}%`,
    };
    lineStyle.backgroundColor = 'transparent';
    let lineInnerRender = <span className={`${prefixCls}__line__inner`} style={{ width: '80%' }} />;
    return (
      <div className={`${prefixCls}__header`}>
        {this.renderHeader(children, scrollThreshold)}
        <div className={`${prefixCls}__line`} style={lineStyle} ref={(ele) => { this.tabsHeaderline = ele; }}>
          {lineInnerRender}
        </div>
      </div>
    );
  }
}
