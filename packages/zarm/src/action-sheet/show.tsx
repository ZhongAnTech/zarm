import * as React from 'react';
import ActionSheet, { ActionSheetProps } from './ActionSheet';
import renderToContainer from '../utils/renderToContainer';
import { RuntimeConfigProvider } from '../config-provider/ConfigProvider';

interface ActionSheetRef {
  close: () => void;
}

const showActionSheet = (props: Omit<ActionSheetProps, 'visible'>) => {
  let unmount = () => {};

  const Wrapper = React.forwardRef<ActionSheetRef>((_, wrapperRef) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      setVisible(true);
    }, []);

    React.useImperativeHandle(wrapperRef, () => ({
      close: () => {
        setVisible(false);
      },
    }));

    return (
      <RuntimeConfigProvider>
        <ActionSheet
          {...props}
          visible={visible}
          afterClose={() => {
            props.afterClose?.();
            unmount();
          }}
          mountContainer={false}
        />
      </RuntimeConfigProvider>
    );
  });

  const ref = React.createRef<ActionSheetRef>();
  unmount = renderToContainer(<Wrapper ref={ref} />, props.mountContainer);

  return {
    close: () => {
      ref.current?.close();
    },
  };
};

export default showActionSheet;
