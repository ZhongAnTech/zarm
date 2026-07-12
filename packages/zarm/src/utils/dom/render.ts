// 移植自 rc-util: https://github.com/react-component/util/blob/master/src/React/render.ts
import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Root {
  render(node: React.ReactElement): void;
  unmount(): void;
}

type CreateRoot = (container: ContainerType) => Root;

// Let compiler not to search module usage
const fullClone = {
  ...ReactDOM,
} as typeof ReactDOM & {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
    usingClientEntryPoint?: boolean;
  };
  createRoot?: CreateRoot;
  render?: (node: React.ReactElement, container: ContainerType) => void;
  unmountComponentAtNode?: (container: ContainerType) => boolean;
};

const { version, render: reactRender, unmountComponentAtNode } = fullClone;

let createRoot: CreateRoot;

/**
 * React 19 no longer exposes the legacy render APIs from `react-dom`.
 * Keep `react-dom/client` behind an opt-in entry so React 16/17 consumers
 * never have to resolve a module that does not exist in their installation.
 */
export function setCreateRoot(createRootImpl: CreateRoot) {
  createRoot = createRootImpl;
}

try {
  const mainVersion = Number((version || '').split('.')[0]);
  if (mainVersion >= 18 && fullClone.createRoot) {
    createRoot = fullClone.createRoot;
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
  if (!reactRender) {
    throw new Error(
      "React 19 requires the Zarm renderer adapter. Import 'zarm/react19' once in your app entry.",
    );
  }
  reactRender(node, container);
}

function modernRender(node: React.ReactElement, container: ContainerType) {
  toggleWarning(true);
  const root = container[MARK] || createRoot(container);
  toggleWarning(false);
  root.render(node);
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
  return unmountComponentAtNode?.(container);
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
