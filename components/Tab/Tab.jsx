import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabPanel from './TabPanel';
import Swipe from '../Swipe';

function getSelectIndex(children) {
  let selectIndex;
  React.Children.forEach(children, (item, $index) => {
    if (item.props && item.props.selected) {
      selectIndex = $index;
    }
  });
  return selectIndex;
}

class Tab extends PureComponent {

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
      typeof nextProps.onChange === 'function' && nextProps.onChange(nextProps.value);
    }
  }

  render() {
    const { prefixCls, className, theme, lineWidth, disabled, canSwipe, children, onChange } = this.props;

    const classes = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
    });

    // 渲染选项
    const tabsRender = React.Children.map(children, (item, $index) => {
      const itemCls = classnames(`${prefixCls}-header-item`, item.props.className, {
        disabled: disabled || item.props.disabled,
        active: this.state.value === $index,
        // hasline,
      });

      return (
        <li
          role="tab"
          key={$index}
          className={itemCls}
          onClick={() => {
            if (disabled || item.props.disabled) return;
            this.setState({ value: $index });
            typeof onChange === 'function' && onChange($index);
            canSwipe && this.swipe.onSlideTo($index);
          }}>
          {item.props.title}
        </li>
      );
    });

    // 渲染内容
    let contentRender;

    if (canSwipe) {
      contentRender = (
        <Swipe
          showPagination={false}
          activeIndex={this.state.value}
          ref={(ele) => { this.swipe = ele; }}
          onChange={(value) => {
            this.setState({ value });
            typeof onChange === 'function' && onChange(value);
          }}>
          {
            React.Children.map(children, (item) => {
              return (
                <div>{item.props.children}</div>
              );
            })
          }
        </Swipe>
      );
    } else {
      contentRender = React.Children.map(children, (item, $index) => {
        return <TabPanel {...item.props} selected={this.state.value === $index} />;
      });
    }

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

Tab.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  lineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  canSwipe: PropTypes.bool,
  onChange: PropTypes.func,
};

Tab.defaultProps = {
  prefixCls: 'za-tab',
  theme: 'primary',
  disabled: false,
  canSwipe: false,
};

export default Tab;
