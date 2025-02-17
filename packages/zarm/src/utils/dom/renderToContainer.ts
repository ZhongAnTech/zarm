import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { canUseDOM } from '.';
import type { MountContainer } from './getMountContainer';
import { getMountContainer } from './getMountContainer';

export function renderToContainer(
  mountContainer: MountContainer,
  node: React.ReactElement,
): React.ReactElement {
  if (canUseDOM && mountContainer) {
    const container = getMountContainer(mountContainer);
    return ReactDOM.createPortal(node, container) as React.ReactPortal;
  }

  return node;
}
