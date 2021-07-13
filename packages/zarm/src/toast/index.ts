import Toast from './Toast';
import useToast from './useToast';

export type { ToastProps, UseToast } from './Toast';

Toast.useToast = useToast;

export default Toast;
