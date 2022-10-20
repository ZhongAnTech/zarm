import { withStaticProps } from '../utils/withStaticProps';
import Toast, { ToastProps } from './Toast';
import useToast from './useToast';

export type { ToastProps } from './Toast';

const ToastMixined = withStaticProps<React.PropsWithChildren<ToastProps>, { useToast: () => ReturnType<typeof useToast> }, HTMLDivElement>(Toast, { useToast })

export default ToastMixined;
