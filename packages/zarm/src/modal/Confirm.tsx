import * as React from 'react';
import Confirm from '../confirm';
import renderToContainer from '../utils/renderToContainer';
import { RuntimeConfigProvider } from '../n-config-provider/ConfigProvider';
import type { ConfirmProps } from '../confirm';

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
            onConfirm={async () => {
              const close = await props.onConfirm?.();
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
            mountContainer={false}
          />
        </RuntimeConfigProvider>
      );
    };

    unmount = renderToContainer(<Wrapper />, props.mountContainer);
  });
};

export default confirm;
