import React, { PureComponent, CSSProperties, ReactElement } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import TabPanel, { TabPanelProps } from './TabPanel';
import Carousel from '../carousel';
import { getTransformPropValue, getPxStyle } from './util/index';

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
    this.calculateLineWidth();
  }

  componentDidUpdate(prevstate) {
    const { value: prevValue } = prevstate;
    const { value } = this.state;
    if (prevValue !== value) {
      this.calculateLineWidth();
    }
    this.calculateScorllLeftLocation();
  }

  get isVertical() {
    const { direction } = this.props;
    return direction === 'vertical';
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
    const { prefixCls, disabled } = this.props;
    const { value } = this.state;

    const itemCls = classnames(`${prefixCls}__tab`, tab.props.className, {
      [`${prefixCls}__tab--disabled`]: disabled || tab.props.disabled,
      [`${prefixCls}__tab--active`]: value === index,
    });
    return (
      <li
        role="tab"
        key={+index}
        className={itemCls}
        onClick={() => this.onTabClick(tab, index)}
      >
        {tab.props.title}
      </li>
    );
  };

  /**
   * @description: 计算每个item width
   */
  calculateItemWidth = () => {
    const { scrollThreshold } = this.props;
    const itemSize = 100 / scrollThreshold;
    return itemSize;
  };

  /**
   * @description: 计算 line 大小和位置
   */
  caclLineSizePos = () => {
    const { value, itemWidth } = this.state;
    const { children, scrollable } = this.props;
    const ChildCount = React.Children.count(children);
    let pos = 100 * value;
    if (scrollable && this.layout) {
      const el = this.layout!.children[value];
      const { offsetLeft = 0, offsetTop = 0 } = el as HTMLElement;
      pos = this.isVertical ? offsetTop : offsetLeft;
    }

    const size = scrollable ? `${itemWidth}px` : `${100 / ChildCount}%`;
    const transformValue = scrollable ? getPxStyle(pos, 'px', this.isVertical) : getPxStyle(pos, '%', this.isVertical);
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
  calculateScorllLeftLocation = () => {
    const { value } = this.state;
    const { scrollable } = this.props;
    const prevTabItem = this.layout!.childNodes[value - 1];
    if (scrollable && this.layout && prevTabItem) {
      const { offsetTop: top = 0, offsetLeft: left = 0 } = prevTabItem as HTMLElement;
      this.layout.scrollTo({
        top,
        left,
        behavior: 'smooth',
      });
    }
  };

  calculateLineWidth = () => {
    const { scrollable } = this.props;
    const { value } = this.state;
    const { width, height } = this.getComputedStyle(this.layout!.children[value]);
    scrollable && this.setState({
      itemWidth: parseInt(this.isVertical ? height.toString() : width.toString(), 10),
    });
  };

  getComputedStyle = (el) => {
    const { width, height } = window.getComputedStyle(el);
    return {
      width: width || '0',
      height: height || '0',
    };
  };

  render() {
    const { prefixCls, className, lineWidth, swipeable, children, disabled, scrollable, direction, height } = this.props;
    const { value } = this.state;
    const classes = classnames(prefixCls, className, {
      [`${prefixCls}--${direction}`]: true,
    });
    // 渲染选项
    const tabsRender = React.Children.map(children, this.renderTabs);

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
          height={height}
          onChange={(v: number) => {
            this.onTabChange(v);
          }}
        >
          {React.Children.map(children, (item: any, index: number) => <div key={+index}>{item.props.children}</div>)}
        </Carousel>
      );
    } else {
      contentRender = React.Children.map(children, (item: ReactElement<TabPanel['props'], typeof TabPanel>, index) => {
        return item.props.children && <TabPanel {...item.props} selected={value === index} />;
      });
    }

    const lineStyle: CSSProperties = this.caclLineSizePos();

    let lineInnerRender;
    if (lineWidth) {
      lineStyle.backgroundColor = 'transparent';
      lineInnerRender = <span className={`${prefixCls}__line__inner`} style={{ width: lineWidth }} />;
    }

    const headerCls = classnames(`${prefixCls}__header`, {
      [`${prefixCls}__header--scroll`]: scrollable,
    });

    return (
      <div className={classes} style={this.isVertical ? { height } : {}}>
        <div className={headerCls}>
          <ul className={`${prefixCls}__tab__list`} role="tablist" ref={this.setTablistRef}>
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
