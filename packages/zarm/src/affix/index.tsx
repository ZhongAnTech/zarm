import React, { useState, useEffect, forwardRef, useRef, useCallback, CSSProperties } from 'react';
import classnames from 'classnames';
import { AffixProps as BaseAffixProps } from './interface';
import Events from '../utils/events';
import { canUseDOM } from '../utils/dom';
import throttle from '../utils/throttle';

export interface AffixStates {
  affixed: boolean;
  // used to record origin dom rect
  width: number;
  height: number;
}

export interface AffixProps extends BaseAffixProps {
  prefixCls?: string;
  className?: string;
}

const DEFAULT_SCROLL_CONTAINER = canUseDOM ? window : undefined;

const Affix = forwardRef<unknown, AffixProps>((props, ref) => {
  const {
    prefixCls,
    className,
    children,
    offsetBottom,
    offsetTop,
    onChange,
    scrollContainer,
  } = props;
  const cls = classnames(prefixCls, className);

  const [affixState, setAffixState] = useState<AffixStates>({
    affixed: false,
    width: 0,
    height: 0,
  });

  const savePlaceholderNode = (ref as any) || React.createRef<HTMLDivElement>();
  const saveFixedNode = React.createRef<HTMLDivElement>();

  const fixedNodeTopRef = useRef('offsetBottom' in props ? -10000 : 10000);

  const getContainer = useCallback(() => {
    const container = typeof scrollContainer === 'function' ? scrollContainer!() : scrollContainer;
    return !container ? window : container;
  }, [scrollContainer]);

  const getContainerRect = (): DOMRect => {
    const container = getContainer();

    if (!canUseDOM) {
      return { top: 0, bottom: 0 } as any;
    }

    return container !== window
      ? (container as HTMLElement).getBoundingClientRect()
      : ({ top: 0, bottom: container.innerHeight, width: 0, height: 0 } as any);
  };

  const getAffixed = () => {
    const containerRect = getContainerRect();
    if (
      typeof offsetBottom !== 'undefined' &&
      fixedNodeTopRef.current + offsetBottom >= containerRect.bottom
    ) {
      return true;
    }

    if (
      typeof offsetBottom === 'undefined' &&
      typeof offsetTop !== 'undefined' &&
      fixedNodeTopRef.current - offsetTop <= containerRect.top
    ) {
      return true;
    }

    return false;
  };

  const onPositionUpdate = throttle(() => {
    const { affixed } = affixState;
    const target = savePlaceholderNode.current!;
    if (!target) {
      return false;
    }
    const { top, width, height } = target?.getBoundingClientRect();

    fixedNodeTopRef.current = top;

    const currentAffixed = getAffixed();
    if (currentAffixed !== affixed) {
      setAffixState({
        affixed: currentAffixed,
        // use 'auto' when get width or height is 0
        width: width === 0 ? ('auto' as any) : width,
        height: height === 0 ? ('auto' as any) : height,
      });
      onChange && onChange(currentAffixed);
    }
  }, 10);

  const getAffixStyle = (): CSSProperties => {
    const containerRect = getContainerRect();
    const affixed = getAffixed();

    const { width, height } = affixState;

    if (affixed && offsetBottom != null) {
      return {
        position: 'fixed',
        bottom: offsetBottom,
        width,
        height,
      };
    }

    if (affixed && offsetTop != null) {
      return {
        position: 'fixed',
        top: containerRect.top + offsetTop,
        width,
        height,
      };
    }

    return {};
  };

  useEffect(() => {
    // wait for ref not null
    setTimeout(() => {
      Events.on(getContainer(), 'scroll', onPositionUpdate);
      if (offsetBottom != null) {
        onPositionUpdate();
      }
    });

    return () => {
      setTimeout(() => {
        const container = getContainer();
        Events.off(container, 'scroll', onPositionUpdate);
      });
    };
  }, [getContainer, offsetBottom, onPositionUpdate]);

  if (!getAffixed()) {
    return <div ref={savePlaceholderNode}>{children}</div>;
  }

  return (
    <div ref={savePlaceholderNode}>
      <div className={cls} ref={saveFixedNode} style={getAffixStyle()}>
        {children}
      </div>
    </div>
  );
});

Affix.displayName = 'Affix';

Affix.defaultProps = {
  prefixCls: 'za-affix',
  scrollContainer: DEFAULT_SCROLL_CONTAINER,
  offsetTop: 0,
};

export default Affix;
