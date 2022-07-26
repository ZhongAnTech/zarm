import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { canUseDOM, resolveContainer } from '../utils/dom';
import type { MountContainer } from '../utils/dom';

export interface PortalProps {
  mountContainer?: MountContainer;
}

const Portal: React.FC<PortalProps> = (props) => {
  const { mountContainer, children } = props;
  if (canUseDOM && mountContainer) {
    const container = resolveContainer(mountContainer);
    return ReactDOM.createPortal(children, container);
  }

  return children as React.ReactElement;
};

export default Portal;
