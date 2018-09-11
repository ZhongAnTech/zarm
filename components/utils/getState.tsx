import { isArray } from '../utils/validate';

const getValue = (props, defaultValue?: any) => {
  if ('value' in props && props.value && props.value.length > 0) {
    return [].concat(props.value);
  }

  if ('defaultValue' in props && props.defaultValue && props.defaultValue.length > 0) {
    return [].concat(props.defaultValue);
  }

  return defaultValue;
};

const isCascader = ({ dataSource }) => {
  return dataSource && dataSource[0] && !isArray(dataSource[0]);
};

const normalState = (props) => {
  const { valueMember, dataSource } = props;
  const value = getValue(props, dataSource!.map(item => item[0] && item[0][valueMember!]));
  return {
    value,
    objValue: props.dataSource.map((item, index) => item.filter(d => d[valueMember!] === value[index])[0]),
    dataSource: props.dataSource,
    visible: props.visible || false,
  };
};

const cascaderState = (props) => {
  const { valueMember, cols } = props;
  let newValues = getValue(props, []);
  let newObjValues: any[] = [];
  let newDateSource: any[] = [];

  let parseLevel = ({ level = 0, dataSource }) => {
    newDateSource[level] = dataSource.map((item, index) => {
      const { children, ...others } = item;

      if (
        newValues[level] && item[valueMember!] === newValues[level] ||
        !newValues[level] && index === 0
      ) {
        newValues[level] = item[valueMember!];
        newObjValues[level] = others;

        if (isArray(children) && children.length > 0 && level + 1 < cols!) {
          parseLevel({
            dataSource: children,
            level: level + 1,
          });
        }
      }

      return others;
    });

    return newValues;
  };

  newValues = parseLevel({ dataSource: props.dataSource });

  return {
    value: newValues,
    objValue: newObjValues,
    dataSource: newDateSource,
    visible: props.visible || false,
  };
};

export {
  isCascader,
};

export default (props) => {
  const state = isCascader(props)
  ? cascaderState(props)
  : normalState(props);
  return state;
};
