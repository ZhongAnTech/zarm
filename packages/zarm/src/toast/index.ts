import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Toast from './Toast';
import useToast from './useToast';

export type { ToastProps } from './Toast';
export type UseToast = typeof useToast;

export default attachPropertiesToComponent(Toast, { useToast });
