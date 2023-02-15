// 移植自 antd-mobile: https://github1s.com/ant-design/ant-design-mobile/blob/HEAD/src/utils/render-imperatively.tsx
import * as React from 'react';
import { MountContainer } from '.';
import { getRuntimeConfig, RuntimeConfigProvider } from '../../config-provider';
import { renderTo } from './renderTo';

interface ImperativeProps {
  visible?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
  mountContainer?: MountContainer;
}

type TargetElement = React.ReactElement<ImperativeProps>;

export interface ImperativeHandler {
  close: () => void;
  replace: (element: TargetElement) => void;
}

export const renderImperatively = (element: TargetElement) => {
  const Wrapper = React.forwardRef<ImperativeHandler>((_, ref) => {
    const [visible, setVisible] = React.useState(false);
    const closedRef = React.useRef(false);
    const [elementToRender, setElementToRender] = React.useState(element);
    const keyRef = React.useRef(0);

    React.useEffect(() => {
      if (!closedRef.current) {
        setVisible(true);
      } else {
        afterClose();
      }
    }, []);

    const onClose = () => {
      closedRef.current = true;
      setVisible(false);
      elementToRender.props.onClose?.();
    };

    const afterClose = () => {
      unmount();
      elementToRender.props.afterClose?.();
    };

    React.useImperativeHandle(ref, () => ({
      close: onClose,
      replace: (replacedElement) => {
        keyRef.current += 1;
        elementToRender.props.afterClose?.();
        setElementToRender(replacedElement);
      },
    }));

    return React.cloneElement(elementToRender, {
      ...elementToRender.props,
      key: keyRef.current,
      mountContainer: false,
      visible,
      onClose,
      afterClose,
    });
  });
  const wrapperRef = React.createRef<ImperativeHandler>();
  const unmount = renderTo(
    <RuntimeConfigProvider>
      <Wrapper ref={wrapperRef} />
    </RuntimeConfigProvider>,
    element.props.mountContainer ?? getRuntimeConfig().mountContainer,
  );

  return {
    close: () => {
      wrapperRef.current?.close();
    },
    replace: (replacedElement) => {
      wrapperRef.current?.replace(replacedElement);
    },
  } as ImperativeHandler;
};
