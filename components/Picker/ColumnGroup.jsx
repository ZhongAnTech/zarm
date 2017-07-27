import React, { Component } from 'react';
import classnames from 'classnames';
import Column from './Column';

class ColumnGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
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
      return cc && cc[0] && cc[0][this.props.valueMember];
    });
  }

  render() {
    const props = this.props;
    const {
      columnPrefixCls, pickerPrefixCls,
      className, indicatorStyle,
      pure, children, displayMember, valueMember,
    } = props;

    const selectedValue = this.getValue();
    const colElements = children.map((col, i) => {
      return (
        <div key={col.key || i} className={`${columnPrefixCls}-item`}>
          <Column
            pure={pure}
            indicatorStyle={indicatorStyle}
            prefixCls={pickerPrefixCls}
            selectedValue={selectedValue[i]}
            displayMember={displayMember}
            valueMember={valueMember}
            onValueChange={value => this.onValueChange(value, i)}
            {...col.props}
            />
        </div>
      );
    });

    return (
      <div className={classnames(className, columnPrefixCls)}>
        {colElements}
      </div>
    );
  }
}

ColumnGroup.defaultProps = {
  columnPrefixCls: '',
  pickerPrefixCls: '',
  onValueChange: () => {},
  disabled: false,
};

export default ColumnGroup;
