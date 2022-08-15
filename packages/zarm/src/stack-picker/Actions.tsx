import React from 'react';

export default ({ bem, cancelText, confirmText, title, handleCancel, handleOk, locale }) => (
  <div className={bem('header')}>
    <div className={bem('cancel')} onClick={handleCancel}>
      {cancelText || locale!.cancelText}
    </div>
    <div className={bem('title')}>{title || locale!.title}</div>
    <div className={bem('submit')} onClick={handleOk}>
      {confirmText || locale!.confirmText}
    </div>
  </div>
);
