import { useScroll } from '@use-gesture/react';
import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Transition from '../transition';
import {
  canUseDOM,
  getMountContainer,
  getScrollContainer,
  getScrollTop,
  renderToContainer,
  scrollTo,
} from '../utils/dom';
import { HTMLProps } from '../utils/utilityTypes';
import type { BaseBackTopProps } from './interface';

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
  const { prefixCls, mountContainer: globalMountContainer, scrollContainer: globalScrollContainer } = React.useContext(ConfigContext);

  const bem = createBEM('back-top', { prefixCls });

  const scrollContainer = React.useMemo(() => {
    return canUseDOM ? getScrollContainer(props.scrollContainer ?? globalScrollContainer) : undefined;
  }, [props.scrollContainer, globalScrollContainer]);

  const mountContainer = React.useMemo(() => {
    return canUseDOM ? getMountContainer(props.mountContainer ?? globalMountContainer) : undefined;
  }, [props.mountContainer, globalMountContainer]);

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

  React.useEffect(() => {
    const scrollTop = getScrollTop(scrollContainer);
    setVisible(scrollTop > visibleDistance!);
  }, [scrollContainer]);

  return renderToContainer(
    mountContainer,
    <Transition
      visible={visible}
      duration={props.duration}
      destroy={destroy}
      tranisitionName={`${prefixCls}-fade`}
    >
      <div
        className={bem([className])}
        style={{
          position: mountContainer !== document.body ? 'absolute' : 'fixed',
          ...style,
        }}
        onClick={scrollToTop}
      >
        {children}
      </div>
    </Transition>,
  );
};

BackTop.defaultProps = {
  speed: 100,
  visibleDistance: 400,
  destroy: true,
};

export default BackTop;
