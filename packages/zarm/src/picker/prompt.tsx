import * as React from 'react';
import type { PickerValue, PickerColumnItem } from '../picker-view';
import type { PickerProps } from './Picker';
import Picker from './Picker';
import { renderToBody } from '../utils/dom/renderToBody';

export interface PickerPromptValue {
  value: PickerValue[];
  items: PickerColumnItem[];
}

export const prompt = (props: Omit<PickerProps, 'value' | 'children' | 'mountContainer'>) => {
  return new Promise<PickerPromptValue>((resolve) => {
    const Wrapper: React.FC = () => {
      const [visible, setVisible] = React.useState(false);
      React.useEffect(() => {
        setVisible(true);
      }, []);
      return (
        <Picker
          {...props}
          visible={visible}
          onConfirm={(value, items) => {
            props.onConfirm?.(value, items);
            setVisible(false);
            resolve({ value, items });
          }}
          onCancel={() => {
            props.onCancel?.();
            setVisible(false);
            resolve({ value: null, items: [] });
          }}
          afterClose={() => {
            props.afterClose?.();
            unmount();
          }}
          mountContainer={false}
        />
      );
    };

    const unmount = renderToBody(<Wrapper />);
  });
};
