import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import * as React from 'react';
import { renderImperatively } from '../utils/dom';
import Toast, { ToastProps } from './Toast';

let currentHandler: ToastHandler | null = null;
let currentTimer: number | null = null;

export interface ToastHandler {
  close: () => void;
  replace: (element: React.ReactElement) => void;
}

const defaultProps: ToastProps = {
  duration: 2000,
  mask: true,
  maskClickable: true,
};

export const show = (props: Omit<ToastProps, 'visible'> | string) => {
  const rest = { ...defaultProps, ...(isString(props) ? { content: props } : props) };

  const element = (
    <Toast
      {...rest}
      onClose={() => {
        currentHandler = null;
      }}
    />
  );

  if (currentHandler) {
    currentHandler.replace(element);
  } else {
    currentHandler = renderImperatively(element);
  }

  currentTimer && window.clearTimeout(currentTimer);

  if (rest.duration !== 0) {
    currentTimer = window.setTimeout(() => {
      clear();
    }, rest.duration);
  }

  return currentHandler;
};

export const clear = () => {
  currentHandler?.close();
  currentHandler = null;
};

type ToastPropsKey = keyof ToastProps;

const ALLOW_KEYS: ToastPropsKey[] = [
  'duration',
  'mask',
  'maskClassName',
  'maskStyle',
  'maskColor',
  'maskOpacity',
  'maskClickable',
  'mountContainer',
];

export const config = (props: Pick<ToastProps, typeof ALLOW_KEYS[number]>) => {
  if (!isPlainObject(props)) return;
  Object.entries(props).forEach(([key, value]) => {
    if (ALLOW_KEYS.indexOf(key as ToastPropsKey) === -1) return;
    if (value !== undefined) {
      defaultProps[key] = value;
    }
  });
};
