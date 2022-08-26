import { BaseCascaderViewProps, IDataSource } from './Interface';

export const parseState = (props: BaseCascaderViewProps) => {
  const { value, defaultValue } = props;
  const currentValue: IDataSource[] = [];
  return {
    value: value || defaultValue,
    currentValue,
  };
};
