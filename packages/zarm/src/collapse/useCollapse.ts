import { useControllableValue } from 'ahooks';
import includes from 'lodash/includes';

const useCollapse = (options) => {
  const { defaultValue, value, multiple, onChange } = options;

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

export default useCollapse;
