import React, { PureComponent } from 'react';
import TabBasePropsType from './PropsType';
import classnames from 'classnames';
import TabPanel from './TabPanel';
import TabHeader from './TabHeader';
import Carousel from '../carousel';


const getSelectIndex = (children) => {
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
    swipeable: false,
    defaultActiveKey:0,
    useTabPaged: false,
    horizontal: true,
    scrollElastic:true,
    activeKey:0
  };

  private carousel;


  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.activeKey || props.defaultActiveKey || getSelectIndex(props.children) || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps || getSelectIndex(nextProps.children)) {
      this.setState({
        activeKey: nextProps.activeKey || nextProps.defaultActiveKey || getSelectIndex(nextProps.children) || 0,
      });
      if (typeof nextProps.onChange === 'function') {
        nextProps.onChange(nextProps.activeKey);
      }
    }
  }

  onSwipeChange = (activeKey) => {
    const { onChange  } = this.props;
    
    this.setState({ activeKey });
    if (typeof onChange === 'function') {
      onChange(activeKey);
    }
  }

  onTabClick = (tab, index) => {
    const { disabled, swipeable, onChange } = this.props;
    if (disabled || tab.props.disabled) {
      return;
    }
    this.setState({ activeKey: index });
    if (typeof onChange === 'function') {
      onChange(index);
    }
    if (swipeable) {
      this.carousel.onSlideTo(index);
    }
  }



  render() {
    const { prefixCls, className, hasline, swipeable, children, horizontal, useTabPaged ,page} = this.props;
    
    const classes = classnames(prefixCls, className,
      { [`${prefixCls}--hasline`]: hasline },
      { [`${prefixCls}--paged`]: page?false:useTabPaged },
      `${prefixCls}--${horizontal ? 'horizontal' : 'vertical'}`);
    // 渲染内容
    let contentRender;
    if (swipeable) {
      contentRender = (
        <Carousel
          direction={horizontal?"left":"right"}
          showPagination={false}
          activeIndex={this.state.activeKey}
          ref={(ele) => { this.carousel = ele; }}
          onChange={(activeKey) => this.onSwipeChange(activeKey)}
        >
          {React.Children.map(children, (item: any) => <div>{item.props.children}</div>)}
        </Carousel>
      );
    } else {
      contentRender = React.Children.map(children, (item: any, index) => {
        return <TabPanel {...item.props} selected={this.state.activeKey === index} />;
      });
    }
    return (
      <div className={classes}>
          <TabHeader
            {...this.props}
            activeIndex={this.state.activeKey}
            onTabHeaderClick={(tab, index) => { this.onTabClick(tab, index) }}
          ></TabHeader>
        <div className={`${prefixCls}__container`}>
          {contentRender}
        </div>
      </div>
    );
  }
}
