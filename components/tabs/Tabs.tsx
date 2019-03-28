import React, { PureComponent } from 'react';
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
    defaultValue:0,
    useTabPaged: false,
    horizontal: true,
    moveDistanceRatio: 0.5,
    scrollElastic:true
  };

  private carousel;


  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || getSelectIndex(props.children) || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
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
    const { onChange  } = this.props;
    
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
    const { prefixCls, className, hasline, canSwipe, children, horizontal, useTabPaged } = this.props;
    
    const classes = classnames(prefixCls, className,
      { [`${prefixCls}--hasline`]: hasline },
      { [`${prefixCls}--paged`]: useTabPaged },
      `${prefixCls}--${horizontal ? 'horizontal' : 'vertical'}`);
    console.log('Tabs-render-itemCls', classes)
    // 渲染内容
    let contentRender;
    if (canSwipe) {
      contentRender = (
        <Carousel
          direction={horizontal?"left":"right"}
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
    return (
      <div className={classes}>
          <TabHeader
            {...this.props}
            activeIndex={this.state.value}
            onTabHeaderClick={(tab, index) => { this.onTabClick(tab, index) }}
          ></TabHeader>
        <div className={`${prefixCls}__container`}>
          {contentRender}{this.state.value}
        </div>
      </div>
    );
  }
}
