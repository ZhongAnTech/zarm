import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Loading from '../loading';
import { useSafeState } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseModalActionProps } from './interface';

export type ModalActionProps = BaseModalActionProps & HTMLProps;

const ModalAction = React.forwardRef<HTMLDivElement, ModalActionProps>((props, ref) => {
  const { className, bold, theme, disabled, text, onClick, ...rest } = props;
  const [loading, setLoading] = useSafeState(false);
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('modal', { prefixCls });
  const cls = bem('button', [
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
      {loading ? <Loading /> : text}
    </div>
  );
});

export default ModalAction;
