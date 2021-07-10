import React, { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';
import { getMountContainer } from '../utils/dom';
import Toast, { ToastProps, UseToast } from './Toast';

const contentIsToastProps = (content: ReactNode | ToastProps): content is ToastProps =>
  !!content && typeof content === 'object' && 'content' in content;

const useToast = (): UseToast => {
  const zarmToastRef = useRef<HTMLElement | null>(null);
  const toastContainerRef = useRef<HTMLElement | null>(null);

  const hideHelperRef = useRef(() => {});
  const unmountNode = () => {
    if (zarmToastRef.current != null) {
      ReactDOM.render(<></>, zarmToastRef.current);
      toastContainerRef.current?.removeChild(zarmToastRef.current);
      zarmToastRef.current = null;
    }
  };
  const show = (content: ReactNode | ToastProps) => {
    unmountNode();
    if (zarmToastRef.current == null) {
      zarmToastRef.current = document.createElement('div');
      zarmToastRef.current.classList.add('za-toast-container');
      if (contentIsToastProps(content) && content.className) {
        zarmToastRef.current.classList.add(content.className);
      }
      toastContainerRef.current =
        contentIsToastProps(content) && content.mountContainer
          ? getMountContainer(content.mountContainer)
          : getMountContainer();
      toastContainerRef.current.appendChild(zarmToastRef.current);
    }

    if (zarmToastRef.current != null) {
      const props: ToastProps = contentIsToastProps(content)
        ? {
            ...Toast.defaultProps,
            ...content,
            mountContainer: false,
            visible: true,
          }
        : {
            ...Toast.defaultProps,
            visible: true,
            mountContainer: false,
            content,
          };

      hideHelperRef.current = () => {
        ReactDOM.render(<Toast {...props} visible={false} />, zarmToastRef.current);
      };
      ReactDOM.render(<Toast {...props} />, zarmToastRef.current);
    }
  };

  const hide = () => {
    if (zarmToastRef.current) {
      hideHelperRef.current();
    }
  };
  return {
    show,
    hide,
  };
};
export default useToast;
