import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import Button from '../button';
import { useSafeState } from '../utils/hooks';
import { ConfigContext } from '../n-config-provider';
// import ActivityIndicator from '../activity-indicator';
import type { BaseSwipeActionItemProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export type SwipeActionItemProps = BaseSwipeActionItemProps & HTMLProps;

const SwipeActionItem = React.forwardRef<HTMLDivElement, SwipeActionItemProps>((props, ref) => {
  const {
    className,
    text,
    onClick,
    theme = 'primary',
    // shape = 'rect',
    // size = 'md',
    ...rest
  } = props;
  const [loading, setLoading] = useSafeState(false);
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('swipe-action-item', { prefixCls });
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
      ref={ref}
      shape="rect"
      size="md"
      theme={theme}
      loading={loading}
      onClick={async () => {
        setLoading(true);
        try {
          await onClick?.();
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? null : text}
    </Button>
  );
});

export default SwipeActionItem;
