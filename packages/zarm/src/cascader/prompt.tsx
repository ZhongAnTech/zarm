import * as React from 'react';
import { CascaderValue } from '../cascader-view/interface';
import type { CascaderProps } from './Cascader';
import Cascader from './Cascader';
import { renderToBody } from '../utils/dom/renderToBody';

export interface CascaderPromptValue {
  value: CascaderValue[];
}

export const prompt = (props: Omit<CascaderProps, 'value' | 'children'>) => {
  return new Promise<CascaderPromptValue>((resolve) => {
    const Wrapper: React.FC = () => {
      const [visible, setVisible] = React.useState(false);
      React.useEffect(() => {
        setVisible(true);
      }, []);
      return (
        <Cascader
          {...props}
          visible={visible}
          onConfirm={(value) => {
            props.onConfirm?.(value);
            setVisible(false);
            resolve({ value });
          }}
          onCancel={() => {
            props.onCancel?.();
            setVisible(false);
            resolve({ value: null });
          }}
          afterClose={() => {
            props.afterClose?.();
            unmount();
          }}
        />
      );
    };

    const unmount = renderToBody(<Wrapper />);
  });
};
