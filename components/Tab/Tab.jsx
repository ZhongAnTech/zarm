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
    const { prefixCls, className, theme, lineWidth, disabled, children, onChange } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
    });

    // 渲染选项
    const itemsRender = React.Children.map(children, (item, $index) => {
      const itemClasses = classnames({
        [`${prefixCls}-header-item`]: true,
        disabled: disabled || item.props.disabled,
        active: this.state.value === $index,
        [item.className]: !!item.className,
      });

      return (
        <li
          role="tab"
          key={$index}
          className={itemClasses}
          onClick={() => {
            if (disabled || item.props.disabled) return;
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
      // right: `${(children.length - this.state.value - 1) / children.length * 100}%`,
      // transition: `right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s`,
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
          <ul role="tablist">{itemsRender}</ul>
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
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  lineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

TabGroup.defaultProps = {
  prefixCls: 'za-tab',
  className: null,
  theme: 'primary',
  lineWidth: null,
  disabled: false,
  onChange() {},
};

export default TabGroup;
