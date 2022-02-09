import React, { useContext } from 'react';
import { createBEM } from '@zarm-design/bem';
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
  const { prefixCls, safeIphoneX: globalSafeIphoneX, locale } = useContext(ConfigContext);

  const bem = createBEM('action-sheet', { prefixCls });

  const cls = bem([
    {
      spacing,
      safe: safeIphoneX || globalSafeIphoneX,
    },
    className,
  ]);

  const renderAction = (action: ActionSheetActionProps, index) => {
    const actionCls = bem('item', [
      action.className,
      {
        [`${action.theme}`]: !!action.theme,
        disabled: action.disabled,
      },
    ]);

    return (
      <div
        key={+index}
        className={actionCls}
        onClick={!action.disabled ? action.onClick : undefined}
      >
        {action.text}
      </div>
    );
  };

  const renderCancel = () => {
    if (typeof onCancel !== 'function') return;

    return (
      <div className={bem('cancel')}>
        <div className={bem('item')} onClick={onCancel}>
          {cancelText || locale?.ActionSheet?.cancelText}
        </div>
      </div>
    );
  };

  return (
    <Popup {...restProps}>
      <div ref={ref} className={cls} style={style}>
        <div className={bem('actions')}>{actions?.map(renderAction)}</div>
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
