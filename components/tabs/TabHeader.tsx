import React, { PureComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import Drag from '../drag';
import Events from '../utils/events';
import TabBasePropsType from './PropsType';

export interface TabHeaderProps extends TabBasePropsType {
  prefixCls?: string;
  className?: string;
  loop?: number;
  activeIndex?: number;
  moveDistanceRatio?: number;
  animationDuration?: number;
  onTabHeaderClick: (tab, index) => void;
}

export default class TabHeader extends PureComponent<TabHeaderProps, any> {
  static defaultProps = {
    prefixCls: 'za-tabs',
    loop: 0,
    animationDuration: 300,
    tabWidth: 70,
    tabHeight: 40,

  };
  private tabsItems;
  private translateX: number = 0;
  private translateY: number = 0;
  private tabBarWidth: number = 0;

  constructor(props) {
    super(props);
    console.log('TabHeader-constructor-props', props)
    this.state = {
      selected: props.selected || props.defaultSelected,
      activeIndex: props.activeIndex,
      activeIndexChanged: false,
    };
  }
  componentWillMount() {
    const { tabWidth, children } = this.props
    this.tabBarWidth = tabWidth! * children.length
  }
  componentWillReceiveProps(nextProps) {
    console.log('TabHeader-componentWillReceiveProps-nextProps', nextProps)
    this.setState({ activeIndex: nextProps.activeIndex })
  }
  componentWillUnmount() {

    // 移除监听窗口变化
    Events.off(window, 'resize', this.resize);
    Events.off(this.tabsItems, 'webkitTransitionEnd', this.transitionEnd);
    Events.off(this.tabsItems, 'transitionend', this.transitionEnd);
  }
  resize = () => {
    this.onJumpTo(this.state.activeIndex);
  }
  // 静默跳到指定编号
  onJumpTo = (index) => {
    this.onMoveTo(index, 0);
  }
  // 移动到指定编号
  onMoveTo = (index, animationDuration) => {
    console.log('onMoveTo-index', index)
    // const dom = this.tabsItems;

    const { children, onChange, tabWidth, tabHeight } = this.props;
    const maxLength = children.length;
    const previousIndex = this.state.activeIndex;
    this.translateX = -tabWidth! * index;
    this.translateY = -tabHeight! * index;
    this.doTransition({ x: this.translateX, y: this.translateY }, animationDuration);

    if (index > maxLength - 1) {
      index = 0;
    } else if (index < 0) {
      index = maxLength - 1;
    }
    const activeIndexChanged = previousIndex !== index;
    this.setState({
      activeIndex: index,
      activeIndexChanged,
    });

    if (typeof onChange === 'function' && activeIndexChanged) {
      onChange(index);
    }
  }
  // 执行过渡动画
  doTransition = (offset, animationDuration) => {
    console.log('tabs-header-doTransition', offset, animationDuration)
    const dom = this.tabsItems;
    let x = 0;
    let y = 0;
    if (this.props.horizontal) {
      x = offset.x;
    } else {
      y = offset.y;
    }
    if (animationDuration > 0) {
      this.translateX = x
    }
    //  this.translateX = x
    //  this.translateY = y
    dom.style.WebkitTransformDuration = `${animationDuration}ms`;
    dom.style.transitionDuration = `${animationDuration}ms`;
    dom.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0)`;
    dom.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }


  onItemClick = (tab, index) => {
    const { onTabHeaderClick } = this.props;
    if (typeof (onTabHeaderClick) == "function") {
      onTabHeaderClick(tab, index)
    }
  }
  onDragStart = (event) => {
    console.log('onDragStart', event)
  }
  onDragMove = (event, { offsetX, offsetY }) => {
    console.log('onDragMove', offsetX, offsetY)
    console.log('this.translateX ', this.translateX)
    const { horizontal } = this.props;
    if (this.isLastIndex()) {
      if (
        horizontal && offsetX < 0 ||
        !horizontal && offsetY < 0
      ) {
        return false;
      }
    }

    // 在首页时禁止拖动
    // if (this.isFirstIndex()) {
    //   if (
    //     horizontal && offsetX > 0 ||
    //     !horizontal && offsetY > 0
    //   ) {
    //     return false;
    //   }
    // }
    this.doTransition({ x: this.translateX + offsetX, y: this.translateY + offsetY }, 0);
    return true
  }
  onDragEnd = (_event, { offsetX, offsetY }) => {
    console.log('onDragEnd', offsetX, offsetY)
    console.log('onDragEnd-translateX', this.translateX)
    if (!offsetX && !offsetY) {
      return;
    }

    const { moveDistanceRatio, horizontal, tabWidth, tabHeight } = this.props;
    console.log(tabWidth, tabHeight)
    console.log(tabWidth, tabHeight)
    let { activeIndex } = this.state;

    // const dom = this.tabsItems;
    // const timeSpan = new Date().getTime() - startTime.getTime();
    const ratio = horizontal
      ? Math.abs(offsetX / tabWidth!)
      : Math.abs(offsetY / tabHeight!);

    // 判断滑动临界点
    // 1.滑动距离超过0，且滑动距离和父容器长度之比超过moveDistanceRatio
    // 2.滑动释放时间差低于moveTimeSpan
    // if (ratio >= moveDistanceRatio! ) {
    const isprev = (horizontal && offsetX < 0) || (!horizontal && offsetY < 0)

    activeIndex = isprev
      ? activeIndex + 1
      : activeIndex - 1;
    // }

    if (horizontal) {
      let offsetXDis;

      if (isprev) {
        //右侧超过最大距离  弹回来
        let maxOffset = this.tabsItems.offsetWidth - this.tabBarWidth

        if (maxOffset > this.translateX + offsetX - tabWidth!) {
          console.log('h-----', 1)
          offsetXDis = maxOffset
        } else {
          console.log('h-----', 2)
          offsetXDis = this.translateX + offsetX - tabWidth!
        }
      } else {
        //左侧弹性
        if (this.translateX + offsetX + tabWidth! > 0) {
          console.log('h-----', 3)
          offsetXDis = 0
        } else {
          console.log('h-----', 4)
          offsetXDis = this.translateX + offsetX + tabWidth!
        }
      }
      this.doTransition({ x: offsetXDis, y: 0 }, 500)
    }

    // this.onSlideTo(activeIndex);
  }
  // 判断当前是否在最后一页
  isLastIndex = () => {
    return this.state.activeIndex >= this.props.children.length - 1;
  }

  // 判断当前是否在第一页
  isFirstIndex = () => {
    return this.state.activeIndex <= 0;
  }
  transitionEnd = () => {
    console.log('tabHeader-transitionEnd-activeIndex', this.state.activeIndex)
    const activeIndex = this.state.activeIndex;
    const dom = this.tabsItems;

    this.translateX = -dom.offsetWidth * (activeIndex);
    this.translateY = -dom.offsetHeight * (activeIndex);
    this.doTransition({ x: this.translateX, y: this.translateY }, 0);

    // const { onChangeEnd } = this.props;
    // if (typeof onChangeEnd === 'function' && this.state.activeIndexChanged) {
    //   onChangeEnd(activeIndex);
    // }
  }

  // 滑动到指定编号
  onSlideTo = (index) => {
    this.onMoveTo(index, this.props.animationDuration);
  }
  renderHeader = (children, useTabPaged) => {
    if (useTabPaged) {
      return (
        <Drag
          onDragStart={this.onDragStart}
          onDragMove={this.onDragMove}
          onDragEnd={this.onDragEnd}>
          <ul role="tablist" ref={(ele) => { this.tabsItems = ele; }}>
            {React.Children.map(children, this.renderTabs)}
          </ul>
        </Drag>);
    } else {
      return (<ul role="tablist">{React.Children.map(children, this.renderTabs)}</ul>);
    }
  }
  // 是否横向移动

  renderTabs = (tab, index) => {
    // console.log('TabsHeader-renderTabs-tab',this.props)
    const { prefixCls, disabled, useTabPaged, horizontal, tabWidth, tabHeight } = this.props;
    const itemCls = classnames(`${prefixCls}__header__item`, tab.props.className, {
      [`${prefixCls}__header__item--disabled`]: disabled || tab.props.disabled,
    });
    const tabItemStyle: CSSProperties = {
      flexBasis: (useTabPaged && horizontal) ? tabWidth : 'auto',
      height: (useTabPaged && !horizontal) ? tabHeight : 'auto'
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
    const { children, useTabPaged } = this.props;

    // const cls = classnames(`${prefixCls}__panel__item`, className, {
    //   [`${prefixCls}__panel__item--active`]: !!this.state.selected,
    // });

    return this.renderHeader(children, useTabPaged);
  }
}
