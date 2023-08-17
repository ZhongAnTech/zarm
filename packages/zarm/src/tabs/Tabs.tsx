import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import type { CarouselHTMLElement } from '../carousel';
import Carousel from '../carousel';
import { ConfigContext } from '../config-provider';
import { getStyleComputedProperty, scrollTo } from '../utils/dom';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseTabsProps } from './interface';
import type { TabPanelProps } from './TabPanel';
import TabPanel from './TabPanel';
import useTabs from './useTabs';
import { caclLineSizePos } from './util/index';

export interface TabsCssVars {
  '--font-size'?: React.CSSProperties['fontSize'];
  '--color'?: React.CSSProperties['color'];
  '--color-disabled'?: React.CSSProperties['color'];
  '--height'?: React.CSSProperties['height'];
  '--active-color'?: React.CSSProperties['color'];
  '--active-line-height'?: React.CSSProperties['height'];
  '--padding-horizontal'?: React.CSSProperties['left'];
  '--padding-vertical'?: React.CSSProperties['top'];
}

export type TabsProps = BaseTabsProps & HTMLProps<TabsCssVars>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>> {
  Panel: typeof TabPanel;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const { className, style, disabled, swipeable, scrollable, direction, lineWidth, children } =
    props;

  const carouselRef = React.useRef<CarouselHTMLElement>(null);
  const tablistRef = React.useRef<HTMLUListElement>(null);
  const [itemWidth, setItemWidth] = React.useState(0);
  const [currentValue, setCurrentValue] = useTabs(props);

  // const [currentValue, setCurrentValue] = useControllableValue(props)

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('tabs', { prefixCls });

  const isVertical: boolean = direction === 'vertical';

  const classes = bem([
    {
      [`${direction}`]: true,
      scroll: scrollable,
    },
    className,
  ]);

  const onTabClick = (tab: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
    if (disabled || tab.props.disabled) {
      return;
    }
    if (swipeable) {
      carouselRef.current && carouselRef.current!.onSlideTo(index);
      return;
    }
    setCurrentValue(index);
  };

  const lineStyle: React.CSSProperties = caclLineSizePos({
    count: React.Children.count(children),
    value: currentValue,
    scrollable,
    isVertical,
    itemWidth,
    el: tablistRef?.current?.children?.[currentValue],
  });

  let lineInnerRender;
  if (lineWidth) {
    lineStyle.backgroundColor = 'transparent';
    lineInnerRender = <span className={bem('line__inner')} style={{ width: lineWidth }} />;
  }

  // 渲染内容
  let contentRender;
  if (swipeable) {
    contentRender = (
      <Carousel
        swipeable={!disabled}
        direction={direction}
        showPagination={false}
        activeIndex={currentValue}
        ref={carouselRef}
        onChange={setCurrentValue}
      >
        {React.Children.map(children, (item: any, index: number) => (
          <div key={+index}>{item.props.children}</div>
        ))}
      </Carousel>
    );
  } else {
    contentRender = React.Children.map(
      children,
      (item: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => (
        <TabPanel {...item.props} isActive={currentValue === index} />
      ),
    );
  }

  const renderTabs = (tab: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
    const itemCls = bem('tab', [
      {
        disabled: disabled || tab.props.disabled,
        active: currentValue === index,
      },
      tab.props.className,
    ]);

    return (
      <li role="tab" key={+index} className={itemCls} onClick={() => onTabClick(tab, index)}>
        {tab.props.title}
      </li>
    );
  };

  // 渲染选项
  const tabsRender = React.Children.map(children, renderTabs);

  const calculateLineWidth = React.useCallback(() => {
    if (!scrollable) {
      return;
    }
    const newValue = currentValue;
    const el = tablistRef.current!.children[newValue];
    const size = isVertical
      ? getStyleComputedProperty(el, 'height')
      : getStyleComputedProperty(el, 'width');

    setItemWidth(parseInt(size.toString(), 10));
  }, [currentValue, isVertical, scrollable]);

  const calculateScorllLeftLocation = React.useCallback(() => {
    if (!scrollable) {
      return false;
    }
    const newValue = currentValue;

    const prevTabItem = tablistRef.current!.childNodes[newValue] as HTMLElement;
    if (scrollable && tablistRef.current && prevTabItem) {
      const { offsetWidth: layoutOffsetWidth = 0, offsetHeight: layoutOffsetHeight = 0 } =
        tablistRef.current;
      const left = prevTabItem.offsetLeft + prevTabItem.offsetWidth / 2 - layoutOffsetWidth / 2;
      const top = prevTabItem.offsetTop + prevTabItem.offsetHeight / 2 - layoutOffsetHeight / 2;

      scrollTo(tablistRef.current, top, left, 0.3);
    }
  }, [currentValue, scrollable]);

  React.useEffect(() => {
    if (React.Children.count(children)) {
      calculateLineWidth();
      calculateScorllLeftLocation();
    }
  }, [calculateLineWidth, calculateScorllLeftLocation, children]);

  return (
    <div ref={ref} className={classes} style={style}>
      <div className={bem('header')}>
        <ul className={bem('tablist')} role="tablist" ref={tablistRef}>
          {tabsRender}
          <div className={bem('line')} style={lineStyle}>
            {lineInnerRender}
          </div>
        </ul>
      </div>
      <div className={bem('body')}>{contentRender}</div>
    </div>
  );
}) as CompoundedComponent;

Tabs.displayName = 'Tabs';

Tabs.defaultProps = {
  disabled: false,
  swipeable: false,
  scrollable: false,
  direction: 'horizontal',
};

export default Tabs;
