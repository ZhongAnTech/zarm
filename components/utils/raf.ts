let prev = Date.now();

const root = window as Window;

function fallback(fn: FrameRequestCallback): number {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = root.setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

const iRaf = root.requestAnimationFrame || fallback;

const iCancel = root.cancelAnimationFrame || root.clearTimeout;

export function raf(fn: FrameRequestCallback): number {
  return iRaf.call(root, fn);
}

export function cancelRaf(id: number) {
  iCancel.call(root, id);
}
