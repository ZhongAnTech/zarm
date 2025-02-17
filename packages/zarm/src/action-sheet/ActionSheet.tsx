import { createBEM } from '@zarm-design/bem';
import React, { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import Popup from '../popup';
import SafeArea from '../safe-area';
import type { HTMLProps } from '../utils/utilityTypes';
import ActionSheetItem, { ActionSheetItemProps } from './ActionSheetItem';
import type { BaseActionSheetProps } from './interface';

export interface ActionSheetCssVars {
  '--background'?: React.CSSProperties['background'];
  '--border-radius'?: React.CSSProperties['borderRadius'];
  '--spacing-margin'?: React.CSSProperties['margin'];
  '--item-height'?: React.CSSProperties['height'];
  '--item-font-size'?: React.CSSProperties['fontSize'];
  '--item-font-weight'?: React.CSSProperties['fontWeight'];
  '--item-text-color'?: React.CSSProperties['color'];
  '--item-active-background'?: React.CSSProperties['background'];
  '--item-opacity-disabled'?: React.CSSProperties['opacity'];
  '--cancel-text-color'?: React.CSSProperties['color'];
  '--cancel-margin-top'?: React.CSSProperties['marginTop'];
}

export interface ActionSheetProps extends BaseActionSheetProps, HTMLProps<ActionSheetCssVars> {
  safeArea?: boolean;
  actions?: ActionSheetItemProps[];
  onAction?: (action: ActionSheetItemProps, index: number) => void;
}

const ActionSheet = React.forwardRef<HTMLDivElement, ActionSheetProps>((props, ref) => {
  const {
    className,
    style,
    spacing,
    actions,
    cancelText,
    onCancel,
    onAction,
    safeArea,
    ...restProps
  } = props;
  const { prefixCls, safeArea: globalSafeArea, locale } = useContext(ConfigContext);

  const bem = createBEM('action-sheet', { prefixCls });

  const cls = bem([
    {
      spacing,
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
        {(safeArea ?? globalSafeArea) && <SafeArea position="bottom" />}
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
};

export default ActionSheet;
