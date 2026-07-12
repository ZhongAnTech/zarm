import { createRoot } from 'react-dom/client';

const roots = new WeakMap();

export const getRoot = (container) => {
  const record = roots.get(container);
  if (record) {
    return record.root;
  }

  const root = createRoot(container);
  roots.set(container, { root, version: 0 });
  return root;
};

export const render = (node, container) => {
  const root = getRoot(container);
  const record = roots.get(container);
  record.version += 1;
  root.render(node);
  return root;
};

export const unmount = (container) => {
  const record = container && roots.get(container);
  if (!record) return false;
  const { version } = record;

  Promise.resolve().then(() => {
    const nextRecord = roots.get(container);
    if (nextRecord && nextRecord.root === record.root && nextRecord.version === version) {
      record.root.unmount();
      roots.delete(container);
    }
  });
  return true;
};

export const ReactDOMCompat = {
  createRoot: getRoot,
  render,
  unmountComponentAtNode: unmount,
};
