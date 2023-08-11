import { ScrollView, Swiper, SwiperItem, View } from '@tarojs/components';
import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { nanoid } from '../utils';
import { getRect } from '../utils/dom/dom.mini';
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

  const onTabClick = (tab: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
    if (disabled || tab.props.disabled) {
      return;
    }
    setCurrentValue(index);
  };

  const count = React.useMemo(() => React.Children.count(children), [children]);
  const lineStyle: React.CSSProperties = caclLineSizePos({
    count,
    value: currentValue,
    scrollable,
    isVertical,
    itemWidth,
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
        current={currentValue}
        circular
        onChange={(e) => {
          const { current } = e.detail;
          if (current !== currentValue) {
            setCurrentValue(current);
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
        <TabPanel {...item.props} isActive={currentValue === index} />
      ),
    );
  }

  const tabId = React.useMemo(() => nanoid(), []);
  const renderTabs = React.useCallback(
    (tab: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
      const itemCls = bem('tab', [
        {
          disabled: disabled || tab.props.disabled,
          active: currentValue === index,
        },
        tab.props.className,
      ]);

      return (
        <View
          key={+index}
          className={itemCls}
          onClick={() => onTabClick(tab, index)}
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

  const calculateLineWidth = React.useCallback(async () => {
    if (!scrollable) {
      return;
    }
    const newValue = currentValue;
    const el = tablistRef.current!.children[newValue];
    const rect = await getRect(`${el.id}`);
    setItemBoundingClientRect({
      ...rect,
    });
  }, [currentValue, isVertical, scrollable]);

  const newIndex = React.useMemo(() => {
    return currentValue - 1 < 0 ? 0 : currentValue - 1;
  }, [isVertical, currentValue]);
  const scrollIntoView = tablistRef?.current?.children?.[newIndex]?.id;

  React.useEffect(() => {
    if (React.Children.count(children)) {
      calculateLineWidth();
    }
  }, [calculateLineWidth, children]);

  const tabsId = React.useMemo(() => nanoid(), []);
  return (
    <View ref={ref} className={classes} style={style}>
      <View className={bem('header')}>
        {scrollable ? (
          <>
            <ScrollView
              className={bem('tablist')}
              ref={tablistRef}
              scrollX={!isVertical}
              scrollY={isVertical}
              id={`tabs-${tabsId}`}
              scrollWithAnimation
              // scrollLeft={itemBoundingClientRect.left}
              scrollIntoView={scrollIntoView}
            >
              {tabsRender}
              <View className={bem('line')} style={lineStyle}>
                {lineInnerRender}
              </View>
            </ScrollView>
          </>
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
