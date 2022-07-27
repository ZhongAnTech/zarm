type Container = HTMLElement | Window;
export type ScrollContainer = Container | (() => Container) | undefined | null;

export const getScrollContainer = (scrollContainer: ScrollContainer) => {
  const container = typeof scrollContainer === 'function' ? scrollContainer() : scrollContainer;
  return container || window;
};
