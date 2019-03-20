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
  private translateY: number = 0;
  private tabBarWidth: number = 0;

  constructor(props) {
    super(props);
    console.log('TabHeader-constructor-props', props)
    this.state = {
      activeIndex: props.activeIndex,
      activeIndexChanged: false,
      linePosition:0
    };
  }
  componentWillMount() {
    const { tabWidth, children,useTabPaged,activeIndex} = this.props
    this.tabBarWidth = tabWidth! * children.length
   
  }
  componentDidMount() {
    const { tabWidth, children,useTabPaged,activeIndex} = this.props
    this.tabBarWidth = tabWidth! * children.length
    useTabPaged && this.onMoveTo(activeIndex,0)
  }
  componentWillReceiveProps(nextProps) {
    console.log('TabHeader-componentWillReceiveProps-nextProps', nextProps)
    this.setState({ activeIndex: nextProps.activeIndex })
    nextProps.useTabPaged && this.onMoveTo(nextProps.activeIndex,500)
  }
  componentWillUnmount() {

    // 移除监听窗口变化
    Events.off(window, 'resize', this.resize);
    // Events.off(this.tabsHeaderBar, 'webkitTransitionEnd', this.transitionEnd);
    // Events.off(this.tabsHeaderBar, 'transitionend', this.transitionEnd);
    
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
    // const dom = this.tabsHeaderBar;
    const { children, onChange, tabWidth, tabHeight } = this.props;
    const {activeIndex} = this.state
    // if(activeIndex ==index){
    //   return
    // }
    let criticalCenterDistance = this.tabsHeaderBar.offsetWidth/2;   //中间点，临界值
    console.log('onMoveTo-index', index,criticalCenterDistance)
    let translateDistance=0;
    const isPrev = index-activeIndex>0
    console.log('onMoveTo-isPrev', isPrev)
    //左需不要移动
    if(tabWidth! * index < criticalCenterDistance) {
      translateDistance = 0;
      //右边不需要移动
    }else if((isPrev && this.tabBarWidth-criticalCenterDistance < tabWidth! * index)|| (!isPrev && this.tabBarWidth-criticalCenterDistance < tabWidth! * activeIndex)){
      translateDistance= this.tabsHeaderBar.offsetWidth-this.tabBarWidth;
    }else{
        console.log('左右需要移动tab',this.translateX)
        if(this.translateX<this.tabsHeaderBar.offsetWidth-this.tabBarWidth){
          translateDistance = this.tabsHeaderBar.offsetWidth-this.tabBarWidth;
        }else if(this.translateX >0){
          translateDistance =0
        }else{
          if(activeIndex-index<0){
            console.log('左右需要移动tab-向前',this.translateX)
          }else{
            console.log('左右需要移动tab-向后',this.translateX)
          }
          translateDistance=  this.translateX + (activeIndex-index)*tabWidth!
        }
    }
     
   
    const maxLength = children.length;
    const previousIndex =activeIndex
    if (index > maxLength - 1) {
      index = 0;
    } else if (index < 0) {
      index = maxLength - 1;
    }
    const activeIndexChanged = previousIndex !== index;
    let linePosition = translateDistance+tabWidth! * index
    this.doTabTransition({ x: translateDistance, y:0 }, animationDuration,true);
    this.doLineTransition({ x: linePosition, y: 0 }, animationDuration)
    this.setState({
      activeIndex: index,
      activeIndexChanged,
      // linePosition:linePosition
    });
   
    if (typeof onChange === 'function' && activeIndexChanged) {
      onChange(index);
    }
  }
  // 执行过渡line动画
  doLineTransition = (offset,animationDuration)=>{
    const { tabWidth} = this.props;
    const {activeIndex} =this.state
    const line = this.tabsHeaderline
    console.log('doLineTransition',offset)
     line.style.transform =  `translate3d(${offset.x}px, ${offset.y}px, 0)`;
    line.style.WebkitTransform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
    line.style.WebkitTransformDuration = `${animationDuration}ms`;
    line.style.transitionDuration = `${animationDuration}ms`;
  }
  
  // 执行过渡tab动画
  doTabTransition = (offset, animationDuration,update) => {
    console.log('tabs-header-doTabTransition', offset, animationDuration,update)
    const dom = this.tabsHeaderBar;
    
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
    const { horizontal,tabWidth } = this.props;
    const {activeIndex} = this.state
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
    let linePosition = this.translateX + offsetX+tabWidth! * activeIndex
    this.doTabTransition({ x: this.translateX + offsetX, y: this.translateY + offsetY }, 0,false);
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

    // const dom = this.tabsHeaderBar;
    // const timeSpan = new Date().getTime() - startTime.getTime();
    // const ratio = horizontal
    //   ? Math.abs(offsetX / tabWidth!)
    //   : Math.abs(offsetY / tabHeight!);

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
      let offsetXDis,//位移
      critical;  //临界
      if (isprev) {
        //右侧超过最大距离  弹回来
        critical = this.translateX + offsetX - tabWidth!
        if (this.tabsHeaderBar.offsetWidth - this.tabBarWidth > critical) {
          offsetXDis = this.tabsHeaderBar.offsetWidth - this.tabBarWidth
        } else {
          offsetXDis = critical
        }
      } else {
        //左侧弹性
        critical = this.translateX + offsetX + tabWidth!
        if ( critical> 0) {
          offsetXDis = 0
        } else {
          offsetXDis = critical
        }
      }
      let linePosition = offsetXDis+tabWidth! * activeIndex
      this.doTabTransition({ x: offsetXDis, y: 0 }, 500 , true)
      this.doLineTransition({ x: linePosition, y: 0 }, 500 )
      
     
      this.setState({
        //linePosition:linePosition
      });
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
          <ul role="tablist" ref={(ele) => { this.tabsHeaderBar = ele; }}>
            {React.Children.map(children, this.renderTabs)}
          </ul>
         
        </Drag>
        );
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
    const { children, useTabPaged,prefixCls,lineWidth } = this.props;
    const {linePosition} = this.state;
    const lineStyle: CSSProperties = {
      width: lineWidth?lineWidth:`${100 / children.length}%`,
      // left: linePosition?linePosition:`${(this.state.activeIndex / children.length) * 100}%`,
      // right: `${(children.length - this.state.value - 1) / children.length * 100}%`,
      // transition: `right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s`,
    };
    // const cls = classnames(`${prefixCls}__panel__item`, className, {
    //   [`${prefixCls}__panel__item--active`]: !!this.state.selected,
    // });
    return(
      <div className={`${prefixCls}__header`}>
        {this.renderHeader(children, useTabPaged)}
        <div className={`${prefixCls}__line`} style={lineStyle} ref={(ele) => { this.tabsHeaderline = ele; }}></div>
      </div>
    )
  }
    // transitionEnd = () => {
  //   console.log('tabHeader-transitionEnd-activeIndex', this.state.activeIndex)
  //   const activeIndex = this.state.activeIndex;
  //   const dom = this.tabsHeaderBar;

  //   this.translateX = -dom.offsetWidth * (activeIndex);
  //   this.translateY = -dom.offsetHeight * (activeIndex);
  //   this.doTabTransition({ x: this.translateX, y: this.translateY }, 0);

  //   // const { onChangeEnd } = this.props;
  //   // if (typeof onChangeEnd === 'function' && this.state.activeIndexChanged) {
  //   //   onChangeEnd(activeIndex);
  //   // }
  // }
}
