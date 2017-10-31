import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { ActionSheetProps } from './PropsType';
import Popup from '../Popup';

export { ActionSheetProps };

export default class ActionSheet extends PureComponent<ActionSheetProps, {}> {

  static defaultProps = {
    prefixCls: 'za-actionsheet',
    shape: 'radius',
    visible: false,
    actions: [],
    cancelText: '取消',
  }

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
                const actionCls = classnames(`${prefixCls}-btn`, {
                  [`theme-${action.theme}`]: !!action.theme,
                });
                return <a key={+index} className={actionCls} onClick={action.onClick}>{action.text}</a>;
              })
            }
          </div>
          {
            typeof onCancel === 'function' && (
              <div className={`${prefixCls}-cancel`}>
                <a className={`${prefixCls}-btn`} onClick={onCancel}>{cancelText}</a>
              </div>
            )
          }
        </div>
      </Popup>
    );
  }
}
——