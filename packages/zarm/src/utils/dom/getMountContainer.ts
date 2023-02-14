import isFunction from 'lodash/isFunction';

export type MountContainer = HTMLElement | (() => HTMLElement) | undefined | null | false;

export function getMountContainer(mountContainer?: MountContainer): HTMLElement {
  const container = isFunction(mountContainer) ? mountContainer() : mountContainer;
  return container || document.body;
}
