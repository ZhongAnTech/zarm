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

  const removeDom = (afterClose?: ToastProps['afterClose']) => {
    if (zarmToastRef.current && toastContainerRef.current) {
      toastContainerRef.current.removeChild(zarmToastRef.current);
      ReactDOM.unmountComponentAtNode(zarmToastRef.current);
      zarmToastRef.current = null;
    }
    typeof afterClose === 'function' && afterClose();
  };
  const show = (content: ReactNode | ToastProps) => {
    removeDom();
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

    let afterClose: ToastProps['afterClose'] = removeDom;
    if (contentIsToastProps(content)) {
      afterClose = () => removeDom(content.afterClose);
    }
    hideHelperRef.current = afterClose;
    const props: ToastProps = contentIsToastProps(content)
      ? {
          ...Toast.defaultProps,
          ...content,
          visible: true,
          mountContainer: false,
          afterClose,
        }
      : {
          ...Toast.defaultProps,
          content,
          visible: true,
          mountContainer: false,
          afterClose,
        };
    ReactDOM.render(<Toast {...props} />, zarmToastRef.current);
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
