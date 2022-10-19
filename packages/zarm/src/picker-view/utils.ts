import omit from 'lodash/omit';
import { toArray } from '../utils';
import type {
  BasePickerViewProps as PickerViewProps,
  PickerViewColumn,
  PickerViewColumnItem,
  PickerViewDataSource,
  PickerViewOption,
  PickerViewValue,
} from './interface';

const DEFAULT_FIELD_NAMES = {
  value: 'value',
  label: 'label',
  children: 'children',
};

export const resolvedFieldNames = <T = object>(
  left: Partial<T> | undefined,
  right: Required<T>,
) => {
  const merged = { ...right };
  Object.keys(right).forEach((key) => {
    merged[key] = left?.[key] || right[key];
  });
  return merged;
};

export const isCascader = (dataSource?: PickerViewDataSource): dataSource is PickerViewOption[] => {
  return Array.isArray(dataSource) && dataSource[0] && !Array.isArray(dataSource[0]);
};
export const isColumn = (dataSource?: PickerViewDataSource): dataSource is PickerViewColumn => {
  return Array.isArray(dataSource) && dataSource[0] && Array.isArray(dataSource[0]);
};

export const isValidValue = (value?: PickerViewValue | PickerViewValue[]) => {
  const currentValue = toArray(value);
  return currentValue.some((item) => !!item || item === 0 || item === false);
};

const resolvedValue = (props: PickerViewProps, initialValue?: PickerViewValue[]) => {
  const { value, defaultValue, wheelDefaultValue } = props;
  if ('value' in props && isValidValue(value)) {
    return toArray(value);
  }

  if ('defaultValue' in props && isValidValue(defaultValue)) {
    return toArray(defaultValue);
  }

  if ('wheelDefaultValue' in props && isValidValue(wheelDefaultValue)) {
    return toArray(wheelDefaultValue);
  }

  return toArray(initialValue);
};

export const resolveColumn = (props: PickerViewProps) => {
  const columns = toArray(props.dataSource) as PickerViewColumn;
  const fieldNames = resolvedFieldNames(props.fieldNames, DEFAULT_FIELD_NAMES);
  const value = resolvedValue(
    props,
    columns.map((item) => item?.[0]?.[fieldNames?.value!]),
  );
  return {
    value,
    columns,
    items: columns.map(
      (column, index) => column.filter((option) => option?.[fieldNames.value] === value[index])[0],
    ),
  };
};

const resolveCascade = (props: PickerViewProps) => {
  const { cols } = props;
  const fieldNames = resolvedFieldNames(props.fieldNames, DEFAULT_FIELD_NAMES);

  const value: PickerViewValue[] = resolvedValue(props, []);
  const columns: PickerViewColumn[] = [];
  const items: PickerViewColumnItem[] = [];
  const traverse = (options: PickerViewOption[], depth = 0) => {
    columns[depth] = options.map((option, index) => {
      const rest = omit<PickerViewColumnItem>(option, fieldNames.children) as PickerViewColumnItem;
      const children = option[fieldNames.children] as PickerViewOption[] | undefined;
      const currentValue = value[depth];
      if (
        (isValidValue(currentValue) && rest[fieldNames.value] === currentValue) ||
        (!isValidValue(currentValue) && index === 0)
      ) {
        value[depth] = rest[fieldNames.value];
        items[depth] = rest;

        if (Array.isArray(children) && children.length > 0 && depth + 1 < cols!) {
          traverse(children, depth + 1);
        }
      }
      return rest;
    });
  };

  traverse(props.dataSource as PickerViewOption[]);

  return {
    value,
    items,
    columns,
  };
};

export const resolved = (props: PickerViewProps) => {
  return isCascader(props.dataSource) ? resolveCascade(props) : resolveColumn(props);
};
