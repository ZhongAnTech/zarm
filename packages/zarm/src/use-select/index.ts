import { useControllableValue } from 'ahooks';
import includes from 'lodash/includes';

interface SelectOptions {
  defaultValue?: number | string | Array<string | number>;
  value?: number | string | Array<string | number>;
  multiple?: boolean;
  onChange?: (value: number | string | Array<string | number>) => void;
}

const useSelect = (options: SelectOptions) => {
  const { defaultValue, value, multiple = false, onChange } = options;

  const newDefaultValue = multiple ? defaultValue ?? [] : defaultValue ?? '';
  const initState =
    value !== undefined
      ? { value, defaultValue: newDefaultValue, onChange }
      : { defaultValue: newDefaultValue, onChange };
  const [state, setValue] = useControllableValue(initState);

  const newSetValue = (newValue) => {
    setValue((preValue) => {
      const actived = Array.isArray(preValue)
        ? includes(preValue, newValue)
        : preValue === newValue;
      if (!actived) {
        return multiple ? [...preValue, newValue] : newValue;
      }
      return multiple ? preValue.filter((v) => v !== newValue) : '';
    });
  };

  return [state, newSetValue];
};

export default useSelect;
