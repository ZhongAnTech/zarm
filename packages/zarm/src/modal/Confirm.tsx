import * as React from 'react';
import Confirm from '../confirm';
import renderToContainer from '../utils/renderToContainer';
import { RuntimeConfigProvider } from '../n-config-provider/ConfigProvider';
import type { ConfirmProps } from '../confirm';
import type { ContainerType } from '../utils/dom';

const confirm = (props: Omit<ConfirmProps, 'visible'>): Promise<boolean> => {
  return new Promise((resolve) => {
    let unmount = () => {};
    const Wrapper = () => {
      const [visible, setVisible] = React.useState(false);
      React.useEffect(() => {
        setVisible(true);
      }, []);

      return (
        <RuntimeConfigProvider>
          <Confirm
            {...props}
            visible={visible}
            mountContainer={false}
            onOk={async () => {
              const close = await props.onOk?.();
              if (close === false) return;
              setVisible(false);
              resolve(true);
            }}
            onCancel={async () => {
              const close = await props.onCancel?.();
              if (close === false) return;
              setVisible(false);
              resolve(false);
            }}
            afterClose={() => {
              props.afterClose?.();
              unmount();
            }}
          />
        </RuntimeConfigProvider>
      );
    };

    unmount = renderToContainer(props.mountContainer as ContainerType, <Wrapper />);
  });
};

export default confirm;
