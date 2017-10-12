import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ModalBody extends PureComponent {

  render() {
    const { prefixCls, className, height, children, ...others } = this.props;
    const cls = classnames(`${prefixCls}-body`, className);

    const bodyStyle = {};
    bodyStyle.height = height;

    return (
      <div className={cls} style={bodyStyle} {...others}>
        {children}
      </div>
    );
  }
}

ModalBody.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ModalBody.defaultProps = {
  prefixCls: 'za-modal',
  className: null,
};

export default ModalBody;

