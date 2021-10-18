import React, { useEffect } from 'react';
import { ContainerType } from '../utils/dom';
import renderToContainer from '../utils/renderToContainer';
import Content from './Content';
import type { BackTopTopProps } from './Content';

const BackToTop = (props: BackTopTopProps) => {
  const { scrollContainer } = props;
  let unmount = () => {};

  useEffect(() => {
    unmount = renderToContainer(scrollContainer as ContainerType, <Content {...props} />);
    return () => unmount();
  }, [scrollContainer]);

  return null;
};

BackToTop.displayName = 'BackToTop';

BackToTop.defaultProps = {
  speed: 100,
  visibleDistance: 400,
  style: { bottom: 50, right: 50 },
};

export default BackToTop;
