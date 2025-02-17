import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import type { CarouselHTMLElement } from '../carousel';
import Carousel from '../carousel';
import { ConfigContext } from '../config-provider';
import { useTypeChangeWarning } from '../utils/deprecationWarning';
import { scrollTo } from '../utils/dom';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseTabsProps } from './interface';
import type { TabPanelProps } from './TabPanel';
import TabPanel from './TabPanel';
import { getPxStyle, getTransformPropValue } from './util/index';

const getChildChecked = (children: TabPanelProps['children']) => {
  let selectIndex;
  React.Children.forEach(children, (item, index) => {
    if (React.isValidElement(item) && item.props && item.props.selected) {
      selectIndex = index;
    }
  });
  return selectIndex;
};

const parseValueBoundary = (
  inputValue: TabsProps['value'],
  children: TabPanelProps['children'],
) => {
  const count = React.Children.count(children);
  if (inputValue! <= 0) {
    return 0;
  }
  if (inputValue! > count - 1) {
    return count - 1;
  }
  return inputValue;
};

const getValue = (props: TabsProps, defaultValue: TabsProps['value']) => {
  if (typeof props.value !== 'undefined') {
    return parseValueBoundary(props.value, props.children);
  }
  if (typeof props.defaultValue !== 'undefined') {
    return parseValueBoundary(props.defaultValue, props.children);
  }
  if (getChildChecked(props.children)) {
    return parseValueBoundary(getChildChecked(props.children), props.children);
  }
  return parseValueBoundary(defaultValue, props.children);
};

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
  const {
    className,
    style,
    value,
    defaultValue,
    disabled,
    swipeable,
    scrollable,
    direction,
    lineWidth,
    onChange,
    children,
  } = props;

  // TODO: DeprecationWarning - remove this warning in next major version
  useTypeChangeWarning(
    ['vertical', 'horizontal'].includes(direction),
    'Tabs',
    'direction',
    direction,
    "'top' | 'right' | 'bottom' | 'left'",
  );

  const carouselRef = React.useRef<CarouselHTMLElement>(null);
  const tablistRef = React.useRef<HTMLUListElement>(null);
  const [itemWidth, setItemWidth] = React.useState(0);
  const [currentValue, setCurrentValue] = React.useState(
    getValue({ value, defaultValue, children }, 0),
  );

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('tabs', { prefixCls });

  // TODO: direction='vertical' 暂作兼容
  const isVertical: boolean = ['left', 'right', 'vertical'].includes(direction);

  const parseValue = React.useCallback(
    (inputValue) => parseValueBoundary(inputValue, children),
    [children],
  );

  const classes = bem([
    {
      [`${direction}`]: true,
      scroll: scrollable,
    },
    className,
  ]);

  // 计算 line 大小和位置
  const caclLineSizePos = () => {
    const newValue = parseValue(currentValue)!;
    const ChildCount = React.Children.count(children);

    let pos = 100 * newValue;
    if (scrollable && tablistRef.current) {
      const el = tablistRef.current.children[newValue];
      const { offsetLeft = 0, offsetTop = 0 } = el as HTMLElement;
      pos = isVertical ? offsetTop : offsetLeft;
    }

    const size = scrollable ? `${itemWidth}px` : `${100 / ChildCount}%`;
    const transformValue = scrollable
      ? getPxStyle(pos, 'px', isVertical)
      : getPxStyle(pos, '%', isVertical);
    const styleUl = getTransformPropValue(transformValue);
    const itemSize = isVertical ? { height: `${size}` } : { width: `${size}` };

    return {
      ...styleUl,
      ...itemSize,
    };
  };

  const onTabChange = React.useCallback(
    (newValue: number) => {
      if (typeof value === 'undefined') {
        setCurrentValue(newValue);
      }
      typeof onChange === 'function' && onChange(newValue);
    },
    [value, onChange],
  );

  const onTabClick = (tab: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
    if (disabled || tab.props.disabled) {
      return;
    }
    if (swipeable) {
      carouselRef.current && carouselRef.current!.onSlideTo(index);
      return;
    }
    onTabChange(index);
  };

  const lineStyle: React.CSSProperties = caclLineSizePos();
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
        direction={isVertical ? 'vertical' : 'horizontal'}
        showPagination={false}
        activeIndex={parseValue(currentValue)}
        ref={carouselRef}
        onChange={onTabChange}
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
        <TabPanel {...item.props} selected={parseValue(currentValue) === index} />
      ),
    );
  }

  const renderTabs = (tab: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
    const itemCls = bem('tab', [
      {
        disabled: disabled || tab.props.disabled,
        active: parseValue(currentValue) === index,
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

  const getItemStyle = (el, prop) => {
    let newValue = '0';
    if (prop in el.style) {
      newValue = el.style[prop] || window.getComputedStyle(el).getPropertyValue(prop) || '0';
    }
    return newValue;
  };

  const calculateLineWidth = React.useCallback(() => {
    if (!scrollable) {
      return;
    }
    const newValue = parseValue(currentValue)!;
    const el = tablistRef.current!.children[newValue];
    const size = isVertical ? getItemStyle(el, 'height') : getItemStyle(el, 'width');

    setItemWidth(parseInt(size.toString(), 10));
  }, [parseValue, currentValue, isVertical, scrollable]);

  const calculateScorllLeftLocation = React.useCallback(() => {
    if (!scrollable) {
      return false;
    }
    const newValue = parseValue(currentValue)!;

    const prevTabItem = tablistRef.current!.childNodes[newValue] as HTMLElement;
    if (scrollable && tablistRef.current && prevTabItem) {
      const { offsetWidth: layoutOffsetWidth = 0, offsetHeight: layoutOffsetHeight = 0 } =
        tablistRef.current;
      const left = prevTabItem.offsetLeft + prevTabItem.offsetWidth / 2 - layoutOffsetWidth / 2;
      const top = prevTabItem.offsetTop + prevTabItem.offsetHeight / 2 - layoutOffsetHeight / 2;

      scrollTo(tablistRef.current, top, left, 0.3);
    }
  }, [parseValue, currentValue, scrollable]);

  React.useEffect(() => {
    if (React.Children.count(children)) {
      calculateLineWidth();
      calculateScorllLeftLocation();
    }
  }, [calculateLineWidth, calculateScorllLeftLocation, children]);

  React.useEffect(() => {
    setCurrentValue(getValue({ value, defaultValue, children }, 0));
  }, [value, defaultValue, children]);

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
  direction: 'top',
};

export default Tabs;
