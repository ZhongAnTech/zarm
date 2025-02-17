import { FieldNames } from '../picker-view/interface';
import { resolvedFieldNames } from '../picker-view/utils';
import type {
  BaseCascaderViewProps,
  CascaderItem,
  CascaderOption,
  CascaderValue,
} from './interface';

export const parseState = (props: BaseCascaderViewProps) => {
  const { value, defaultValue } = props;
  const currentValue: CascaderValue[] = [];

  return {
    value: value || defaultValue,
    currentValue,
  };
};

export const parseItems = (
  options: CascaderOption[],
  value: CascaderValue[],
  fieldNames?: Partial<FieldNames>,
) => {
  const field = resolvedFieldNames(fieldNames);
  const items: CascaderItem[] = [];
  const traverse = (memo: CascaderOption[], depth = 0) => {
    memo.forEach((option) => {
      const children = option[field.children] as CascaderOption[] | undefined;
      const currentValue = value[depth];
      if (option[field.value] === currentValue) {
        items[depth] = option;

        if (Array.isArray(children) && children.length > 0) {
          traverse(children, depth + 1);
        }
      }
    });
  };

  traverse(options);

  return items;
};
