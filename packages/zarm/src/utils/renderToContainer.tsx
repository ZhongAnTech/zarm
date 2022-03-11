import React from 'react';
import ReactDOM from 'react-dom';
import { ContainerType, getMountContainer } from './dom';

export default function renderToContainer(
  element: React.ReactElement,
  mountContainer?: ContainerType,
) {
  const container = getMountContainer(mountContainer);
  const wrapper = document.createElement('div');

  container.appendChild(wrapper);

  function unmount() {
    const removed = ReactDOM.unmountComponentAtNode(wrapper);
    if (removed && wrapper.parentNode) {
      wrapper.parentNode.removeChild(wrapper);
    }
  }

  ReactDOM.render(element, wrapper);
  return unmount;
}
