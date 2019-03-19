import React, { PureComponent, CSSProperties } from 'react';
import TabBasePropsType from './PropsType';
import classnames from 'classnames';
import TabPanel from './TabPanel';
import TabHeader from './TabHeader';
import Carousel from '../carousel';


const getSelectIndex = (children) => {
  console.log('Tabs-getSelectIndex-children', children)
  let selectIndex;
  React.Children.forEach(children, (item: any, index) => {
    if (item.props && item.props.selected) {
      selectIndex = index;
    }
  });
  return selectIndex;
};

export interface TabsProps extends TabBasePropsType {
  prefixCls?: string;
  className?: string;
}

export default class Tabs extends PureComponent<TabsProps, any> {
  static Panel: any;

  static defaultProps = {
    prefixCls: 'za-tabs',
    disabled: false,
    hasline: false,
    canSwipe: false,
    page: 5,
    useTabPaged: false,
    horizontal: true,
    tabWidth: 70,
    tabHeight: 40,
    moveDistanceRatio: 0.5
  };

  private carousel;


  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || getSelectIndex(props.children) || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('Tabs-componentWillReceiveProps-nextProps', nextProps)
    if ('value' in nextProps || getSelectIndex(nextProps.children)) {
      this.setState({
        value: nextProps.value || nextProps.defaultValue || getSelectIndex(nextProps.children) || 0,
      });
      if (typeof nextProps.onChange === 'function') {
        nextProps.onChange(nextProps.value);
      }
    }
  }

  onSwipeChange = (value) => {
    const { onChange } = this.props;
    this.setState({ value });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  onTabClick = (tab, index) => {
    const { disabled, canSwipe, onChange } = this.props;
    if (disabled || tab.props.disabled) {
      return;
    }
    this.setState({ value: index });
    if (typeof onChange === 'function') {
      onChange(index);
    }
    if (canSwipe) {
      this.carousel.onSlideTo(index);
    }
  }



  render() {
    const { prefixCls, className, lineWidth, hasline, canSwipe, children, horizontal, useTabPaged } = this.props;
    console.log('Tabs-render-children', children)
    const classes = classnames(prefixCls, className,
      { [`${prefixCls}--hasline`]: hasline },
      { [`${prefixCls}--paged`]: useTabPaged },
      `${prefixCls}--${horizontal ? 'horizontal' : 'vertical'}`);
    console.log('Tabs-render-itemCls', classes)


    // const headerClasses = classnames()
    // const direction = this.isDirectionX() ? 'horizontal' : 'vertical';
    // const cls = classnames(prefixCls, className, `${prefixCls}--${direction}`);
    // 渲染选项

    // const tabsRender = React.Children.map(children, this.renderTabs);

    // const tabsRender = (
    //   <Drag>
    //   <div>
    //      {React.Children.map(children, this.renderTabs)}
    //   </div>
    // </Drag>);
    // 渲染内容
    let contentRender;
    if (canSwipe) {
      contentRender = (
        <Carousel
          direction="left"
          showPagination={false}
          activeIndex={this.state.value}
          ref={(ele) => { this.carousel = ele; }}
          onChange={(value) => this.onSwipeChange(value)}
        >
          {React.Children.map(children, (item: any) => <div>{item.props.children}</div>)}
        </Carousel>
      );
    } else {
      contentRender = React.Children.map(children, (item: any, index) => {
        return <TabPanel {...item.props} selected={this.state.value === index} />;
      });
    }

    const lineStyle: CSSProperties = {
      width: `${100 / children.length}%`,
      left: `${(this.state.value / children.length) * 100}%`,
      // right: `${(children.length - this.state.value - 1) / children.length * 100}%`,
      // transition: `right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s`,
    };

    let lineInnerRender;
    if (lineWidth) {
      lineStyle.backgroundColor = 'transparent';
      lineInnerRender = <span className={`${prefixCls}__line__inner`} style={{ width: lineWidth }} />;
    }

    return (
      <div className={classes}>
        <div className={`${prefixCls}__header`}>
          {/* {this.renderHeader(children,useTabPaged)} */}
          <TabHeader
            {...this.props}
            activeIndex={this.state.value}
            onTabHeaderClick={(tab, index) => { this.onTabClick(tab, index) }}

          ></TabHeader>
          <div className={`${prefixCls}__line`} style={lineStyle}>{lineInnerRender}</div>
        </div>
        <div className={`${prefixCls}__container`}>
          {contentRender}
        </div>
      </div>
    );
  }
}
