import { createBEM } from '@zarm-design/bem';
import isFinite from 'lodash/isFinite';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Transition from '../transition';
import { renderToContainer } from '../utils/dom';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseMaskProps } from './interface';

const OpacityList = {
  normal: 0.55,
  light: 0.35,
  dark: 0.75,
};

export interface MaskCssVars {
  '--z-index'?: React.CSSProperties['zIndex'];
}

export type MaskProps = BaseMaskProps &
  React.PropsWithChildren<HTMLProps<MaskCssVars>> & {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  };

const Mask = React.forwardRef<HTMLDivElement, MaskProps>((props, ref) => {
  const {
    className,
    style,
    visible,
    color,
    opacity,
    animationDuration,
    forceRender,
    destroy,
    afterOpen,
    afterClose,
    onClick,
    children,
    mountContainer,
  } = props;

  const { prefixCls, mountContainer: globalMountContainer } = React.useContext(ConfigContext);
  const bem = createBEM('mask', { prefixCls });

  const rgb = color === 'black' ? '0, 0, 0' : '255, 255, 255';
  const backgroundOpacity = isFinite(opacity) ? opacity : OpacityList[opacity!];

  return (
    <Transition
      nodeRef={ref}
      visible={visible}
      tranisitionName={`${prefixCls}-fade`}
      duration={animationDuration}
      forceRender={forceRender}
      destroy={destroy}
      onEnter={() => {
        afterOpen?.();
      }}
      onLeaveEnd={() => {
        afterClose?.();
      }}
    >
      {(rest, setNodeRef) =>
        renderToContainer(
          mountContainer ?? globalMountContainer,
          <div
            ref={setNodeRef}
            className={bem([className, rest.className])}
            style={{
              ...style,
              ...rest.style,
              backgroundColor:
                color === 'transparent' ? 'transparent' : `rgba(${rgb}, ${backgroundOpacity})`,
            }}
            onClick={onClick}
          >
            {children}
          </div>,
        )
      }
    </Transition>
  );
});

Mask.displayName = 'Mask';

Mask.defaultProps = {
  visible: false,
  color: 'black',
  opacity: 'normal',
};

export default Mask;
