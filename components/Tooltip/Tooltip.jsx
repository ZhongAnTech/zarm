import React, { PureComponent, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Tooltip extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  show() {
    const { prefixCls, className, message } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    const child = this.child.getBoundingClientRect();
    const style = {
      left: child.left,
      top: child.top,
    };

    const root = document.createElement('div');
    root.className = `${prefixCls}-wrapper`;
    document.body.appendChild(root);
    ReactDOM.render(<div className={cls} style={style}>{message}</div>, root);
  }

  render() {
    const { children } = this.props;

    return cloneElement(children, {
      ref: ele => this.child = ele,
    });
  }
}

Tooltip.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

Tooltip.defaultProps = {
  prefixCls: 'za-tooltip',
};

export default Tooltip;
