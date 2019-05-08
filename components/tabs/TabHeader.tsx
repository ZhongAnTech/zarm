import React, { PureComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import Drag from '../drag';
import Events from '../utils/events';
import TabBasePropsType from './PropsType';
import CONSTANS from './constans';

export interface TabHeaderProps extends TabBasePropsType {
  prefixCls?: string;
  className?: string;
  activeIndex?: number;
  moveDistanceRatio?: number;
  animationDuration?: number;
  onTabHeaderClick: (tab, index) => void;
}

export default class isPrevTabHeader extends PureComponent<TabHeaderProps, any> {
  static defaultProps = {
    prefixCls: 'za-tabs',
    animationDuration: CONSTANS.ANIMATION_DURATION,
    tabWidth: CONSTANS.TAB_WIDTH,
    tabHeight: CONSTANS.TAB_HEIGHT,

  };
  private tabsHeaderBar;
  private tabsHeaderline;
  private translateX: number = 0;
  private tabBarWidth: number = 0;
  private tabLineWidth: any = 0;
  private tabInEndCritical: number = 0;  //tab滑动右侧临界值

  constructor(props) {
    super(props);
    console.log('TabHeader-constructor-props', props)
    this.state = {
      activeIndex: props.activeIndex,
      activeIndexChanged: false,
      linePosition: 0,
    };
  }
  componentWillMount() {
    const { tabWidth, children, useTabPaged, lineWidth } = this.props
    this.tabBarWidth = tabWidth! * children.length;
    this.tabLineWidth = lineWidth ? lineWidth : useTabPaged ? tabWidth : `${100 / children.length}%`;
  }

  componentDidMount() {
    const { tabWidth, children, activeIndex } = this.props
    this.tabBarWidth = tabWidth! * children.length
    this.tabInEndCritical = window.screen.width - this.tabBarWidth
    this.onMoveTo(activeIndex, 0)
  }
  componentWillReceiveProps(nextProps) {
    console.log('TabHeader-componentWillReceiveProps-nextProps', nextProps)
    this.setState({ activeIndex: nextProps.activeIndex })
    this.tabsHeaderBar && this.onMoveTo(nextProps.activeIndex, CONSTANS.ANIMATION_DURATION)
  }
  componentWillUnmount() {
    // 移除监听窗口变化
    Events.off(window, 'resize', this.resize);
    // Events.off(this.tabsHeaderBar, 'webkitTransitionEnd', this.transitionEnd);
    // Events.off(this.tabsHeaderBar, 'transitionend', this.transitionEnd);

  }
  resize = () => {
    this.onMoveTo(this.state.activeIndex, 0);
  }
  // 移动到指定编号
  onMoveTo = (nextIndex, animationDuration) => {
    const { children, onChange, tabWidth, useTabPaged } = this.props;
    const { activeIndex } = this.state

    let translateDistance = 0;
    const stepDistanceX = -nextIndex * tabWidth! - this.translateX     //需要位移的距离
    let linePosition;
    if (!useTabPaged) {  
      linePosition = window.screen.width / children.length * nextIndex
    } else {
      const isForward = nextIndex - activeIndex > 0
      const criticalCenterDistance = window.screen.width / 2;   //中间点，临界值
      translateDistance = -nextIndex * tabWidth! + criticalCenterDistance   //可以移动距离
      // console.log('onMoveTo-index', nextIndex, criticalCenterDistance)
      //左需不要移动
      if (tabWidth! * nextIndex < criticalCenterDistance || (isForward && this.isTabInFront({ offsetX: stepDistanceX, offsetY: 0 }))) {
        // console.log('onMoveTo-isPrev左需不要移动')
        translateDistance = 0;
        //右边不需要移动
        // } else if ((isPrev && this.tabBarWidth - criticalCenterDistance < tabWidth! * nextIndex) || (!isPrev && this.tabBarWidth - criticalCenterDistance < tabWidth! * activeIndex)) {
      } else if (this.tabBarWidth - criticalCenterDistance < tabWidth! * nextIndex || (isForward && this.isTabInEnd({ offsetX: stepDistanceX, offsetY: 0 }))) {
        translateDistance = this.tabInEndCritical;
        // console.log('onMoveTo-isPrev右需不要移动')
      } 
      const previousIndex = activeIndex
      const activeIndexChanged = previousIndex !== nextIndex;
      linePosition = translateDistance + tabWidth! * nextIndex
      this.doTabTransition({ x: translateDistance, y: 0 }, animationDuration, true);

      this.setState({
        activeIndex: nextIndex,
        activeIndexChanged: activeIndexChanged
      });
      if (typeof onChange === 'function' && activeIndexChanged) {
        // console.log('调用onChange')
        onChange(nextIndex);
      }
    }
    this.doLineTransition({ x: linePosition, y: 0 }, animationDuration)
  }
  // 执行过渡line动画
  doLineTransition = (offset, animationDuration) => {
    Object.assign(this.tabsHeaderline.style, {
      webkitTransformDuration: `${animationDuration}ms`,
      transitionDuration: `${animationDuration}ms`,
      webkitTransform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`
    })
  }

  // 执行过渡tab动画
  doTabTransition = (offset, animationDuration, update) => {
    // console.log('tabs-header-doTabTransition', offset, animationDuration, update)
    let x = 0;
    let y = 0;
    if (this.props.horizontal) {
      x = offset.x;
    } else {
      y = offset.y;
    }
    if (update) {
      this.translateX = x
    }
    Object.assign(this.tabsHeaderBar.style, {
      WebkitTransformDuration: `${animationDuration}ms`,
      transitionDuration: `${animationDuration}ms`,
      WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
      transform: `translate3d(${x}px, ${y}px, 0)`
    })
  }


  onItemClick = (tab, index) => {
    const { onTabHeaderClick } = this.props;
    if (typeof (onTabHeaderClick) == "function") {
      onTabHeaderClick(tab, index)
    }
  }

  onDragMove = (event, { offsetX, offsetY }) => {
   console.log('onDragMove',offsetX, offsetY)
    const { activeIndex } = this.state
    if (!this.props.scrollElastic) {  //不带弹性滑动
      if (this.isTabScrollingInEnd({ offsetX, offsetY })) {
        return true;
      }
    }
    let linePosition = this.translateX + offsetX + this.props.tabWidth! * activeIndex
    this.doTabTransition({ x: this.translateX + offsetX, y: 0 }, 0, false);
    this.doLineTransition({ x: linePosition, y: 0 }, 0)
    if (event.cancelable && !event.defaultPrevented) {
          event.preventDefault();
    }
    return true
  }
  onDragEnd = (_event, { offsetX, offsetY }) => {2
    if (!offsetX && !offsetY) {
      return;
    }
    const { scrollElastic, horizontal, tabWidth } = this.props;
    if (!scrollElastic) {  //不带弹性滑动
      if (this.isTabScrollingInEnd({ offsetX, offsetY })) {
        this.doTabTransition({ x: this.translateX + offsetX, y: 0 }, 500, true)
        return false;
      }
    }
    // console.log(tabWidth, tabHeight)
    let { activeIndex } = this.state;
    const isprev = (horizontal && offsetX < 0) || (!horizontal && offsetY < 0)
    if (horizontal) {
      let offsetXDis = this.translateX + offsetX!//位移
      //右侧超过最大距离  弹回来
      if (isprev && this.isTabInEnd({ offsetX, offsetY })) {
        offsetXDis = this.tabInEndCritical
      } else if (!isprev && offsetXDis > 0) {
        offsetXDis = 0
      }
      this.doTabTransition({ x: offsetXDis, y: 0 }, 500, true)
      this.doLineTransition({ x: offsetXDis + tabWidth! * activeIndex, y: 0 }, 500)
    }
  }
  //tab 是否滑动到了头部or尾部
  isTabScrollingInEnd = (offset) => {
    const { horizontal } = this.props;
    const isprev = (horizontal && offset.offsetX < 0) || (!horizontal && offset.offsetY < 0)  //->right / down
    if (isprev && this.isTabInEnd(offset) || !isprev && this.isTabInFront(offset)) {
      return true
    } 
    return false
  }

  // 判断当前是否滑动到最前
  isTabInFront = (offset) => {
    return this.translateX + offset.offsetX > 0
  }

  // 判断当前是否否滑动到最后
  isTabInEnd = (offset) => {
    return this.tabInEndCritical > this.translateX + offset.offsetX!
  }

  renderHeader = (children, useTabPaged) => {
    const innerUlDom = (<ul role="tablist" ref={(ele) => { this.tabsHeaderBar = ele; }}>
      {React.Children.map(children, this.renderTabs)}
    </ul>)
    if (useTabPaged) {
      return (
        <Drag
          onDragMove={this.onDragMove}
          onDragEnd={this.onDragEnd}>
          {innerUlDom}
        </Drag>
      );
    } else {
      return (innerUlDom);
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
      flexBasis: (useTabPaged && horizontal) ? tabWidth : 'unset',
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
    console.log('tabHeader-render')
    const { children, useTabPaged, prefixCls, lineWidth, tabWidth } = this.props;
    const lineStyle: CSSProperties = {
      width: useTabPaged ? tabWidth : `${100 / children.length}%`
    }
    let lineInnerRender;
    if (lineWidth) {
      lineStyle.backgroundColor = 'transparent';
      lineInnerRender = <span className={`${prefixCls}__line__inner`} style={{ width: this.tabLineWidth }} />;
    }
    return (
      <div className={`${prefixCls}__header`}>
        {this.renderHeader(children, useTabPaged)}
        <div className={`${prefixCls}__line`} style={lineStyle} ref={(ele) => { this.tabsHeaderline = ele; }}>{lineInnerRender}</div>
      </div>
    )
  }
}
