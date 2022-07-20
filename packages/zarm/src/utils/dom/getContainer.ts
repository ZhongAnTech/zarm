export function resolveContainer(
  getContainer: HTMLElement | (() => HTMLElement) | undefined | null,
): HTMLElement {
  const container = typeof getContainer === 'function' ? getContainer() : getContainer;
  return container || document.body;
}
