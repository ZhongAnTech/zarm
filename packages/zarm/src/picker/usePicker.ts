import { useEffect, useState } from 'react';
import parseProps from '../picker-view/utils/parseProps';
import type { WheelValue, WheelItem } from '../wheel/interface';
import type { PickerDataSource } from '../picker-view/interface';
import type { BasePickerProps } from './interface';

export type UsePickerValue = [
  { dataSource: PickerDataSource; value: WheelValue | Array<WheelValue> },
  {
    onPickerCancel: () => void;
    onPickerOk: () => void;
    onPickViewChange: (value?: Array<WheelItem>, i?: number) => void;
  },
];

const usePicker = (props: BasePickerProps): UsePickerValue => {
  const { onOk, onCancel, valueMember, onChange, dataSource, value } = props;
  const [state, setState] = useState(() => {
    const source = parseProps.getSource(props);
    return {
      ...source,
      tempValue: source.value,
      tempObjValue: source.objValue,
    };
  });

  const onPickerCancel = () => {
    const { tempValue = [], tempObjValue = [] } = state;
    setState((preState) => ({
      ...preState,
      value: tempValue,
      objValue: tempObjValue,
    }));

    onCancel && onCancel();
  };

  const onPickerOk = () => {
    if (typeof onOk === 'function') {
      onOk(state.objValue);
    }
  };

  const onPickViewChange = (selected) => {
    const _value = selected.map((item) => item[valueMember!]);
    setState((prevState) => ({
      ...prevState,
      value: _value,
      objValue: selected,
    }));

    if (typeof onChange === 'function') {
      onChange(selected);
    }
  };

  useEffect(() => {
    const source = parseProps.getSource(props);

    setState({
      ...source,
      tempValue: source.value,
      tempObjValue: source.objValue,
    });
  }, [dataSource, value, valueMember]);

  return [state, { onPickerCancel, onPickerOk, onPickViewChange }];
};

export default usePicker;
