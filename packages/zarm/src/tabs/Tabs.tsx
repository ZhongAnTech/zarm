import * as React from 'react';
import classnames from 'classnames';
import TabPanel from './TabPanel';
import Carousel from '../carousel';
import type { CarouselHTMLElement } from '../carousel';
import { getTransformPropValue, getPxStyle } from './util/index';
import { scrollTo } from '../utils/dom';
import { ConfigContext } from '../n-config-provider';
import type { TabPanelProps } from './TabPanel';
import type { BaseTabsProps } from './interface';

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

export interface TabsProps extends BaseTabsProps {
  className?: string;
}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>> {
  Panel: typeof TabPanel;
}

const Tabs = React.forwardRef<unknown, TabsProps>((props, ref) => {
  const {
    className,
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

  const tabsRef = (ref as any) || React.createRef<HTMLDivElement>();
  const carouselRef = React.useRef<CarouselHTMLElement>(null);
  const tablistRef = React.useRef<HTMLUListElement>(null);
  const [itemWidth, setItemWidth] = React.useState(0);
  const [currentValue, setCurrentValue] = React.useState(
    getValue({ value, defaultValue, children }, 0),
  );

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-tabs`;

  const isVertical: boolean = direction === 'vertical';

  const parseValue = React.useCallback((inputValue) => parseValueBoundary(inputValue, children), [
    children,
  ]);

  const cls = classnames(prefixCls, className, `${prefixCls}--${direction}`, {
    [`${prefixCls}--scroll`]: scrollable,
  });

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
    lineInnerRender = <span className={`${prefixCls}__line__inner`} style={{ width: lineWidth }} />;
  }

  // 渲染内容
  let contentRender;
  if (swipeable) {
    contentRender = (
      <Carousel
        swipeable={!disabled}
        direction={direction === 'vertical' ? 'up' : 'left'}
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
    const itemCls = classnames(`${prefixCls}__tab`, tab.props.className, {
      [`${prefixCls}__tab--disabled`]: disabled || tab.props.disabled,
      [`${prefixCls}__tab--active`]: parseValue(currentValue) === index,
    });

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
    const index = newValue - 1 >= 0 ? newValue - 1 : 0;
    const prevTabItem = tablistRef.current!.childNodes[index];
    if (scrollable && tablistRef.current && prevTabItem) {
      const { offsetTop: top = 0, offsetLeft: left = 0 } = prevTabItem as HTMLElement;
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
    <div className={cls} ref={tabsRef}>
      <div className={`${prefixCls}__header`}>
        <ul className={`${prefixCls}__tablist`} role="tablist" ref={tablistRef}>
          {tabsRender}
          <div className={`${prefixCls}__line`} style={lineStyle}>
            {lineInnerRender}
          </div>
        </ul>
      </div>
      <div className={`${prefixCls}__body`}>{contentRender}</div>
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
