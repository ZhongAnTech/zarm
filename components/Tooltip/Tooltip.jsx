import React, { PureComponent, cloneElement } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Tooltip extends PureComponent {

  componentDidMount() {
    if (!window.zarmTooltip) {
      window.zarmTooltip = document.createElement('div');
      document.body.appendChild(window.zarmTooltip);
    }
    this.show(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.show(nextProps);
  }

  show = (props) => {
    const { prefixCls, className, visible, message } = props;
    const cls = classnames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-hidden`]: !visible,
      [className]: !!className,
    });

    // eslint-disable-next-line
    const rect = findDOMNode(this.child).getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
    const style = {
      left: rect.left,
      top: rect.top + scrollTop,
      width: rect.width,
    };

    ReactDOM.render(
      <div className={cls} style={style} ref={(ele) => { this.tooltip = ele; }}>
        <div className={`${prefixCls}-inner`}>{message}</div>
      </div>
    , window.zarmTooltip);
  }

  render() {
    const { children } = this.props;

    return cloneElement(children, {
      ref: (ele) => { this.child = ele; },
    });
  }
}

Tooltip.propTypes = {
  prefixCls: PropTypes.string,  // eslint-disable-line
  className: PropTypes.string,  // eslint-disable-line
  message: PropTypes.any, // eslint-disable-line
};

Tooltip.defaultProps = {
  prefixCls: 'za-tooltip',
};

export default Tooltip;
