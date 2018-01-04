import React, { Component } from 'react';
import classnames from 'classnames';
import { BaseWheelGroupProps } from './PropsType';
import Wheel from './Wheel';
import { isArray } from '../utils/validate';

function getValue(props, defaultValue?: any) {
  if ('value' in props) {
    return [].concat(props.value);
  }

  if ('defaultValue' in props) {
    return [].concat(props.defaultValue);
  }

  return defaultValue;
}

export interface WheelGroupProps extends BaseWheelGroupProps {
  prefixCls?: string;
  className?: string;
}

export default class WheelGroup extends Component<WheelGroupProps, any> {

  static defaultProps = {
    prefixCls: 'za-wheel-group',
    dataSource: [],
    cols: Infinity,
    valueMember: 'value',
    itemRender: item => item.label,
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = this.isCascader(props)
      ? this.cascaderState(props)
      : this.normalState(props);
  }

  isCascader = ({ dataSource }) => {
    return dataSource && dataSource[0] && !isArray(dataSource[0]);
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
    const { value, objValue } = this.state;
    const { dataSource, onChange } = this.props;
    let newObj = { value, objValue };

    value[level] = selected;
    if (this.isCascader({ dataSource })) {
      value.length = level + 1;
      newObj = this.cascaderState({ dataSource, value });
    } else {
      newObj = this.normalState({ dataSource, value });
    }
    this.setState(newObj);

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
      <div className={classnames(prefixCls, className)}>
        {dataSource.map(this.renderWheel)}
      </div>
    );
  }
}
