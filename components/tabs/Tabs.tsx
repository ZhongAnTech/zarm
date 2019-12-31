import React, { PureComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import TabPanel from './TabPanel';
import Carousel from '../carousel';

const getSelectIndex = (children) => {
  let selectIndex;
  React.Children.forEach(children, (item: TabPanel, index) => {
    if (item.props && item.props.selected) {
      selectIndex = index;
    }
  });
  return selectIndex;
};

export interface TabsProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Tabs extends PureComponent<TabsProps, any> {
  static Panel: typeof TabPanel;

  private carousel;

  static defaultProps = {
    prefixCls: 'za-tabs',
    disabled: false,
    hasline: false,
    canSwipe: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || getSelectIndex(props.children) || 0,
      prevValue: null,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps && nextProps.value !== state.prevValue) {
      return {
        value: nextProps.value,
        prevValue: nextProps.value,
      };
    }
    return null;
  }

  onSwipeChange = (value) => {
    const { onChange } = this.props;
    this.setState({ value });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  onTabClick = (tab, index) => {
    const { disabled, canSwipe, onChange } = this.props;
    if (disabled || tab.props.disabled) {
      return;
    }
    this.setState({ value: index });
    if (typeof onChange === 'function') {
      onChange(index);
    }
    if (canSwipe) {
      this.carousel.onSlideTo(index);
    }
  };

  renderTabs = (tab, index) => {
    const { prefixCls, disabled } = this.props;
    const itemCls = classnames(`${prefixCls}__tab`, tab.props.className, {
      [`${prefixCls}__tab--disabled`]: disabled || tab.props.disabled,
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

  render() {
    const { prefixCls, className, lineWidth, hasline, canSwipe, children } = this.props;
    const { value } = this.state;

    const classes = classnames(prefixCls, className, {
      [`${prefixCls}--hasline`]: hasline,
    });

    // 渲染选项
    const tabsRender = React.Children.map(children, this.renderTabs);

    // 渲染内容
    let contentRender;

    if (canSwipe) {
      contentRender = (
        <Carousel
          direction="left"
          showPagination={false}
          activeIndex={value}
          ref={(ele) => { this.carousel = ele; }}
          onChange={(v) => this.onSwipeChange(v)}
        >
          {React.Children.map(children, (item: TabPanel) => <div>{item.props.children}</div>)}
        </Carousel>
      );
    } else {
      contentRender = React.Children.map(children, (item: TabPanel, index) => {
        return item.props.children && <TabPanel {...item.props} selected={value === index} />;
      });
    }

    const lineStyle: CSSProperties = {
      width: `${100 / React.Children.count(children)}%`,
      left: `${(value / React.Children.count(children)) * 100}%`,
      // right: `${(React.Children.count(children) - this.state.value - 1) / React.Children.count(children) * 100}%`,
      // transition: `right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s`,
    };

    let lineInnerRender;
    if (lineWidth) {
      lineStyle.backgroundColor = 'transparent';
      lineInnerRender = <span className={`${prefixCls}__line__inner`} style={{ width: lineWidth }} />;
    }

    return (
      <div className={classes}>
        <div className={`${prefixCls}__header`}>
          <ul role="tablist">{tabsRender}</ul>
          <div className={`${prefixCls}__line`} style={lineStyle}>{lineInnerRender}</div>
        </div>
        <div className={`${prefixCls}__body`}>
          {contentRender}
        </div>
      </div>
    );
  }
}
