import { BaseCascaderViewProps, CascaderOption } from './interface';

export const parseState = (props: BaseCascaderViewProps) => {
  const { value, defaultValue } = props;
  const currentValue: CascaderOption[] = [];
  return {
    value: value || defaultValue,
    currentValue,
  };
};
