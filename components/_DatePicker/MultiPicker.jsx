import React, { Component } from 'react';
import classnames from 'classnames';
import Picker from './Picker';

class MultiPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      date: props.date || props.defaultDate || [],
    };
  }

  onValueChange(index, value) {
    const values = this.getValue().concat();
    values[index] = value;
    this.props.onValueChange(values, index);
  }

  getValue() {
    const { children, selectedValue } = this.props;
    if (selectedValue && selectedValue.length) {
      return selectedValue;
    }

    if (!children) {
      return [];
    }

    return children.map((c) => {
      const cc = c.props.children;
      return cc && cc[0] && cc[0].value;
    });
  }

  render() {
    const props = this.props;
    const {
      prefixCls,
      pickerPrefixCls,
      className,
      rootNativeProps,
      disabled,
      pickerItemStyle,
      indicatorStyle,
      pure,
      children,
    } = props;
    const selectedValue = this.getValue();
    const colElements = children.map((col, i) => {
      return (
        <div key={col.key || i} className={`${prefixCls}-item`}>
          <Picker
            itemStyle={pickerItemStyle}
            disabled={disabled}
            pure={pure}
            indicatorStyle={indicatorStyle}
            prefixCls={pickerPrefixCls}
            selectedValue={selectedValue[i]}
            onValueChange={value => this.onValueChange(i, value)}
            {...col.props}
            />
        </div>
      );
    });

    return (
      <div {...rootNativeProps} className={classnames(className, prefixCls)}>
        {colElements}
      </div>
    );
  }
}

MultiPicker.defaultProps = {
  prefixCls: 'ui-multi-picker',
  pickerPrefixCls: 'ui-datepicker',
  onValueChange: () => {},
  disabled: false,
};

export default MultiPicker;
