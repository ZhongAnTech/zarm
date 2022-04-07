import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { useSafeState } from '../utils/hooks';
import { ConfigContext } from '../n-config-provider';
import ActivityIndicator from '../activity-indicator';
import type { BaseActionSheetItemProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export type ActionSheetItemProps = BaseActionSheetItemProps & HTMLProps;

const ActionSheetItem = React.forwardRef<HTMLDivElement, ActionSheetItemProps>((props, ref) => {
  const { className, bold, theme, disabled, text, onClick, ...rest } = props;
  const [loading, setLoading] = useSafeState(false);
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('action-sheet', { prefixCls });
  const cls = bem('item', [
    {
      [`${theme}`]: !!theme,
      bold,
      disabled: disabled || loading,
    },
    className,
  ]);

  return (
    <div
      {...rest}
      ref={ref}
      className={cls}
      onClick={async () => {
        setLoading(true);
        try {
          await onClick?.();
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? <ActivityIndicator /> : text}
    </div>
  );
});

export default ActionSheetItem;
