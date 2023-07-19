import { useControllableValue } from 'ahooks';
import includes from 'lodash/includes';

const useCollpse = (options) => {
  const { defaultValue, value, multiple, onChange } = options;

  const newDefaultValue = multiple ? defaultValue ?? [] : defaultValue ?? '';
  const initState =
    value !== undefined
      ? { value, defaultValue: newDefaultValue, onChange }
      : { defaultValue: newDefaultValue, onChange };
  const [state, setValue] = useControllableValue(initState);

  const newSetValue = (v) => {
    const actived = Array.isArray(state) ? includes(state, v) : Number(state) === Number(v);
    if (!actived) {
      setValue((preValue) => (multiple ? [...preValue, v] : v));
    } else {
      setValue((preValue) => (multiple ? preValue.filter((i) => i !== v) : ''));
    }
  };

  return [state, newSetValue];
};

export default useCollpse;
