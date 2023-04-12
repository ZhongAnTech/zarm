import * as React from 'react';
import classnames from 'classnames';
import { Transition as InternalTransition } from 'react-transition-group';
import type { BaseTransitionProps } from './interface';

export interface TransitionProps extends BaseTransitionProps {
  nodeRef?: React.RefObject<HTMLElement> | React.ForwardedRef<HTMLElement>;
  tranisitionName: string;
  duration?: number;
  children:
    | ((
        props: any,
        setNodeRef: (node: HTMLElement | null) => void,
      ) => React.ReactElement)
    | React.ReactElement;
  onEnter?: () => void;
  onEnterActive?: () => void;
  onEnterEnd?: () => void;
  onLeave?: () => void;
  onLeaveActive?: () => void;
  onLeaveEnd?: () => void;
}

enum TransitionState {
  UNMOUNTED = 'unmounted',
  ENTER = 'enter',
  ENTERING = 'entering',
  ENTERED = 'entered',
  EXIT = 'exit',
  EXITING = 'exiting',
  EXITED = 'exited',
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    visible,
    tranisitionName,
    duration = 300,
    destroy,
    children,
    onEnter,
    onEnterActive,
    onEnterEnd,
    onLeave,
    onLeaveActive,
    onLeaveEnd,
  } = props;
  const nodeRef = React.useRef<HTMLElement | null>();
  const [state, setState] = React.useState(TransitionState.UNMOUNTED);

  const unmounted = TransitionState.UNMOUNTED === state;
  const enter = TransitionState.ENTER === state;
  const entering = TransitionState.ENTERING === state;
  const leave = TransitionState.EXIT === state;
  const leaving = TransitionState.EXITING === state;
  const exited = TransitionState.EXITED === state;
  const running = enter || entering || leave || leaving;

  const className = classnames({
    [`${tranisitionName}-enter`]: enter || entering,
    [`${tranisitionName}-enter-active`]: entering,
    [`${tranisitionName}-leave`]: leave || leaving,
    [`${tranisitionName}-leave-active`]: leaving,
  });

  const timeout = running && duration && duration > 0 ? `${duration}ms` : undefined;

  const style: React.CSSProperties = {
    animationDuration: timeout,
    WebkitAnimationDuration: timeout,
    transitionDuration: timeout,
    WebkitTransitionDuration: timeout,
    display: (unmounted || exited) && !visible && !destroy ? 'none' : undefined,
  };

  const setNodeRef = (node: HTMLElement | null) => {
    nodeRef.current = node;
  };

  return (
    <InternalTransition
      nodeRef={nodeRef}
      in={visible}
      unmountOnExit={destroy}
      onEnter={() => {
        setState(TransitionState.ENTER);
        onEnter?.();
      }}
      onEntering={() => {
        setState(TransitionState.ENTERING);
        onEnterActive?.();
      }}
      onEntered={() => {
        setState(TransitionState.ENTERED);
        onEnterEnd?.();
      }}
      onExit={() => {
        setState(TransitionState.EXIT);
        onLeave?.();
      }}
      onExiting={() => {
        setState(TransitionState.EXITING);
        onLeaveActive?.();
      }}
      onExited={() => {
        setState(TransitionState.EXITED);
        onLeaveEnd?.();
      }}
      timeout={duration}
    >
      {() => {
        if (typeof children === 'function') {
          return children?.({ className, style, visible }, setNodeRef);
        }
        return React.cloneElement(children, {
          ref: setNodeRef,
          className: classnames(children.props.className, className),
          style: {
            ...children.props.style,
            ...style,
          },
        });
      }}
    </InternalTransition>
  );
};

export default Transition;
