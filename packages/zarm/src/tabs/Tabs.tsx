import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import type { CarouselHTMLElement } from '../carousel';
import Carousel from '../carousel';
import { ConfigContext } from '../config-provider';
import { getStyleComputedProperty, scrollTo } from '../utils/dom';
import type { HTMLProps } from '../utils/utilityTypes';
import TabsContext from './context';
import type { BaseTabsProps, TabsCssVars } from './interface';
import type { TabPanelProps } from './TabPanel';
import TabPanel from './TabPanel';
import useTabs from './useTabs';
import { caclLineSizePos, getAllValue } from './util/index';

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

  const onTabClick = (
    tab: React.ReactElement<TabPanelProps, typeof TabPanel>,
    index: number,
    value: string | number,
  ) => {
    if (disabled || tab.props.disabled) {
      return;
    }
    if (swipeable) {
      carouselRef.current && carouselRef.current!.onSlideTo(index);
      return;
    }
    setCurrentValue(value);
  };

  const values = getAllValue(children);
  const currentIndex = values.indexOf(currentValue);
  const lineStyle: React.CSSProperties = caclLineSizePos({
    count: React.Children.count(children),
    value: currentIndex,
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
        <TabPanel {...item.props} value={item.props.value ?? index} />
      ),
    );
  }

  const renderTabs = (tab: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
    const value = tab.props.value || index;
    const itemCls = bem('tab', [
      {
        disabled: disabled || tab.props.disabled,
        active: currentValue === value,
      },
      tab.props.className,
    ]);

    return (
      <li role="tab" key={+index} className={itemCls} onClick={() => onTabClick(tab, index, value)}>
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

    const prevTabItem = tablistRef.current!.childNodes[currentIndex] as HTMLElement;
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
    <TabsContext.Provider
      value={{
        current: currentValue,
      }}
    >
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
    </TabsContext.Provider>
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
