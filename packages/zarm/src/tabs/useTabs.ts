import { useControllableValue } from 'ahooks';

const getDefaultValue = (children) => {
  return children[0]?.props?.value ?? 0;
};

const useTabs = (props) => {
  const [currentValue, setCurrentValue] = useControllableValue(props);

  const value = currentValue || getDefaultValue(props.children);
  // value = Math.min(Children.count(props.children) - 1, Math.max(0, value));
  return [value, setCurrentValue];
};

export default useTabs;
