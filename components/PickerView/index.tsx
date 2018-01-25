import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BasePickerViewProps } from './PropsType';
import Wheel from '../Wheel';
import { isArray } from '../utils/validate';

const getValue = (props, defaultValue?: any) => {
  if ('value' in props && props.value.length > 0) {
    return [].concat(props.value);
  }

  if ('defaultValue' in props && props.defaultValue.length > 0) {
    return [].concat(props.defaultValue);
  }

  return defaultValue;
};

export interface PickerViewProps extends BasePickerViewProps {
  prefixCls?: string;
  className?: string;
}

export default class PickerView extends PureComponent<PickerViewProps, any> {

  static defaultProps = {
    prefixCls: 'za-picker',
    dataSource: [],
    cols: Infinity,
    valueMember: 'value',
    itemRender: item => item.label,
    disabled: false,
  };

  private isManual;

  constructor(props) {
    super(props);
    this.state = this.getState(props);

    if (typeof props.onInit === 'function') {
      props.onInit(this.state.objValue);
    }

    this.isManual = false;
  }

  componentWillReceiveProps(nextProps) {
    const state = this.getState(nextProps);
    this.setState(state);
    // 如果从上层组件传进来的值与当前值一样，或者人工滑动了改变值，则不执行onInit。
    if (JSON.stringify(state.objValue) === JSON.stringify(nextProps.firstObjValue) || this.isManual) {
      return;
    }
    if (typeof nextProps.onInit === 'function') {
      nextProps.onInit(state.objValue);
    }
  }

  isCascader = ({ dataSource }) => {
    return dataSource && dataSource[0] && !isArray(dataSource[0]);
  }

  getState = (prop) => {
    const state = this.isCascader(prop)
      ? this.cascaderState(prop)
      : this.normalState(prop);
    return state;
  }

  normalState = (props) => {
    const { valueMember, dataSource } = this.props;
    const value = getValue(props, dataSource!.map(item => item[0] && item[0][valueMember!]));

    return {
      value,
      objValue: props.dataSource.map((item, index) => item.filter(d => d[valueMember!] === value[index])[0]),
      dataSource: props.dataSource,
    };
  }

  cascaderState = (props) => {
    const { valueMember, cols } = this.props;
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
    };
  }

  onValueChange = (selected, level) => {
    const { value } = this.state;
    const { dataSource, onChange } = this.props;

    value[level] = selected;
    if (this.isCascader({ dataSource })) {
      value.length = level + 1;
    }

    const newObj = this.getState({ dataSource, value });
    this.setState(newObj);
    this.isManual = true;
    if (typeof onChange === 'function') {
      onChange(newObj.objValue, level);
    }
  }

  renderWheel = (item, index) => {
    const { valueMember, itemRender, disabled } = this.props;
    const { value } = this.state;

    return (
      <Wheel
        key={+index}
        dataSource={item}
        value={value[index]}
        valueMember={valueMember}
        itemRender={itemRender}
        disabled={disabled}
        onChange={selected => this.onValueChange(selected, index)}
      />
    );
  }

  render() {
    const { prefixCls, className } = this.props;
    const { dataSource } = this.state;

    return (
      <div className={`${prefixCls}-mask-top`}>
        <div className={`${prefixCls}-mask-bottom`}>
          <div className={classnames(`${prefixCls}-view`, className)}>
            {dataSource.map(this.renderWheel)}
          </div>
        </div>
      </div>
    );
  }
}
