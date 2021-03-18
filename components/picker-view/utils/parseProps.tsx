import { isArray, isCascader } from '../../utils/validate';

export const isValueValid = (value) => {
  const valueArray = [].concat(value);
  return valueArray.some((item) => !!item || item === 0 || item === false);
};

const getValues = (props, defaultValue?: any) => {
  if ('value' in props && isValueValid(props.value)) {
    return [].concat(props.value);
  }

  if ('defaultValue' in props && isValueValid(props.defaultValue)) {
    return [].concat(props.defaultValue);
  }

  if ('wheelDefaultValue' in props && isValueValid(props.wheelDefaultValue)) {
    return [].concat(props.wheelDefaultValue);
  }

  return defaultValue;
};

export const normalState = (props) => {
  const { valueMember, dataSource } = props;
  const value = getValues(
    props,
    dataSource!.map((item) => item[0] && item[0][valueMember!]),
  );
  return {
    value,
    objValue: props.dataSource.map(
      (item, index) => item.filter((d) => d[valueMember!] === value[index])[0],
    ),
    dataSource: props.dataSource,
  };
};

const cascaderState = (props) => {
  const { valueMember, cols } = props;
  let newValues = getValues(props, []);
  const newObjValues: any[] = [];
  const newDateSource: any[] = [];

  const parseLevel = ({ level = 0, dataSource }) => {
    newDateSource[level] = dataSource.map((item, index) => {
      const { children, ...others } = item;
      if (
        // eslint-disable-next-line operator-linebreak
        (isValueValid(newValues[level]) && item[valueMember!] === newValues[level]) ||
        (!isValueValid(newValues[level]) && index === 0)
      ) {
        newValues[level] = item[valueMember!];
        newObjValues[level] = others;

        if (isArray(children) && children.length > 0 && level + 1 < cols!) {
          parseLevel({
            level: level + 1,
            dataSource: children,
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
  };
};

export default {
  getSource(props) {
    return isCascader(props) ? cascaderState(props) : normalState(props);
  },
  isValueValid,
};
