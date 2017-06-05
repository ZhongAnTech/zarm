import { findDOMNode } from 'react-dom';

const components = {};
let timeout = null;
let isLock = false;
let winHeight = 0;
let id = (new Date()).getTime();

const _getId = () => {
  return id++;
};

const _isOutView = (comp) => {
  const rect = findDOMNode(comp).getBoundingClientRect();

  return rect.bottom < 0 || rect.top > winHeight;
};

export function isLazyLoad(props) {
  const { isLazy } = props;

  return 'lazy' in props || isLazy;
}

export function addStack(comp) {
  if (_isOutView(comp)) {
    const uId = _getId();
    components[uId] = comp;
    return uId;
  }

  comp.markToRender();
}

export function removeStack(uId) {
  if (!uId) {
    return null;
  }

  delete components[uId];
}

export function dispatch() {
  if (isLock) {
    return null;
  }

  isLock = true;

  // handle
  Object.keys(components).forEach((key) => {
    const comp = components[key];
    if (_isOutView(comp)) {
      return null;
    }

    delete components[key];
    comp.markToRender();
  });

  isLock = false;
}

if (window && document) {
  winHeight = window.innerHeight || document.documentElement.clientHeight;

  // scroll event
  document.addEventListener('scroll', () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      dispatch();
      timeout = null;
    }, 0);
  });
}
