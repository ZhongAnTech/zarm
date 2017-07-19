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
      ? <div className={`${prefixCls}-close`} onClick={onClose}><Icon type="wrong" /></div>
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
  prefixCls: 'ui-modal-header',
  className: null,
  title: '',
  onClose: null,
};

export default ModalHeader;

