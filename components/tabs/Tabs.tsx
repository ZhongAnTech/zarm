import React, { PureComponent, CSSProperties } from 'react';
import PropsType from './PropsType';
import classnames from 'classnames';
import TabPanel from './TabPanel';
import Carousel from '../carousel';

const getSelectIndex = (children) => {
  let selectIndex;
  React.Children.forEach(children, (item: any, index) => {
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
  static Panel: any;

  static defaultProps = {
    prefixCls: 'za-tabs',
    theme: 'primary',
    disabled: false,
    canSwipe: false,
  };

  private carousel;

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || getSelectIndex(props.children) || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || getSelectIndex(nextProps.children)) {
      this.setState({
        value: nextProps.value || nextProps.defaultValue || getSelectIndex(nextProps.children) || 0,
      });
      if (typeof nextProps.onChange === 'function') {
        nextProps.onChange(nextProps.value);
      }
    }
  }

  onSwipeChange = (value) => {
    const { onChange } = this.props;
    this.setState({ value });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

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
  }

  renderTabs = (tab, index) => {
    const { prefixCls, disabled } = this.props;
    const itemCls = classnames(`${prefixCls}-header-item`, tab.props.className, {
      disabled: disabled || tab.props.disabled,
      active: this.state.value === index,
      // hasline,
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
  }

  render() {
    const { prefixCls, className, theme, lineWidth, canSwipe, children } = this.props;

    const classes = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
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
          activeIndex={this.state.value}
          ref={(ele) => { this.carousel = ele; }}
          onChange={(value) => this.onSwipeChange(value)}
        >
          {React.Children.map(children, (item: any) => <div>{item.props.children}</div>)}
        </Carousel>
      );
    } else {
      contentRender = React.Children.map(children, (item: any, index) => {
        return <TabPanel {...item.props} selected={this.state.value === index} />;
      });
    }

    const lineStyle: CSSProperties = {
      width: `${100 / children.length}%`,
      left: `${(this.state.value / children.length) * 100}%`,
      // right: `${(children.length - this.state.value - 1) / children.length * 100}%`,
      // transition: `right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s`,
    };

    let lineInnerRender;
    if (lineWidth) {
      lineStyle.backgroundColor = 'transparent';
      lineInnerRender = <span className={`${prefixCls}-line-inner`} style={{ width: lineWidth }} />;
    }

    return (
      <div className={classes}>
        <div className={`${prefixCls}-header`}>
          <ul role="tablist">{tabsRender}</ul>
          <div className={`${prefixCls}-line`} style={lineStyle}>{lineInnerRender}</div>
        </div>
        <div className={`${prefixCls}-container`}>
          {contentRender}
        </div>
      </div>
    );
  }
}
