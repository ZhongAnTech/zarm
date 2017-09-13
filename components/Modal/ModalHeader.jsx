import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class ModalHeader extends PureComponent {

  render() {
    const { prefixCls, className, title, onClose, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    const btnClose = onClose
      ? <Icon type="wrong" className={`${prefixCls}-close`} onClick={onClose} />
      : null;

    return (
      <div className={cls} {...others}>
        <div className={`${prefixCls}-title`}>{title}</div>
        {btnClose}
      </div>
    );
  }
}

ModalHeader.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

ModalHeader.defaultProps = {
  prefixCls: 'za-modal-header',
  title: '',
};

export default ModalHeader;

