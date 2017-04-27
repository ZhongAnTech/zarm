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

  onValueChange(v, i) {
    const value = this.getValue().concat();

    value[i] = v;
    this.props.onValueChange(value, i);
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
      prefixCls, pickerPrefixCls,
      className, indicatorStyle,
      pure, children,
    } = props;

    const selectedValue = this.getValue();
    const colElements = children.map((col, i) => {
      return (
        <div key={col.key || i} className={`${prefixCls}-item`}>
          <Picker
            pure={pure}
            indicatorStyle={indicatorStyle}
            prefixCls={pickerPrefixCls}
            selectedValue={selectedValue[i]}
            onValueChange={value => this.onValueChange(value, i)}
            {...col.props}
            />
        </div>
      );
    });

    return (
      <div className={classnames(className, prefixCls)}>
        {colElements}
      </div>
    );
  }

}

MultiPicker.defaultProps = {
  prefixCls: 'ui-multi-picker',
  pickerPrefixCls: 'ui-cascaderpicker',
  onValueChange() {
  },
  disabled: false,
};

export default MultiPicker;
