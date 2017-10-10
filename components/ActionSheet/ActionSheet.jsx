import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Popup from '../Popup';

class ActionSheet extends PureComponent {

  render() {
    const { prefixCls, className, shape, visible, onMaskClick, actions, cancelText, onCancel } = this.props;

    const cls = classnames(`${prefixCls}`, className, {
      [`shape-${shape}`]: !!shape,
    });

    return (
      <Popup visible={visible} onMaskClick={onMaskClick}>
        <div className={cls}>
          <div className={`${prefixCls}-actions`}>
            {
              actions.map((action, index) => {
                const actionCls = classnames({
                  [`${prefixCls}-btn`]: true,
                  [`theme-${action.theme}`]: !!action.theme,
                });
                return <a key={+index} className={actionCls} onClick={action.onClick}>{action.text}</a>;
              })
            }
          </div>
          {
            typeof onCancel === 'function'
              ? (
                <div className={`${prefixCls}-cancel`}>
                  <a className={`${prefixCls}-btn`} onClick={onCancel}>{cancelText}</a>
                </div>
                )
              : null
          }
        </div>
      </Popup>
    );
  }
}

ActionSheet.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  shape: PropTypes.oneOf(['radius']),
  visible: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.object),
  onMaskClick: Popup.propTypes.onMaskClick,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
};

ActionSheet.defaultProps = {
  prefixCls: 'za-actionsheet',
  shape: 'radius',
  visible: false,
  actions: [],
  onMaskClick: Popup.defaultProps.onMaskClick,
  cancelText: '取消',
};

export default ActionSheet;
