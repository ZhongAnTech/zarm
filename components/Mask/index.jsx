import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Mask extends Component {

  render() {
    const { prefixCls, visible, type, onClose, ...others } = this.props;
    const markCls = classnames({
      [`${prefixCls}`]: true,
      transparent: type === 'transparent',
      light: type === 'light',
      dark: type === 'dark',
    });

    return visible
      ? <div className={markCls} onClick={onClose} {...others} />
      : null;
  }

}

Mask.propTypes = {
  prefixCls: PropTypes.string,
  visible: PropTypes.bool,
  type: PropTypes.oneOf(['transparent', 'light', 'normal', 'dark']),
  onClose: PropTypes.func,
};

Mask.defaultProps = {
  prefixCls: 'ui-mask',
  visible: false,
  type: 'normal',
  onClose: () => {},
};

export default Mask;
