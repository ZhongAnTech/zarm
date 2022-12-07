import * as React from 'react';
import { createPortal } from 'react-dom';
import { getMountContainer } from './getMountContainer';
import type { MountContainer } from './getMountContainer';
import { canUseDOM } from '.';

export function renderToContainer(
  mountContainer: MountContainer,
  node: React.ReactElement,
): React.ReactElement {
  if (canUseDOM && mountContainer) {
    const container = getMountContainer(mountContainer);
    return createPortal(node, container);
  }

  return node;
}
