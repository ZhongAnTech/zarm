// 移植自 rc-util: https://github.com/react-component/util/blob/master/src/React/render.ts
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { Root } from 'react-dom/client';

type CreateRoot = (container: ContainerType) => Root;

// Let compiler not to search module usage
const fullClone = {
  ...ReactDOM,
} as typeof ReactDOM & {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
    usingClientEntryPoint?: boolean;
  };
  createRoot?: CreateRoot;
};

const { version, render: reactRender, unmountComponentAtNode } = fullClone;

let createRoot: CreateRoot;
let flushSync;
try {
  const mainVersion = Number((version || '').split('.')[0]);
  if (mainVersion >= 18 && fullClone.createRoot) {
    createRoot = fullClone.createRoot;
    flushSync = fullClone.flushSync;
  }
} catch {
  // Do nothing;
}

function toggleWarning(skip: boolean) {
  const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = fullClone;

  if (
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED &&
    typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === 'object'
  ) {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = skip;
  }
}

const MARK = '__zarm_root__';

// ========================== Render ==========================
type ContainerType = (Element | DocumentFragment) & {
  [MARK]?: Root;
};

function legacyRender(node: React.ReactElement, container: ContainerType) {
  reactRender(node, container);
}

function modernRender(node: React.ReactElement, container: ContainerType) {
  toggleWarning(true);
  const root = container[MARK] || createRoot(container);
  toggleWarning(false);
  flushSync(() => {
    root.render(node);
  })
  container[MARK] = root;
}

export function render(node: React.ReactElement, container: ContainerType) {
  if (createRoot as unknown) {
    modernRender(node, container);
    return;
  }
  legacyRender(node, container);
}

function legacyUnmount(container: ContainerType) {
  return unmountComponentAtNode(container);
}

async function modernUnmount(container: ContainerType) {
  return Promise.resolve().then(() => {
    container[MARK]?.unmount();
    delete container[MARK];
  });
}

export function unmount(container: ContainerType) {
  if (createRoot as unknown) {
    return modernUnmount(container);
  }

  return legacyUnmount(container);
}
