import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Popup from '../Popup';

class ActionSheet extends PureComponent {
  render() {
    const { prefixCls, className, shape, visible, onMaskClick, actions, cancelText, onCancel, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`shape-${shape}`]: !!shape,
    });

    return (
      <Popup visible={visible} onMaskClick={onMaskClick}>
        <div className={cls} {...others}>
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
  actions: PropTypes.arrayOf(PropTypes.object),
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
  onMaskClick: Popup.propTypes.onMaskClick,
};

ActionSheet.defaultProps = {
  prefixCls: 'zax-actionsheet',
  className: null,
  shape: 'radius',
  actions: [],
  cancelText: '取消',
  onCancel: null,
  onMaskClick: Popup.defaultProps.onMaskClick,
};

export default ActionSheet;
