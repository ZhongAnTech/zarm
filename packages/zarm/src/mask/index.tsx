import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { CSSTransition } from 'react-transition-group';
import isFinite from 'lodash/isFinite';
import { ConfigContext } from '../n-config-provider';
import type { BaseMaskProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';
import Portal from '../portal';

const OpacityList = {
  normal: 0.55,
  light: 0.35,
  dark: 0.75,
};

export interface MaskCssVars {
  '--z-index'?: React.CSSProperties['zIndex'];
}

export type MaskProps = BaseMaskProps &
  HTMLProps<MaskCssVars> & {
    onClick: React.MouseEventHandler<HTMLDivElement>;
  };

const Mask = React.forwardRef<HTMLDivElement, MaskProps>((props, ref) => {
  const {
    className,
    style,
    visible,
    color,
    opacity,
    forceRender,
    destroy,
    onClick,
    children,
  } = props;
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [animatedVisible, setAnimatedVisible] = React.useState(visible);
  const { prefixCls, mountContainer } = React.useContext(ConfigContext);
  const bem = createBEM('mask', { prefixCls });

  const rgb = color === 'black' ? '0, 0, 0' : '255, 255, 255';
  const backgroundOpacity = isFinite(opacity) ? opacity : OpacityList[opacity!];

  const maskStyle = {
    ...style,
    display: !visible && !animatedVisible ? 'none' : undefined,
    backgroundColor: color === 'transparent' ? 'transparent' : `rgba(${rgb}, ${backgroundOpacity})`,
  };

  React.useImperativeHandle(ref, () => nodeRef.current!);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={visible}
      timeout={300}
      classNames={`${prefixCls}-fade`}
      mountOnEnter={!forceRender}
      unmountOnExit={destroy}
      onEnter={() => {
        setAnimatedVisible(true);
      }}
      onExited={() => {
        setAnimatedVisible(false);
      }}
    >
      <Portal mountContainer={props.mountContainer ?? mountContainer}>
        <div ref={nodeRef} className={bem([className])} style={maskStyle} onClick={onClick}>
          {children}
        </div>
      </Portal>
    </CSSTransition>
  );
});

Mask.displayName = 'Mask';

Mask.defaultProps = {
  visible: false,
  color: 'black',
  opacity: 'normal',
};

export default Mask;
