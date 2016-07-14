
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Mask extends Component {

  render () { 
    const { visible, type, onClose, ...others } = this.props;
    const markCls = classnames({
      "ui-mask"     : true,
      "transparent" : type === 'transparent',
      "light"       : type === 'light',
      "dark"        : type === 'dark',
    });

    return visible ? (
      <div className={markCls} onClick={onClose} {...others}></div>
    ) : null;
  }

}

Mask.propTypes = {
  visible : PropTypes.bool,
  type    : PropTypes.oneOf(['transparent', 'light', 'normal', 'dark']),
  onClose : PropTypes.func,
};

Mask.defaultProps = {
  visible : false,
  type    : 'normal',
  onClose : () => {},
};

export default Mask;