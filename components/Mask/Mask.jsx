import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Mask extends PureComponent {

  render() {
    const { prefixCls, className, visible, type, onClose } = this.props;
    const markCls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [type]: !!type,
    });

    return visible
      ? <div className={markCls} onClick={onClose} />
      : null;
  }

}

Mask.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  type: PropTypes.oneOf(['transparent', 'light', 'normal', 'dark']),
  onClose: PropTypes.func,
};

Mask.defaultProps = {
  prefixCls: 'ui-mask',
  className: null,
  visible: false,
  type: 'normal',
  onClose() {},
};

export default Mask;
