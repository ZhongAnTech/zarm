import * as React from 'react';
import { createPortal } from 'react-dom';
import { resolveContainer } from './getContainer';
import { canUseDOM } from '.';
import type { ContainerType } from '.';

export function renderToContainer(
  getContainer: ContainerType,
  node: React.ReactElement,
): React.ReactElement {
  if (canUseDOM && getContainer) {
    const container = resolveContainer(getContainer);
    return createPortal(node, container);
  }

  return node;
}
