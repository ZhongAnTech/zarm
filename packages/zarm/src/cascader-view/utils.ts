import { BaseCascaderViewProps, CascaderValue } from './interface';

export const parseState = (props: BaseCascaderViewProps) => {
  const { value, defaultValue } = props;
  const currentValue: CascaderValue[] = [];
  return {
    value: value || defaultValue,
    currentValue,
  };
};
