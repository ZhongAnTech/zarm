import React, { useEffect } from 'react';
import { canUseDOM, ContainerType } from '../utils/dom';
import renderToContainer from '../utils/renderToContainer';
import Content, { BackTopTopProps } from './Content';

const BackToTop = (props: BackTopTopProps) => {
  const { mountContainer } = props;
  let unmount = () => {};

  useEffect(() => {
    unmount = renderToContainer(mountContainer as ContainerType, <Content {...props} />);
    return () => unmount();
  }, []);

  return null;
};

BackToTop.displayName = 'BackToTop';

BackToTop.defaultProps = {
  speed: 100,
  visibleDistance: 400,
  scrollContainer: canUseDOM ? window : undefined,
};

export default BackToTop;
