import * as React from 'react';
import { getMountContainer, MountContainer } from './getMountContainer';
import { render, unmount as reactUnmount } from './render';

export const renderTo = (element: React.ReactElement, mountContainer?: MountContainer) => {
  const container = document.createElement('div');
  getMountContainer(mountContainer).appendChild(container);
  const unmount = () => {
    const unmountResult = reactUnmount(container);
    if (unmountResult && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  };

  render(element, container);

  return unmount;
};
