import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';
import Modal from '../Modal';

class Popup extends PureComponent {
  render() {
    const { prefixCls, title, children, ...others } = this.props;

    
    return (
      <div >
        {children}
      </div>
    );
  }
}

Popup.propTypes = {
  prefixCls: PropTypes.string,
  onMaskClick: PropTypes.func,
};

Popup.defaultProps = {
  prefixCls: 'ui-popup',
  onMaskClick: () => {},
  width: '100%',
};

export default Popup;
