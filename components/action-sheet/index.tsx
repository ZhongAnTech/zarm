import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Popup from '../popup';

export interface ActionSheetProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class ActionSheet extends PureComponent<ActionSheetProps, {}> {
  static defaultProps = {
    prefixCls: 'za-action-sheet',
    shape: 'rect',
    visible: false,
    spacing: false,
    actions: [],
    cancelText: '取消',
  };

  renderActions = (action, index) => {
    const { prefixCls } = this.props;
    const actionCls = classnames(`${prefixCls}__item`, {
      [`${prefixCls}--${action.theme}`]: !!action.theme,
    });
    return <a key={+index} className={actionCls} onClick={action.onClick}>{action.text}</a>;
  }

  renderCancel = () => {
    const { prefixCls, onCancel, cancelText } = this.props;
    return (typeof onCancel === 'function') && (
      <div className={`${prefixCls}__cancel`}>
        <a className={`${prefixCls}__item`} onClick={onCancel}>{cancelText}</a>
      </div>
    );
  }

  render() {
    const { prefixCls, className, shape, spacing, visible, onMaskClick, actions } = this.props;
    const cls = classnames(`${prefixCls}`, className, {
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--spacing`]: spacing,
    });

    return (
      <Popup visible={visible} onMaskClick={onMaskClick}>
        <div className={cls}>
          <div className={`${prefixCls}__actions`}>
            {actions.map(this.renderActions)}
          </div>
          {this.renderCancel()}
        </div>
      </Popup>
    );
  }
}
