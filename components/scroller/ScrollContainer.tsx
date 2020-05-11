
export type ContainerType = HTMLElement | (() => HTMLElement);

export const getScrollContainer = (container?: ContainerType): HTMLElement | Window => {
  if (container) {
    if (typeof container === 'function') {
      return container();
    }
    if (typeof container === 'object' && container instanceof HTMLElement) {
      return container;
    }
  }
  return window;
};

export const getScrollTop = (container?: ContainerType): number => {
  const scrollContainer = getScrollContainer(container);
  return scrollContainer !== window
    ? (scrollContainer as HTMLElement).scrollTop
    : document.documentElement.scrollTop + document.body.scrollTop;
};
