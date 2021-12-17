import React, { useContext } from 'react';
import classnames from 'classnames';
import Popup from '../popup';
import { ConfigContext } from '../n-config-provider';
import type { BaseActionSheetActionProps, BaseActionSheetProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export interface ActionSheetCssVars {
  '--za-action-sheet-border-radius'?: React.CSSProperties['borderRadius'];
  '--za-action-sheet-spacing-margin'?: React.CSSProperties['margin'];
  '--za-action-sheet-item-background'?: React.CSSProperties['background'];
  '--za-action-sheet-item-active-background'?: React.CSSProperties['background'];
  '--za-action-sheet-item-height'?: React.CSSProperties['height'];
  '--za-action-sheet-item-color'?: React.CSSProperties['color'];
  '--za-action-sheet-item-font-size'?: React.CSSProperties['fontSize'];
  '--za-action-sheet-cancel-background'?: React.CSSProperties['background'];
  '--za-action-sheet-cancel-color'?: React.CSSProperties['color'];
  '--za-action-sheet-cancel-margin-top'?: React.CSSProperties['marginTop'];
}

export type ActionSheetActionProps = BaseActionSheetActionProps & HTMLProps;

export type ActionSheetProps = BaseActionSheetProps &
  HTMLProps & {
    safeIphoneX?: boolean;
    actions?: ActionSheetActionProps[];
  };

const ActionSheet = React.forwardRef<HTMLDivElement, ActionSheetProps>((props, ref) => {
  const {
    className,
    style,
    spacing,
    actions,
    cancelText,
    onCancel,
    safeIphoneX,
    ...restProps
  } = props;
  const { prefixCls: globalPrefixCls, safeIphoneX: globalSafeIphoneX, locale } = useContext(
    ConfigContext,
  );
  const prefixCls = `${globalPrefixCls}-action-sheet`;
  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--spacing`]: spacing,
    [`${prefixCls}--safe`]: safeIphoneX || globalSafeIphoneX,
  });

  const renderAction = (action: ActionSheetActionProps, index) => {
    return (
      <div
        key={+index}
        className={classnames(`${prefixCls}__item`, action.className, {
          [`${prefixCls}__item--${action.theme}`]: !!action.theme,
          [`${prefixCls}__item--disabled`]: action.disabled,
        })}
        onClick={!action.disabled ? action.onClick : undefined}
      >
        {action.text}
      </div>
    );
  };

  const renderCancel = () => {
    if (typeof onCancel !== 'function') return;

    return (
      <div className={`${prefixCls}__cancel`}>
        <div className={`${prefixCls}__item`} onClick={onCancel}>
          {cancelText || locale?.ActionSheet?.cancelText}
        </div>
      </div>
    );
  };

  return (
    <Popup {...restProps}>
      <div ref={ref} className={cls} style={style}>
        <div className={`${prefixCls}__actions`}>{actions?.map(renderAction)}</div>
        {renderCancel()}
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
