import omit from 'lodash/omit';
import { toArray } from '../utils';
import type {
  BasePickerViewProps as PickerViewProps,
  PickerColumn,
  PickerColumnItem,
  PickerDataSource,
  PickerOption,
  PickerValue,
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

export const isCascader = (dataSource?: PickerDataSource): dataSource is PickerOption[] => {
  return Array.isArray(dataSource) && dataSource[0] && !Array.isArray(dataSource[0]);
};
export const isColumn = (dataSource?: PickerDataSource): dataSource is PickerColumn => {
  return Array.isArray(dataSource) && dataSource[0] && Array.isArray(dataSource[0]);
};

export const isValidValue = (value?: PickerValue | PickerValue[]) => {
  const currentValue = toArray(value);
  return currentValue.some((item) => !!item || item === 0 || item === false);
};

const resolvedValue = (props: PickerViewProps, initialValue?: PickerValue[]) => {
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
  const columns = toArray(props.dataSource) as PickerColumn;
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

  const value: PickerValue[] = resolvedValue(props, []);
  const columns: PickerColumn[] = [];
  const items: PickerColumnItem[] = [];
  const traverse = (options: PickerOption[], depth = 0) => {
    columns[depth] = options.map((option, index) => {
      const rest = omit<PickerColumnItem>(option, fieldNames.children) as PickerColumnItem;
      const children = option[fieldNames.children] as PickerOption[] | undefined;
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

  traverse(props.dataSource as PickerOption[]);

  return {
    value,
    items,
    columns,
  };
};

export const resolved = (props: PickerViewProps) => {
  return isCascader(props.dataSource) ? resolveCascade(props) : resolveColumn(props);
};
