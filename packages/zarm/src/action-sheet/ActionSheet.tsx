import React, { useContext } from 'react';
import classnames from 'classnames';
import PropsType from './interface';
import Popup from '../popup';
import { ConfigContext } from '../n-config-provider';

export interface ActionSheetProps extends PropsType {
  className?: string;
  safeIphoneX?: boolean;
}

const ActionSheet = React.forwardRef<HTMLDivElement, ActionSheetProps>((props, ref) => {
  const {
    className,
    safeIphoneX,
    spacing,
    visible,
    onMaskClick,
    actions,
    destroy,
    cancelText,
    mountContainer,
    onCancel,
    afterClose,
  } = props;
  const { prefixCls: globalPrefixCls, safeIphoneX: globalSafeIphoneX, locale } = useContext(
    ConfigContext,
  );
  const prefixCls = `${globalPrefixCls}-action-sheet`;
  const cls = classnames(prefixCls, {
    [`${prefixCls}--spacing`]: spacing,
    [`${prefixCls}--safe`]: safeIphoneX || globalSafeIphoneX,
  });

  const renderAction = (action, index) => {
    return (
      <div
        key={+index}
        className={classnames(`${prefixCls}__item`, action.className, {
          [`${prefixCls}__item--${action.theme}`]: !!action.theme,
          [`${prefixCls}__item--disabled`]: action.disabled,
        })}
        onClick={action.onClick}
      >
        {action.text}
      </div>
    );
  };

  return (
    <Popup
      className={className}
      visible={visible}
      onMaskClick={onMaskClick}
      destroy={destroy}
      afterClose={afterClose}
      mountContainer={mountContainer}
    >
      <div ref={ref} className={cls}>
        <div className={`${prefixCls}__actions`}>{actions?.map(renderAction)}</div>
        {typeof onCancel === 'function' && (
          <div className={`${prefixCls}__cancel`}>
            <div className={`${prefixCls}__item`} onClick={onCancel}>
              {cancelText || locale?.ActionSheet?.cancelText}
            </div>
          </div>
        )}
      </div>
    </Popup>
  );
});

ActionSheet.displayName = 'ActionSheet';

ActionSheet.defaultProps = {
  spacing: false,
  visible: false,
  actions: [],
  destroy: true,
  safeIphoneX: false,
};

export default ActionSheet;
