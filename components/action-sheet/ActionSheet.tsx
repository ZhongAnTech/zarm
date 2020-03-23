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
    visible: false,
    spacing: false,
    actions: [],
    destroy: true,
  };

  renderActions = (action, index) => {
    const { prefixCls } = this.props;
    const actionCls = classnames(`${prefixCls}__item`, action.className, {
      [`${prefixCls}__item--${action.theme}`]: !!action.theme,
    });
    return <div key={+index} className={actionCls} onClick={action.onClick}>{action.text}</div>;
  };

  renderCancel = () => {
    const { prefixCls, onCancel, cancelText, locale } = this.props;
    return (typeof onCancel === 'function') && (
      <div className={`${prefixCls}__cancel`}>
        <div className={`${prefixCls}__item`} onClick={onCancel}>{cancelText || locale!.cancelText}</div>
      </div>
    );
  };

  render() {
    const { prefixCls, className, spacing, visible, onMaskClick, actions, destroy } = this.props;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--spacing`]: spacing,
    });

    return (
      <Popup visible={visible} onMaskClick={onMaskClick} destroy={destroy}>
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
