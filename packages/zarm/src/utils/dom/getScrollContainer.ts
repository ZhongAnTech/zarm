import isFunction from "lodash/isFunction";

type Container = HTMLElement | Window;
export type ScrollContainer = Container | (() => Container) | undefined | null;

export const getScrollContainer = (scrollContainer: ScrollContainer) => {
  const container = isFunction(scrollContainer) ? scrollContainer() : scrollContainer;
  return container || window;
};
