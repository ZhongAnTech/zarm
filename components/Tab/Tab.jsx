import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabContainer from './TabContainer';

function getSelectIndex(children) {
  let selectIndex;
  React.Children.forEach(children, (item, $index) => {
    if (item.props && item.props.selected) {
      selectIndex = $index;
    }
  });
  return selectIndex;
}

class TabGroup extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || getSelectIndex(props.children) || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || getSelectIndex(nextProps.children)) {
      this.setState({
        value: nextProps.value,
      });
      nextProps.onChange(nextProps.value);
    }
  }

  getTitleItemCls(idx) {
    const { prefixCls } = this.props;
    return idx === this.state.value
      ? `${prefixCls}-header-item active`
      : `${prefixCls}-header-item`;
  }

  render() {
    const { prefixCls, lineWidth, theme, className, children, onChange } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [`theme-${theme}`]: !!theme,
      [className]: !!className,
    });

    // 渲染选项
    const itemsRender = React.Children.map(children, (item, $index) => {
      const itemDisabled = 'disabled' in item.props || item.isDisabled;
      const itemActived = this.state.value === $index;

      const itemClasses = classnames({
        [`${prefixCls}-header-item`]: true,
        disabled: itemDisabled,
        active: itemActived,
        [item.className]: !!item.className,
      });

      return (
        <li
          key={$index}
          className={itemClasses}
          onClick={() => {
            if (itemDisabled) return;
            this.setState({ value: $index });
            onChange($index);
          }}>
          <span ref={(tabItem) => { this.tabItem = tabItem; }}>{item.props.title}</span>
        </li>
      );
    });

    // 渲染内容
    const contentRender = React.Children.map(children, (item, $index) => {
      return (
        <TabContainer {...item.props} selected={this.state.value === $index}>
          {item.props.children}
        </TabContainer>
      );
    });

    const lineStyle = {
      width: `${100 / children.length}%`,
      left: `${(this.state.value / children.length) * 100}%`,
    };


    let lineInnerRender;
    if (lineWidth) {
      let w;
      if (lineWidth === 'auto') {
        w = lineWidth;
      } else {
        w = lineWidth;
      }
      lineStyle.backgroundColor = 'transparent';
      lineInnerRender = <span className={`${prefixCls}-line-inner`} style={{ width: w }} />;
    }

    return (
      <div className={classes}>
        <div className={`${prefixCls}-header`}>
          <ul>{itemsRender}</ul>
          <div className={`${prefixCls}-line`} style={lineStyle}>{lineInnerRender}</div>
        </div>
        <div className={`${prefixCls}-container`}>
          {contentRender}
        </div>
      </div>
    );
  }
}

TabGroup.propTypes = {
  prefixCls: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  lineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
};

TabGroup.defaultProps = {
  prefixCls: 'ui-tab',
  theme: 'default',
  lineWidth: null,
  onChange: () => {},
};

export default TabGroup;
