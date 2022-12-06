import * as React from 'react';
import type { DatePickerValue } from '../date-picker-view/interface';
import type { DatePickerProps } from './DatePicker';
import DatePicker from './DatePicker';
import { renderToBody } from '../utils/dom/renderToBody';

export interface DatePickerPromptValue {
  value: DatePickerValue;
}

export const prompt = (props: Omit<DatePickerProps, 'value' | 'children'>) => {
  return new Promise<DatePickerPromptValue>((resolve) => {
    const Wrapper: React.FC = () => {
      const [visible, setVisible] = React.useState(false);
      React.useEffect(() => {
        setVisible(true);
      }, []);
      return (
        <DatePicker
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
