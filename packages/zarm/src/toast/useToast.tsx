import React, { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ConfigContext } from '../n-config-provider';
import { getMountContainer } from '../utils/dom';
import Toast from './Toast';
import type { ToastProps, UseToast } from './Toast';

const contentIsToastProps = (content: ReactNode | ToastProps): content is ToastProps =>
  !!content && typeof content === 'object' && 'content' in content;

const useToast = (): UseToast => {
  const { prefixCls } = React.useContext(ConfigContext);
  const zarmToastRef = useRef<HTMLElement | null>(null);
  const toastContainerRef = useRef<HTMLElement | null>(null);

  const hideHelperRef = useRef(() => {});
  const unmountNode = () => {
    if (zarmToastRef.current != null) {
      ReactDOM.render(<></>, zarmToastRef.current);
      toastContainerRef.current?.removeChild(zarmToastRef.current);
      ReactDOM.unmountComponentAtNode(zarmToastRef.current);
      zarmToastRef.current = null;
    }
  };
  const removeDom = (propAfterClose?: Function) => {
    if (zarmToastRef.current != null) {
      toastContainerRef.current?.removeChild(zarmToastRef.current);
      ReactDOM.unmountComponentAtNode(zarmToastRef.current);
      zarmToastRef.current = null;
    }
    if (typeof propAfterClose === 'function') {
      propAfterClose();
    }
  };
  const show = (content: ReactNode | ToastProps) => {
    unmountNode();
    if (zarmToastRef.current == null) {
      zarmToastRef.current = document.createElement('div');
      zarmToastRef.current.classList.add(`${prefixCls}-toast-container`);
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
      let afterClose: () => void;
      if (contentIsToastProps(content)) {
        afterClose = () => {
          removeDom(content.afterClose);
        };
      } else {
        afterClose = () => {
          removeDom();
        };
      }
      hideHelperRef.current = afterClose;
      const props: ToastProps = contentIsToastProps(content)
        ? {
            ...Toast.defaultProps,
            ...content,
            mountContainer: false,
            visible: true,
            afterClose,
          }
        : {
            ...Toast.defaultProps,
            visible: true,
            mountContainer: false,
            content,
            afterClose,
          };
      ReactDOM.render(<Toast {...props} />, zarmToastRef.current);
    }
  };

  const hide = () => {
    hideHelperRef.current();
  };
  return {
    show,
    hide,
  };
};
export default useToast;
