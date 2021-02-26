import React from 'react';

export default ({ prefixCls, cancelText, okText, title, handleCancel, handleOk, locale }) => (
  <div className={`${prefixCls}__header`}>
    <div className={`${prefixCls}__cancel`} onClick={handleCancel}>
      {cancelText || locale!.cancelText}
    </div>
    <div className={`${prefixCls}__title`}>{title}</div>
    <div className={`${prefixCls}__submit`} onClick={handleOk}>
      {okText || locale!.okText}
    </div>
  </div>
);
