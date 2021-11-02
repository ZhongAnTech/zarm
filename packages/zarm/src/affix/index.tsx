import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useCallback,
  CSSProperties,
  HTMLAttributes,
} from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import { canUseDOM } from '../utils/dom';
import type { BaseAffixProps } from './interface';
import Events from '../utils/events';
import throttle from '../utils/throttle';

export interface AffixStates {
  affixed: boolean;
  // used to record origin dom rect
  width: number;
  height: number;
}

export type AffixProps = BaseAffixProps & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

const DEFAULT_SCROLL_CONTAINER = canUseDOM ? window : undefined;

const Affix = forwardRef<unknown, AffixProps>((props, ref) => {
  const { className, children, offsetBottom, offsetTop, onChange, scrollContainer } = props;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-affix`;
  const cls = classnames(prefixCls, className);

  const [affixState, setAffixState] = useState<AffixStates>({
    affixed: false,
    width: 0,
    height: 0,
  });

  const savePlaceholderNode = (ref as any) || React.createRef<HTMLDivElement>();

  const fixedNodeTopRef = useRef('offsetBottom' in props ? -10000 : 10000);

  const getContainer = useCallback(() => {
    const container = typeof scrollContainer === 'function' ? scrollContainer!() : scrollContainer;
    return !container ? window : container;
  }, [scrollContainer]);

  const getContainerRect = (): DOMRect => {
    if (!canUseDOM) {
      return { top: 0, bottom: 0 } as any;
    }

    const container = getContainer();

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
    window.setTimeout(() => {
      Events.on(getContainer(), 'scroll', onPositionUpdate);
      if (offsetBottom != null) {
        onPositionUpdate();
      }
    });

    return () => {
      window.setTimeout(() => {
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
      <div className={cls} style={getAffixStyle()}>
        {children}
      </div>
    </div>
  );
});

Affix.displayName = 'Affix';

Affix.defaultProps = {
  scrollContainer: DEFAULT_SCROLL_CONTAINER,
  offsetTop: 0,
};

export default Affix;
