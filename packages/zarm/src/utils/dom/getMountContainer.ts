export type MountContainer = HTMLElement | (() => HTMLElement) | undefined | null | false;

export function resolveContainer(mountContainer: MountContainer): HTMLElement {
  const container = typeof mountContainer === 'function' ? mountContainer() : mountContainer;
  return container || document.body;
}
