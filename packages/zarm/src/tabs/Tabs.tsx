import React, { PureComponent, CSSProperties, ReactElement } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import TabPanel, { TabPanelProps } from './TabPanel';
import Carousel from '../carousel';
import { getTransformPropValue, getPxStyle } from './util/index';
import { scrollTo } from '../utils/dom';

export interface TabsProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

interface TabsStates {
  value: number;
  prevValue?: number;
  itemWidth: number;
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

export default class Tabs extends PureComponent<TabsProps, TabsStates> {
  static Panel: typeof TabPanel;

  private carousel?: Carousel;

  private layout?: HTMLUListElement;

  static defaultProps = {
    prefixCls: 'za-tabs',
    disabled: false,
    swipeable: false,
    scrollable: false,
    direction: 'horizontal',
  };

  constructor(props: Tabs['props']) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || getSelectIndex(props.children) || 0,
      itemWidth: 0,
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

  componentDidMount() {
    const { children } = this.props;
    if (React.Children.count(children)) {
      this.calculateLineWidth();
      this.calculateScrollLeftLocation();
    }
  }

  componentDidUpdate(prevstate) {
    const { value: prevValue, children: prevChild } = prevstate;
    const { value } = this.state;
    const { children } = this.props;
    if (prevValue !== value || prevChild !== children) {
      this.calculateLineWidth();
    }
    this.calculateScrollLeftLocation();
  }

  get isVertical() {
    const { direction } = this.props;
    return direction === 'vertical';
  }

  get currentValue() {
    const { value } = this.state;
    const { children } = this.props;
    const count = React.Children.count(children);
    if (value < 0) {
      return 0;
    }
    if (value > count - 1) {
      return count - 1;
    }
    return value;
  }

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
    const { disabled, swipeable } = this.props;
    if (disabled || tab.props.disabled) {
      return;
    }
    if (swipeable) {
      this.carousel && this.carousel.onSlideTo(index);
      return;
    }
    this.onTabChange(index);
  };

  renderTabs = (tab: ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
    if (!tab) {
      return;
    }
    const { prefixCls, disabled } = this.props;
    const { value } = this.state;

    const itemCls = classnames(`${prefixCls}__tab`, tab.props.className, {
      [`${prefixCls}__tab--disabled`]: disabled || tab.props.disabled,
      [`${prefixCls}__tab--active`]: value === index,
    });
    return (
      <li role="tab" key={+index} className={itemCls} onClick={() => this.onTabClick(tab, index)}>
        {tab.props.title}
      </li>
    );
  };

  /**
   * @description: 计算 line 大小和位置
   */
  caclLineSizePos = () => {
    const { itemWidth } = this.state;
    const value = this.currentValue;
    const { children, scrollable } = this.props;
    let ChildCount = React.Children.count(children);
    if (Array.isArray(children)) {
      ChildCount = children.filter((i) => i).length;
    }
    let pos = 100 * value;
    if (scrollable && this.layout) {
      const el = this.layout!.children[value];
      const { offsetLeft = 0, offsetTop = 0 } = el as HTMLElement;
      pos = this.isVertical ? offsetTop : offsetLeft;
    }

    const size = scrollable ? `${itemWidth}px` : `${100 / ChildCount}%`;
    const transformValue = scrollable
      ? getPxStyle(pos, 'px', this.isVertical)
      : getPxStyle(pos, '%', this.isVertical);
    const styleUl = getTransformPropValue(transformValue);
    const itemSize = this.isVertical ? { height: `${size}` } : { width: `${size}` };

    return {
      ...styleUl,
      ...itemSize,
    };
  };

  /**
   * @description: 计算滚动条移动位置
   */
  calculateScrollLeftLocation = () => {
    const { scrollable } = this.props;
    if (!scrollable) {
      return false;
    }
    const value = this.currentValue;
    if (scrollable && this.layout && this.layout.childNodes[value]) {
      const {
        offsetWidth: layoutOffsetWidth = 0,
        offsetHeight: layoutOffsetHeight = 0,
      } = this.layout;
      const curTab = this.layout.childNodes[value] as HTMLElement;
      const left = curTab.offsetLeft + curTab.offsetWidth / 2 - layoutOffsetWidth / 2;
      const top = curTab.offsetTop + curTab.offsetHeight / 2 - layoutOffsetHeight / 2;

      scrollTo(this.layout, top, left, 0.3);
    }
  };

  calculateLineWidth = () => {
    const { scrollable } = this.props;
    if (!scrollable) {
      return;
    }
    const value = this.currentValue;
    const el = this.layout!.children[value];
    const size = this.isVertical
      ? this.getComputedStyle(el, 'height')
      : this.getComputedStyle(el, 'width');

    this.setState({
      itemWidth: parseInt(size, 10),
    });
  };

  getComputedStyle = (el, prop) => {
    let value = '0';
    if (prop in el.style) {
      value = el.style[prop] || getComputedStyle(el).getPropertyValue(prop) || '0';
    }
    return value;
  };

  render() {
    const {
      prefixCls,
      className,
      lineWidth,
      swipeable,
      children,
      disabled,
      scrollable,
      direction,
    } = this.props;
    const value = this.currentValue;
    const classes = classnames(prefixCls, className, `${prefixCls}--${direction}`, {
      [`${prefixCls}--scroll`]: scrollable,
    });

    // 渲染选项
    let _children = children;
    if (Array.isArray(_children)) {
      _children = _children.filter((i) => i);
    }
    const tabsRender = React.Children.map(_children, this.renderTabs);

    // 渲染内容
    let contentRender;

    if (swipeable) {
      contentRender = (
        <Carousel
          swipeable={!disabled}
          direction={direction === 'vertical' ? 'up' : 'left'}
          showPagination={false}
          activeIndex={value}
          ref={this.setCarouselRef}
          onChange={(v: number) => {
            this.onTabChange(v);
          }}
        >
          {React.Children.map(children, (item: any, index: number) => (
            <div key={+index}>{item.props.children}</div>
          ))}
        </Carousel>
      );
    } else {
      contentRender = React.Children.map(
        _children,
        (item: ReactElement<TabPanel['props'], typeof TabPanel>, index) => {
          return (
            item && item.props.children && <TabPanel {...item.props} selected={value === index} />
          );
        },
      );
    }

    const lineStyle: CSSProperties = this.caclLineSizePos();

    let lineInnerRender;
    if (lineWidth) {
      lineStyle.backgroundColor = 'transparent';
      lineInnerRender = (
        <span className={`${prefixCls}__line__inner`} style={{ width: lineWidth }} />
      );
    }

    return (
      <div className={classes}>
        <div className={`${prefixCls}__header`}>
          <ul className={`${prefixCls}__tablist`} role="tablist" ref={this.setTablistRef}>
            {tabsRender}
            <div className={`${prefixCls}__line`} style={lineStyle}>
              {lineInnerRender}
            </div>
          </ul>
        </div>
        <div className={`${prefixCls}__body`}>{contentRender}</div>
      </div>
    );
  }
}
