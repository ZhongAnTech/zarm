import * as React from 'react';
import ActionSheet, { ActionSheetProps } from './ActionSheet';
import renderToContainer from '../utils/renderToContainer';
import { RuntimeConfigProvider } from '../n-config-provider/ConfigProvider';
import type { ContainerType } from '../utils/dom';

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
          mountContainer={false}
          visible={visible}
          afterClose={() => {
            props.afterClose?.();
            unmount();
          }}
        />
      </RuntimeConfigProvider>
    );
  });

  const ref = React.createRef<ActionSheetRef>();
  unmount = renderToContainer(props.mountContainer as ContainerType, <Wrapper ref={ref} />);

  return {
    close: () => {
      ref.current?.close();
    },
  };
};

export default showActionSheet;
