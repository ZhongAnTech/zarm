import { clear, config, show } from './methods';

export type { ToastHandler } from './methods';
export type { ToastProps } from './Toast';

const Toast = {
  show,
  clear,
  config,
};

export default Toast;
