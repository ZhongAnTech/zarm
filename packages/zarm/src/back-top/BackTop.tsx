import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBEM } from '@zarm-design/bem';
import { useScroll } from '@use-gesture/react';
import { ConfigContext } from '../n-config-provider';
import type { BaseBackTopProps } from './interface';
import { HTMLProps } from '../utils/utilityTypes';
import {
  canUseDOM,
  getMountContainer,
  getScrollContainer,
  getScrollTop,
  scrollTo,
} from '../utils/dom';

export interface BackTopCssVars {
  '--right'?: React.CSSProperties['right'];
  '--bottom'?: React.CSSProperties['bottom'];
}

export interface BackTopProps extends BaseBackTopProps, HTMLProps<BackTopCssVars> {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const BackTop: React.FC<BackTopProps> = (props) => {
  const { className, style, visibleDistance, destroy, onClick, children } = props;
  const [visible, setVisible] = React.useState(false);
  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('back-top', { prefixCls });
  const cls = bem([className]);

  const scrollContainer = React.useMemo(() => {
    return canUseDOM ? getScrollContainer(props.scrollContainer) : undefined;
  }, [props.scrollContainer]);

  const mountContainer = React.useMemo(() => {
    return canUseDOM ? getMountContainer(props.mountContainer) : undefined;
  }, [props.mountContainer]);

  const scrollToTop = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);

    if (!scrollContainer) return;
    const scrollTop = getScrollTop(scrollContainer as HTMLElement) || 0;
    const speed = props.speed || 0;
    const duration = speed <= 0 || speed === Infinity ? 0 : scrollTop / ((speed / 10) * 1000);
    scrollTo(scrollContainer, 0, 0, duration);
  };

  useScroll(
    (event) => {
      const scrollTop = getScrollTop(event.target as HTMLElement) || 0;
      setVisible(scrollTop > visibleDistance!);
    },
    {
      target: scrollContainer,
    },
  );

  const element = React.useMemo(() => {
    if (!canUseDOM || !mountContainer) return null;

    return ReactDOM.createPortal(
      <div
        className={cls}
        style={{
          display: !visible ? 'none' : 'inline',
          position: mountContainer !== document.body ? 'absolute' : 'fixed',
          ...style,
        }}
        onClick={scrollToTop}
      >
        {children}
      </div>,
      mountContainer,
    );
  }, [visible, mountContainer]);

  return destroy && !visible ? null : element;
};

BackTop.defaultProps = {
  speed: 100,
  visibleDistance: 400,
  destroy: true,
};

export default BackTop;
