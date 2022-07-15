import React, {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  AnimationEvent,
  useImperativeHandle,
  forwardRef,
} from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import {
  Instance as PopperInstance,
  createPopper,
  StrictModifiers,
  Modifier,
} from '@popperjs/core';
import { createBEM } from '@zarm-design/bem';
import ClickOutside from '../click-outside';
import { canUseDOM, getOuterSizes, getMountContainer } from '../utils/dom';
import BasePopperProps, { PopperPlacement, directionMap } from './interface';
import { ConfigContext } from '../n-config-provider';
import { getTransitionName, getTransformOrigin } from './utils';
import type { HTMLProps } from '../utils/utilityTypes';

export interface PopperCssVars {
  arrowLeft?: React.CSSProperties['left'];
  arrowRight?: React.CSSProperties['right'];
  arrowBottom?: React.CSSProperties['bottom'];
  arrowTop?: React.CSSProperties['top'];
}

export type PopperProps = BasePopperProps & HTMLProps<PopperCssVars>;
interface PopperStates {
  show: boolean;
  direction: PopperPlacement;
  arrowRef: any;
  mounted?: boolean;
  isPending: boolean;
  animationState: 'leave' | 'enter';
}

const Popper = forwardRef<any, PopperProps>((props, ref) => {
  const { prefixCls } = React.useContext(ConfigContext);
  const {
    visible,
    mountContainer,
    direction,
    trigger,
    animationDuration,
    hasArrow,
    className,
    animationType,
    content,
    style,
    children,
    arrowPointAtCenter,
    arrowClassName,
  } = props;

  const [reference, setReference] = useState<HTMLElement | null>();
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [popperNode, setPopperNode] = useState<HTMLElement | null>();

  const bem = createBEM('popper', { prefixCls });

  const [state, setState] = useState<PopperStates>({
    show: false,
    direction: direction!,
    arrowRef: null,
    mounted: false,
    isPending: false,
    animationState: 'leave',
  });

  const needRefresh = useRef(false);

  const { isPending, animationState, mounted } = state;

  const transitionName = useMemo(() => {
    return popperNode
      ? getTransitionName(
          prefixCls,
          popperNode.getAttribute('data-popper-placement'),
          animationType,
          animationState,
        )
      : '';
  }, [prefixCls, popperNode, animationType, animationState]);

  const innerCls = bem([
    {
      [`${direction}`]: true,
      hidden: animationState === 'leave',
    },
    className,
    isPending ? `${transitionName}` : '',
  ]);

  const popperInstanceRef = React.useRef<PopperInstance | null>();

  useImperativeHandle(ref, () => {
    return {
      update: () => {
        return popperInstanceRef.current?.update();
      },
    };
  });

  const destroyInstance = useCallback(() => {
    popperInstanceRef.current?.destroy();
    popperInstanceRef.current = null;
  }, [popperInstanceRef.current]);

  const animationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { destroy, onVisibleChange } = props;

    if (animationState === 'leave') {
      setState({
        ...state,
        show: false,
        isPending: false,
        ...(destroy && { mounted: false }),
      });
      destroy && destroyInstance();
    }
    if (typeof onVisibleChange === 'function') {
      const status = animationState !== 'leave';
      onVisibleChange(status);
    }
  };

  const isCenter = useMemo(() => {
    return ['top', 'left', 'bottom', 'right'].includes(directionMap[direction!]);
  }, [direction]);

  const createPopperInstance = () => {
    const modifiers: [...StrictModifiers[], Partial<Modifier<'update', any>>] = [
      {
        name: 'computeStyles',
        options: {
          adaptive: false,
          gpuAcceleration: false,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, getOuterSizes(arrowRef?.current)?.height],
        },
      },
      {
        name: 'flip',
      },
      {
        name: 'update',
        enabled: true,
        phase: 'afterWrite',
        fn: (data) => {
          if (popperNode) {
            const transfromStyle = getTransformOrigin(data?.state.placement);
            popperNode.style.transformOrigin = transfromStyle;
          }
        },
      },
    ];
    if (isCenter || arrowPointAtCenter) {
      modifiers.push({
        name: 'arrow',
        options: {
          element: arrowRef.current,
        },
      });
    }
    return createPopper(reference!, popperNode!, {
      placement: directionMap[direction!],
      modifiers,
    });
  };

  useEffect(() => {
    if (trigger === 'manual') {
      setState({
        ...state,
        show: Boolean(visible),
        isPending: false,
        animationState: visible ? 'enter' : 'leave',
        ...(visible && { mounted: true }),
      });
    }
  }, [visible, trigger]);

  useEffect(() => {
    if (trigger === 'manual') {
      return;
    }
    const { show } = state;
    if (mounted) {
      if (!show) {
        handleOpen();
      } else {
        handleClose();
      }
    }
  }, [trigger, mounted, needRefresh.current]);

  useEffect(() => {
    if (!popperNode || !reference) {
      return;
    }
    if (!popperInstanceRef.current) {
      popperInstanceRef.current = createPopperInstance();
    }
  }, [state.show, popperNode, reference]);

  useEffect(() => {
    if (popperInstanceRef.current) {
      popperInstanceRef.current?.setOptions({
        placement: directionMap[direction!],
      });
      if (isCenter || arrowPointAtCenter) {
        popperInstanceRef.current?.setOptions({
          placement: directionMap[direction!],
          modifiers: [
            ...popperInstanceRef?.current?.state.options.modifiers,
            {
              name: 'arrow',
              options: {
                element: arrowRef.current,
              },
            },
          ],
        });
      }
    }
  }, [popperInstanceRef.current, direction, direction, arrowPointAtCenter]);

  useEffect(() => {
    return () => {
      destroyInstance();
    };
  }, []);

  const handleClick = (event?) => {
    if (trigger === 'contextMenu') {
      event.preventDefault();
    }
    needRefresh.current = !needRefresh.current;
    setState({ ...state, mounted: true });
  };

  const handleOpen = () => {
    setState({
      ...state,
      show: true,
      isPending: true,
      mounted: true,
      animationState: 'enter',
    });
  };

  const handleClose = () => {
    if (state.animationState === 'leave') {
      return false;
    }
    setState({
      ...state,
      show: false,
      isPending: true,
      animationState: 'leave',
    });
  };

  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>();
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>();

  const clearTimeoutAndRef = (timeOut) => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
      timeOut.current = null;
    }
  };

  const handleEnter = (event) => {
    const { mouseEnterDelay } = props;
    const childrenProps = (children as React.ReactElement<any>).props;

    if (React.isValidElement(children) && event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    if (!leaveTimer.current && enterTimer.current) {
      return false;
    }

    clearTimeoutAndRef(enterTimer);
    clearTimeoutAndRef(leaveTimer);

    enterTimer.current = setTimeout(() => {
      if (!state.show) {
        handleClick(event);
      }
    }, mouseEnterDelay);
  };

  const handleLeave = (event) => {
    const { mouseEnterDelay } = props;
    const childrenProps = (children as React.ReactElement<any>).props;

    if (React.isValidElement(children) && event.type === 'blur' && childrenProps.onBlur) {
      childrenProps.onBlur(event);
    }

    if (React.isValidElement(children) && event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    clearTimeoutAndRef(enterTimer);
    clearTimeoutAndRef(leaveTimer);
    leaveTimer.current = setTimeout(() => {
      handleClose();
    }, mouseEnterDelay);
  };

  const child = React.isValidElement(children) ? children : <span>{children}</span>;
  const childrenProps: React.RefAttributes<any> & React.HTMLAttributes<any> = {
    ...(children && (children as React.ReactElement).props),
  };

  const event: React.DOMAttributes<HTMLDivElement> = {};
  if (trigger === 'click') {
    childrenProps.onClick = handleClick;
  }

  if (trigger === 'contextMenu') {
    childrenProps.onContextMenu = handleClick;
  }
  if (trigger === 'hover') {
    childrenProps.onMouseOver = handleEnter;
    childrenProps.onMouseLeave = handleLeave;
    event.onMouseOver = handleEnter;
    event.onMouseLeave = handleLeave;
  }
  if (trigger === 'focus') {
    childrenProps.onFocus = handleClick;
    // childrenProps.onBlur = handleLeave;
  }

  const toolTip = useMemo(() => {
    return (
      <ClickOutside
        onClickOutside={handleClose}
        ignoredNode={reference!}
        className={`${prefixCls}-popper-container`}
        disabled={trigger === 'manual'}
      >
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            animationDuration: `${animationDuration}ms`,
            ...(animationState === 'leave' && !isPending && { display: 'none' }),
            ...style,
          }}
          className={innerCls}
          ref={(node) => {
            setPopperNode(node);
          }}
          {...event}
          onAnimationEnd={animationEnd}
        >
          <div className={bem('content')}>
            {content}
            {hasArrow && <span className={bem('arrow', [arrowClassName])} ref={arrowRef} />}
          </div>
        </div>
      </ClickOutside>
    );
  }, [animationState, isPending, content]);

  return (
    <>
      {mounted && createPortal(toolTip, getMountContainer(mountContainer))}
      {React.cloneElement(child, {
        ref: (node) => {
          // eslint-disable-next-line react/no-find-dom-node
          setReference(ReactDOM.findDOMNode(node) as HTMLElement);
        },
        ...childrenProps,
      })}
    </>
  );
});

Popper.defaultProps = {
  hasArrow: false,
  destroy: false,
  arrowPointAtCenter: false,
  trigger:
    (canUseDOM && /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
      ? 'click'
      : 'hover') || 'click',
  direction: 'top',
  mouseEnterDelay: 150,
  mouseLeaveDelay: 100,
  visible: false,
  animationType: 'zoomFade',
  animationDuration: 300,
  onVisibleChange: () => {},
};

export default Popper;
