import React, { PureComponent, CSSProperties, ReactElement } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import TabPanel, { TabPanelProps } from './TabPanel';
import Carousel from '../carousel';
import { getTransformPropValue, getPxStyle, scrollLeftTo } from './util/index';

export interface TabsProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

interface TabsStates {
  value: number;
  prevValue?: number;
}

const getSelectIndex = (children) => {
  let selectIndex;
  React.Children.forEach(children, (item, index) => {
    if (item.props && item.props.selected) {
      selectIndex = index;
    }
  });
  return selectIndex;
};

// 这里用 94 因为如果当前的 tab 需要滚动 能方便能让用户，看出来是可以滚动的
const scrollTabTotalWidth = 94;
const defaultScrollThreshold = 3;

export default class Tabs extends PureComponent<TabsProps, TabsStates> {
  static Panel: typeof TabPanel;

  private carousel?: Carousel;

  private layout?: HTMLUListElement;

  static defaultProps = {
    prefixCls: 'za-tabs',
    disabled: false,
    canSwipe: false,
    scrollThreshold: defaultScrollThreshold,
  };

  constructor(props: Tabs['props']) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || getSelectIndex(props.children) || 0,
      // prevValue: null,
    };
  }

  static getDerivedStateFromProps(nextProps: Tabs['props'], state: Tabs['state']) {
    if ('value' in nextProps && nextProps.value !== state.prevValue) {
      return {
        value: nextProps.value,
        prevValue: nextProps.value,
      };
    }
    return null;
  }

  componentDidUpdate() {
    this.calculateScorllLeftLocation();
  }

  getTabSize = (scrollThreshold: number, tabLength: number) => scrollTabTotalWidth / Math.min(scrollThreshold, tabLength);

  setTablistRef = (ref: HTMLUListElement) => {
    this.layout = ref;
  };

  setCarouselRef = (ref: Carousel) => {
    this.carousel = ref;
  };

  onTabChange = (value: number) => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    typeof onChange === 'function' && onChange(value);
  };

  onTabClick = (tab: ReactElement<TabPanel['props'], typeof TabPanel>, index: number) => {
    const { disabled, canSwipe } = this.props;
    if (disabled || tab.props.disabled) {
      return;
    }
    if (canSwipe) {
      this.carousel && this.carousel.onSlideTo(index);
      return;
    }
    this.onTabChange(index);
  };

  renderTabs = (tab: ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
    const { prefixCls, disabled } = this.props;
    const { value } = this.state;

    const itemCls = classnames(`${prefixCls}__tab`, tab.props.className, {
      [`${prefixCls}__tab--disabled`]: disabled || tab.props.disabled,
      [`${prefixCls}__tab--active`]: value === index,
    });
    const isScroll = this.isScroll();
    const itemSize = this.calculateItemWidth();
    const liStyle = isScroll ? { flex: `0 0 ${itemSize}%` } : {};
    return (
      <li
        role="tab"
        key={+index}
        className={itemCls}
        style={liStyle}
        onClick={() => this.onTabClick(tab, index)}
      >
        {tab.props.title}
      </li>
    );
  };

  /**
   * @description: 判断当前 child 是否大于 scrollThreshold
   */
  isScroll = () => {
    const { children, scrollThreshold } = this.props;
    const ChildCount = React.Children.count(children);
    return ChildCount > scrollThreshold;
  };

  /**
   * @description: 计算每个item width
   */
  calculateItemWidth = () => {
    const { scrollThreshold } = this.props;
    const itemSize = scrollTabTotalWidth / scrollThreshold;
    return itemSize;
  };

  /**
   * @description: 计算 line 大小和位置
   */
  caclLineSizePos = () => {
    const { value } = this.state;
    const { children, scrollThreshold } = this.props;
    const ChildCount = React.Children.count(children);
    const isScroll = this.isScroll();
    const size = isScroll ? scrollTabTotalWidth / scrollThreshold : 100 / ChildCount;
    const pos = value * 100;
    const transformValue = getPxStyle(pos, '%');
    const styleUl = getTransformPropValue(transformValue);

    return {
      width: `${size}%`,
      ...styleUl,
    };
  };

  /**
   * @description: 计算滚动条移动位置
   */
  calculateScorllLeftLocation = () => {
    const screenWidth = document.body.clientWidth;
    const { children, scrollThreshold } = this.props;
    const { value } = this.state;
    const isScroll = this.isScroll();
    const ChildCount = React.Children.count(children);
    // --- https://github.com/react-component/m-tabs/blob/master/src/DefaultTabBar.tsx
    const size = this.getTabSize(scrollThreshold!, ChildCount);
    const center = scrollThreshold! / 2;
    const pos = Math.min(value, ChildCount - center - 0.5);
    const skipSize = Math.min(-(pos - center + 0.5) * size, 0);
    const scrollPos = (screenWidth * skipSize) / 100;
    // ---
    if (isScroll) {
      if (this.layout) {
        scrollLeftTo(this.layout, Math.abs(scrollPos), 0.3);
      }
    }
  };

  render() {
    const { prefixCls, className, lineWidth, canSwipe, children, disabled, scrollThreshold } = this.props;
    const { value } = this.state;
    const classes = classnames(prefixCls, className);
    // 渲染选项
    const tabsRender = React.Children.map(children, this.renderTabs);

    // 渲染内容
    let contentRender;

    if (canSwipe) {
      contentRender = (
        <Carousel
          swipeable={!disabled}
          direction="left"
          showPagination={false}
          activeIndex={value}
          ref={this.setCarouselRef}
          onChange={(v: number) => {
            this.onTabChange(v);
          }}
        >
          {React.Children.map(children, (item: ReactElement<TabPanel['props'], typeof TabPanel>, index: number) => <div key={+index}>{item.props.children}</div>)}
        </Carousel>
      );
    } else {
      contentRender = React.Children.map(children, (item: ReactElement<TabPanel['props'], typeof TabPanel>, index) => {
        return item.props.children && <TabPanel {...item.props} selected={value === index} />;
      });
    }

    const ChildCount = React.Children.count(children);
    const lineStyle: CSSProperties = this.caclLineSizePos();
    let lineInnerRender;
    if (lineWidth) {
      lineStyle.backgroundColor = 'transparent';
      lineInnerRender = <span className={`${prefixCls}__line__inner`} style={{ width: lineWidth }} />;
    }

    const headerCls = classnames(`${prefixCls}__header`, {
      [`${prefixCls}__scroll`]: ChildCount > scrollThreshold!,
    });

    return (
      <div className={classes}>
        <div className={headerCls}>
          <ul role="tablist" ref={this.setTablistRef}>
            {tabsRender}
            <div className={`${prefixCls}__line`} style={lineStyle}>{lineInnerRender}</div>
          </ul>
        </div>
        <div className={`${prefixCls}__body`}>
          {contentRender}
        </div>
      </div>
    );
  }
}
