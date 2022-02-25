import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import type { BaseBackTopProps } from './interface';
import {
  canUseDOM,
  getMountContainer,
  getScrollContainer,
  getScrollTop,
  scrollTo,
} from '../utils/dom';

export interface BackTopProps extends BaseBackTopProps {
  style?: React.CSSProperties;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
}

const BackTop: React.FC<BackTopProps> = (props) => {
  const { className, style, visibleDistance, onClick, children } = props;
  const [visible, setVisible] = React.useState(false);
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-back-top`;

  const scrollContainer = React.useMemo(() => {
    return canUseDOM ? getScrollContainer(props.scrollContainer) : undefined;
  }, [props.scrollContainer]);

  const mountContainer = React.useMemo(() => {
    return canUseDOM ? getMountContainer(props.mountContainer) : undefined;
  }, [props.mountContainer]);

  const onScroll = (event: Event) => {
    const scrollTop = getScrollTop(event.target as HTMLElement) || 0;
    setVisible(scrollTop > visibleDistance!);
  };

  const scrollToTop = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);

    if (!scrollContainer) return;
    const scrollTop = getScrollTop(scrollContainer as HTMLElement) || 0;
    const speed = props.speed || 0;
    const duration = speed <= 0 || speed === Infinity ? 0 : scrollTop / ((speed / 10) * 1000);
    scrollTo(scrollContainer, 0, 0, duration);
  };

  React.useEffect(() => {
    scrollContainer?.addEventListener('scroll', onScroll);
    return () => {
      scrollContainer?.removeEventListener('scroll', onScroll);
    };
  }, [scrollContainer]);

  const element = React.useMemo(() => {
    if (!canUseDOM || !mountContainer) return null;

    return ReactDOM.createPortal(
      <div
        className={classnames(prefixCls, className)}
        style={{
          display: !visible ? 'none' : 'inline',
          position: mountContainer !== document.body ? 'absolute' : 'fixed',
          bottom: 50,
          right: 50,
          ...style,
        }}
        onClick={scrollToTop}
      >
        {children}
      </div>,
      mountContainer,
    );
  }, [visible, mountContainer]);

  return element;
};

BackTop.defaultProps = {
  speed: 100,
  visibleDistance: 400,
};

export default BackTop;
