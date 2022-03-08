import React, { useContext } from 'react';
import { createBEM } from '@zarm-design/bem';
import Popup from '../popup';
import ActionSheetItem from './ActionSheetItem';
import { ConfigContext } from '../n-config-provider';
import type { BaseActionSheetItemProps, BaseActionSheetProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export interface ActionSheetCssVars {
  '--za-action-sheet-background'?: React.CSSProperties['background'];
  '--za-action-sheet-border-radius'?: React.CSSProperties['borderRadius'];
  '--za-action-sheet-spacing-margin'?: React.CSSProperties['margin'];
  '--za-action-sheet-item-height'?: React.CSSProperties['height'];
  '--za-action-sheet-item-font-size'?: React.CSSProperties['fontSize'];
  '--za-action-sheet-item-font-weight'?: React.CSSProperties['fontWeight'];
  '--za-action-sheet-item-text-color'?: React.CSSProperties['color'];
  '--za-action-sheet-cancel-text-color'?: React.CSSProperties['color'];
  '--za-action-sheet-cancel-margin-top'?: React.CSSProperties['marginTop'];
}

export type ActionSheetItemProps = BaseActionSheetItemProps & HTMLProps;

export type ActionSheetProps = BaseActionSheetProps &
  HTMLProps & {
    safeIphoneX?: boolean;
    actions?: ActionSheetItemProps[];
    onAction?: (action: ActionSheetItemProps, index: number) => void;
  };

const ActionSheet = React.forwardRef<HTMLDivElement, ActionSheetProps>((props, ref) => {
  const {
    className,
    style,
    spacing,
    actions,
    cancelText,
    onCancel,
    onAction,
    safeIphoneX,
    ...restProps
  } = props;
  const { prefixCls, safeIphoneX: globalSafeIphoneX, locale } = useContext(ConfigContext);

  const bem = createBEM('action-sheet', { prefixCls });

  const cls = bem([
    {
      spacing,
      safe: safeIphoneX || globalSafeIphoneX,
    },
    className,
  ]);

  const actionsRender = actions!.map((action, index) => (
    <ActionSheetItem
      {...action}
      key={+index}
      onClick={async () => {
        await action.onClick?.();
        await onAction?.(action, index);
      }}
    />
  ));

  const renderCancel = () => {
    if (typeof onCancel !== 'function') return;

    return (
      <div className={bem('cancel')}>
        <div className={bem('item', [{ bold: true }])} onClick={onCancel}>
          {cancelText || locale?.ActionSheet?.cancelText}
        </div>
      </div>
    );
  };

  return (
    <Popup {...restProps}>
      <div ref={ref} className={cls} style={style}>
        <div className={bem('actions')}>{actionsRender}</div>
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
