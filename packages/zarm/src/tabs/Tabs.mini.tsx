import { ScrollView, Swiper, SwiperItem, View } from '@tarojs/components';
import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { nanoid } from '../utils';
import { getRect, getRects } from '../utils/dom/dom.mini';
import type { HTMLProps } from '../utils/utilityTypes';
import TabsContext from './context';
import type { BaseTabsProps, TabsCssVars } from './interface';
import type { TabPanelProps } from './TabPanel';
import TabPanel from './TabPanel';
import useTabs from './useTabs';
import { caclLineSizePos, getAllValue } from './util/index';

// export { TabsCssVars } from  './interface';

export type TabsProps = BaseTabsProps & HTMLProps<TabsCssVars>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<typeof View>> {
  Panel: typeof TabPanel;
}

const Tabs = React.forwardRef<unknown, TabsProps>((props, ref) => {
  const { className, style, disabled, swipeable, scrollable, direction, lineWidth, children } =
    props;

  const tablistRef = React.useRef(null);

  const [itemBoundingClientRect, setItemBoundingClientRect] = React.useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    offsetLeft: 0,
    offsetTop: 0,
  });
  const [currentValue, setCurrentValue] = useTabs(props);
  const isVertical: boolean = direction === 'vertical';

  const itemWidth = isVertical ? itemBoundingClientRect.height : itemBoundingClientRect.width;

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('tabs', { prefixCls });

  const classes = bem([
    {
      [`${direction}`]: true,
      scroll: scrollable,
    },
    className,
  ]);

  const swiperCurrent = React.useRef(0);

  const onTabClick = (
    tab: React.ReactElement<TabPanelProps, typeof TabPanel>,
    index: number,
    value: string | number,
  ) => {
    if (disabled || tab.props.disabled) {
      return;
    }
    swiperCurrent.current = index;
    setCurrentValue(value);
  };

  const count = React.useMemo(() => React.Children.count(children), [children]);
  const values = getAllValue(children);

  const lineStyle: React.CSSProperties = caclLineSizePos({
    count,
    value: values.indexOf(currentValue),
    scrollable,
    isVertical,
    itemWidth,
    el: {
      offsetLeft: itemBoundingClientRect.left,
      offsetTop: itemBoundingClientRect.top,
    },
  });

  let lineInnerRender;
  if (lineWidth) {
    lineStyle.backgroundColor = 'transparent';
    lineInnerRender = <span className={bem('line__inner')} style={{ width: lineWidth }} />;
  }

  // 渲染内容
  let contentRender;
  if (swipeable && !disabled) {
    contentRender = (
      <Swiper
        vertical={isVertical}
        current={swiperCurrent.current}
        circular
        onChange={(e) => {
          const { current } = e.detail;
          if (current !== currentValue) {
            swiperCurrent.current = current;
            setCurrentValue(children[current].props.value ?? current);
          }
        }}
      >
        {React.Children.map(children, (item: any, index: number) => (
          <SwiperItem>
            <View key={+index}>{item.props.children}</View>
          </SwiperItem>
        ))}
      </Swiper>
    );
  } else {
    contentRender = React.Children.map(
      children,
      (item: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => (
        <TabPanel {...item.props} value={item.props.value ?? index} />
      ),
    );
  }

  const tabId = React.useMemo(() => nanoid(), []);
  const renderTabs = React.useCallback(
    (tab: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
      const value = tab.props.value || index;
      const itemCls = bem('tab', [
        {
          disabled: disabled || tab.props.disabled,
          active: currentValue === value,
        },
        tab.props.className,
      ]);

      return (
        <View
          key={+index}
          className={itemCls}
          onClick={() => onTabClick(tab, index, value)}
          id={`tab-item-${tabId}-${index}`}
        >
          {tab.props.title}
        </View>
      );
    },
    [disabled, currentValue],
  );

  // 渲染选项
  const tabsRender = React.Children.map(children, renderTabs);

  const tabsId = React.useMemo(() => `tabs-${nanoid()}`, []);

  const calculateLineWidth = React.useCallback(async () => {
    if (!scrollable) {
      return;
    }
    const newValue = currentValue;
    const el = tablistRef.current!.children[newValue];
    const rect = await getRect(`${el.id}`);
    const tabItemClassName = bem('tab');
    const rects = await getRects(`#${tabsId} > .${tabItemClassName}`);
    let i = 0;
    let left = 0;
    let top = 0;
    while (i < currentValue) {
      left += rects[i].width;
      if (isVertical) {
        top += rects[i].height;
      }
      i += 1;
    }
    const maxOffsetLeft = left - rect.width;
    const maxOffsetTop = top - rect.height;
    const offsetLeft = rects[newValue].left - rect.width / 2 + rects[newValue].width / 2;
    const offsetTop = rects[newValue].top - rect.height / 2 + rects[newValue].height / 2;
    setItemBoundingClientRect({
      ...rect,
      left,
      top,
      offsetLeft: Math.min(Math.max(offsetLeft, 0), maxOffsetLeft),
      offsetTop: Math.min(Math.max(offsetTop, 0), maxOffsetTop),
    });
  }, [currentValue, isVertical, scrollable]);

  React.useEffect(() => {
    if (React.Children.count(children)) {
      calculateLineWidth();
    }
  }, [calculateLineWidth, children]);

  return (
    <TabsContext.Provider
      value={{
        current: currentValue,
      }}
    >
      <View ref={ref} className={classes} style={style}>
        <View className={bem('header')}>
          {scrollable ? (
            <ScrollView
              className={bem('tablist')}
              ref={tablistRef}
              scrollX={!isVertical}
              scrollY={isVertical}
              id={tabsId}
              scrollWithAnimation
              showScrollbar={false}
              enableFlex
              scrollLeft={isVertical ? 0 : itemBoundingClientRect.offsetLeft}
              scrollTop={isVertical ? itemBoundingClientRect.offsetTop : 0}
            >
              {tabsRender}
              <View className={bem('line')} style={lineStyle}>
                {lineInnerRender}
              </View>
            </ScrollView>
          ) : (
            <View className={bem('tablist')} ref={tablistRef}>
              {tabsRender}
              <View className={bem('line')} style={lineStyle}>
                {lineInnerRender}
              </View>
            </View>
          )}
        </View>
        <View className={bem('body')}>{contentRender}</View>
      </View>
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
