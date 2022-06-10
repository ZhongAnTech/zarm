import React, { HTMLAttributes, useCallback, useEffect, useRef, useState, useMemo} from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';

import classnames from 'classnames';
import includes from 'lodash/includes';
import ClickOutside from '../click-outside';
import { canUseDOM, getOuterSizes, getMountContainer } from '../utils/dom';
import BasePopperProps, { PopperPlacement, directionMap } from './interface';
import { ConfigContext } from '../n-config-provider';
import Events from '../utils/events';
import { useSafeLayoutEffect } from '../utils/hooks';

export interface PopperProps extends BasePopperProps, HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
}

interface PopperStates {
  show: boolean;
  direction: PopperPlacement;
  arrowRef: any;
  mounted?: boolean;
  isPending: boolean;
  animationState: 'leave' | 'enter';
}

const Popper =  React.forwardRef<unknown, PopperProps>((props, ref) => {
  const container = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);

  const { visible, mountContainer, direction, trigger, animationDuration, hasArrow, className, animationType, content, style, children } = props;

  const prefixCls = `${globalPrefixCls}-popper`;

  const [reference, setReference] = useState<HTMLElement | null>();
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>();
  const [popperNode, setPopperNode] = useState<HTMLElement | null>()

  const [state, setState]= useState<PopperStates>({
    show: false,
    direction: direction!,
    arrowRef: null,
    mounted: false,
    isPending: false,
    animationState: 'leave'
  })

  const { isPending, animationState, mounted } = state;

  const getTransitionName = useCallback(() => {
    if (popperNode) {
      const placement = popperNode.getAttribute('x-placement');

      if (animationType === 'menuSlide' && placement) {
        if (includes(placement, 'top')) {
          return `za-${animationType}-down-${animationState}`;
        }
        return `za-${animationType}-up-${animationState}`;
      }
      return `za-${animationType}-${animationState}`;
    }
    return '';
  }, [popperNode, animationType, animationState]);

  const transitionName = getTransitionName();

  const innerCls = useMemo(() => {
    return classnames(className, prefixCls, `${prefixCls}--${direction}`, {
      [`${prefixCls}--hidden`]: animationState === 'leave',
      [transitionName!]: isPending,
    })
  }, [animationState, isPending]);

  const popperInstanceRef = React.useRef<PopperInstance | null>();

  const animationEnd = (e) => {
    e.stopPropagation();
    const { destroy } = props;

    if (animationState === 'leave') {
      setState({
          ...state,
          show: false,
          isPending: false,
          ...(destroy && { mounted: false }),
        }
      );
      // todo
    } else {
      props.onVisibleChange!(true);
    }
  };

  useSafeLayoutEffect(() => {
    if (!reference || !popperNode) {
     return;
    }
    const popperInstance: PopperInstance = createPopper(reference, popperNode!, {
      placement: directionMap[direction!],
      modifiers: [
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
            gpuAcceleration: false,
          },
        },
        {
          name: 'arrow',
          options: {
            element: arrowRef,
          },
        },
      ]
    });
    popperInstanceRef.current = popperInstance;
    return () => {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    }
  }, [reference, popperNode]);

  useEffect(() => {
    if (trigger === 'manual') {
      setState({
        ...state,
        show: !!visible,
        ...(visible && { mounted: true }),
      });
    }
  }, [visible, trigger]);


  const handleOpen = () => {
    enter();
  }

  const handleClick = (event) => {
    if (trigger === 'contextMenu') {
      event.preventDefault()
    };
    setState({ ...state,  mounted: true });
  }

  useEffect(() => {
    const { show } = state;
    if (mounted) {
      if (!show) {
        handleOpen();
      } else {
        handleClose();
      }
    }
  }, [mounted]);

  const enter = () => {
    setState({
      ...state,
      show: true,
      isPending: true,
      animationState: 'enter',
    });
  }

  const leave = () => {
    setState({
      ...state,
      show: false,
      isPending: true,
      animationState: 'leave',
    });
  }

  const enterTimer = useRef<number>();
  const leaveTimer = useRef<number>();
  const handleEnter = (event) => {
    const { mouseEnterDelay } = props;
    const childrenProps = (children as React.ReactElement<any>).props;

    if (React.isValidElement(children) && event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    enterTimer.current = window.setTimeout(() => {
      setState({ ...state, mounted: true });
      // handleOpen
    }, mouseEnterDelay);
  }

  const handleLeave = (event) => {
    const { mouseEnterDelay } = props;
    const childrenProps = (children as React.ReactElement<any>).props;

    if (React.isValidElement(children) && event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    clearTimeout(enterTimer.current!);
    clearTimeout(leaveTimer.current!);
    enterTimer.current = window.setTimeout(() => {
      setState({ ...state, mounted: true });
     //   handleOpen();
    }, mouseEnterDelay);
  }

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
    // childrenProps.onBlur = this.handleLeave;
  }

  const handleClose = () => {
    // if (!this.popper) {
    //   return;
    // }
    // console.error('handleClose')
    leave();
  }

  // console.log(state);

  const toolTip = (
      <ClickOutside
        onClickOutside={handleClose}
        ignoredNode={reference!}
        className={`${prefixCls}-container`}
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
          <div className={`${prefixCls}__content`}>{content}</div>
          {hasArrow && (
            <span
              className={`${prefixCls}__arrow`}
              ref={(el) => {
                setArrowRef(el);
              }}
            />
          )}
        </div>
      </ClickOutside>
    );

  return (
    <>
      {mounted && createPortal(toolTip, getMountContainer(mountContainer) )}
      {React.cloneElement(child, {
        ref: (node) => {
          // eslint-disable-next-line react/no-find-dom-node
          setReference(ReactDOM.findDOMNode(node) as HTMLElement);
        },
        ...childrenProps,
      })}
    </>
  );

})

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
  content: '',
  animationType: 'zoomFade',
  animationDuration: 300,
  onVisibleChange: () => {},
}

export default Popper;
