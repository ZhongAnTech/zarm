import React, { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ConfigContext } from '../n-config-provider';
import { getMountContainer } from '../utils/dom';
import Loading from './Loading';
import type { LoadingProps, UseLoading } from './Loading';

const contentIsToastProps = (content: ReactNode | LoadingProps): content is LoadingProps =>
  !!content && typeof content === 'object' && 'content' in content;

const useLoading = (): UseLoading => {
  const { prefixCls } = React.useContext(ConfigContext);
  const zarmLoadingRef = useRef<HTMLElement | null>(null);
  const toastContainerRef = useRef<HTMLElement | null>(null);

  const hideHelperRef = useRef(() => {});
  const unmountNode = () => {
    if (zarmLoadingRef.current != null) {
      ReactDOM.render(<></>, zarmLoadingRef.current);
      toastContainerRef.current?.removeChild(zarmLoadingRef.current);
      ReactDOM.unmountComponentAtNode(zarmLoadingRef.current);
      zarmLoadingRef.current = null;
    }
  };
  const removeDom = (propAfterClose?: Function) => {
    if (zarmLoadingRef.current != null) {
      toastContainerRef.current?.removeChild(zarmLoadingRef.current);
      ReactDOM.unmountComponentAtNode(zarmLoadingRef.current);
      zarmLoadingRef.current = null;
    }
    if (typeof propAfterClose === 'function') {
      propAfterClose();
    }
  };
  const show = (content: ReactNode | LoadingProps) => {
    unmountNode();
    if (zarmLoadingRef.current == null) {
      zarmLoadingRef.current = document.createElement('div');
      zarmLoadingRef.current.classList.add(`${prefixCls}-toast-container`);
      if (contentIsToastProps(content) && content.className) {
        zarmLoadingRef.current.classList.add(content.className);
      }
      toastContainerRef.current =
        contentIsToastProps(content) && content.mountContainer
          ? getMountContainer(content.mountContainer)
          : getMountContainer();
      toastContainerRef.current.appendChild(zarmLoadingRef.current);
    }

    if (zarmLoadingRef.current != null) {
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
      const props: LoadingProps = contentIsToastProps(content)
        ? {
            ...Loading.defaultProps,
            ...content,
            mountContainer: false,
            visible: true,
            afterClose,
          }
        : {
            ...Loading.defaultProps,
            visible: true,
            mountContainer: false,
            content,
            afterClose,
          };
      ReactDOM.render(<Loading {...props} />, zarmLoadingRef.current);
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
export default useLoading;
