import React, { Component } from 'react';
import classnames from 'classnames';
import Roller from './Roller';
import { BaseRollerGroupProps } from './PropsType';

export interface RollerGroupProps extends BaseRollerGroupProps {
  prefixCls?: string;
  className?: any;
}

export default class RollerGroup extends Component<RollerGroupProps, any> {

  static defaultProps = {
    prefixCls: 'za-picker',
    onValueChange: () => {},
    itemRender: data => data.label,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };
  }

  onValueChange = (v, i) => {
    const value = this.getValue().concat();
    const { onValueChange } = this.props;

    value[i] = v;
    if (typeof onValueChange === 'function') {
      onValueChange(value, i);
    }
  }

  getValue = (): string[] => {
    const { children, selectedValue } = this.props;

    if (selectedValue && selectedValue.length) {
      return selectedValue;
    }
    if (!children) {
      return [];
    }
    return children.map((c) => {
      const cc = c.props.children;
      return cc && cc[0] && cc[0][this.props.valueMember];
    });
  }

  render() {
    const {
      prefixCls, className,
      children, itemRender, valueMember,
    } = this.props;

    const selectedValue = this.getValue();
    const colElements = children.map((col, i) => {
      return (
        <div key={col.key || i} className={`${prefixCls}-roller-group-item`}>
          <Roller
            prefixCls={prefixCls}
            selectedValue={selectedValue[i]}
            itemRender={itemRender}
            valueMember={valueMember}
            onValueChange={value => this.onValueChange(value, i)}
            {...col.props}
          />
        </div>
      );
    });

    return (
      <div className={classnames(className, `${prefixCls}-roller-group`)}>
        {colElements}
      </div>
    );
  }
}
