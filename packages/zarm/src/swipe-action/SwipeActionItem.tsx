import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import Button from '../button';
import { useSafeState } from '../utils/hooks';
import { ConfigContext } from '../n-config-provider';
import ActivityIndicator from '../activity-indicator';
import type { BaseSwipeActionItemProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export type SwipeActionItemProps = BaseSwipeActionItemProps & HTMLProps;

const SwipeActionItem = React.forwardRef<HTMLDivElement, SwipeActionItemProps>((props) => {
  const {
    className,
    bold,
    text,
    onClick,
    theme = 'primary',
    disabled,
    shape = 'rect',
    size = 'lg',
    autoClose,
    onClose,
    ...rest
  } = props;
  const [loading, setLoading] = useSafeState(false);
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('swipe-action', { prefixCls });
  const cls = bem('item', [
    {
      // [`${theme}`]: !!theme,
      // bold,
      // disabled: disabled || loading,
    },
    className,
  ]);

  return (
    <Button
      {...rest}
      className={cls}
      size={size}
      shape={shape}
      theme={theme}
      loading={loading}
      onClick={async () => {
        try {
          setLoading(true);
          await onClick?.();
          console.log('>>>>finish');
          setLoading(false);
          if (autoClose) {
            onClose?.();
          }
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? <ActivityIndicator /> : text}
    </Button>
  );
});

export default SwipeActionItem;
