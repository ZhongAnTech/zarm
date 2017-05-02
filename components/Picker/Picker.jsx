import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { arrayTreeFilter } from './utils';
import ColumnGroup from './ColumnGroup';
import Cascader from './Cascader';

// 阻止选择器区域的默认事件
function onContainerClick(e) {
  e.stopPropagation();
}

class Picker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || false,
      value: props.value,
      data: props.dataSource,
      cascade: Object.prototype.toString.call(props.dataSource[0]) !== '[object Array]',
    };

    this.tempValue = props.value;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
        data: nextProps.dataSource,
        cascade: Object.prototype.toString.call(nextProps.dataSource[0]) !== '[object Array]',
      });
    }
  }

  onValueChange(value) {
    this.props.onChange(value);
  }

  onCancel() {
    const { onCancel } = this.props;
    this.toggle();
    this.setState({
      value: this.tempValue,
    });
    onCancel && onCancel();
  }

  onOk() {
    const { onOk } = this.props;
    const value = this.getInitValue();
    this.tempValue = value;
    this.toggle();
    onOk && onOk(value);
  }

  onMaskClick() {
    const { onMaskClick } = this.props;
    this.onCancel();
    onMaskClick && onMaskClick();
  }

  getInitValue() {
    let data = this.state.data;

    const value = this.state.value;

    if (!value || !value.length) {
      // 判断数据是否为级联，简单判断数据第一个元素是否为数组
      if (this.state.cascade) {
        for (let i = 0; i < this.props.cols; i += 1) {
          if (data && data.length) {
            value[i] = data[0].value;
            data = data[0].children;
          }
        }
      } else {
        data.forEach((d) => {
          value.push(d[0].value);
        });
      }
    }
    return value;
  }

  // 切换显示状态
  toggle() {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      visible: !this.state.visible,
    });
  }

  handleClick() {
    this.props.onClick();
    !this.props.disabled && this.toggle();
  }

  render() {
    const { prefixCls, format, disabled, pickerPrefixCls, className, cancelText, okText, title, placeholder, displayMember, valueMember } = this.props;
    const { data, value } = this.state;

    let PickerCol = null;

    const classes = classnames({
      'ui-picker-container': true,
      'ui-picker-hidden': !this.state.visible,
      [className]: !!className,
    });

    const inputCls = classnames({
      'ui-picker-placeholder': !value.join(format),
      'ui-picker-disabled': !!disabled,
    });

    const cols = data.map((d) => {
      return { props: { children: d } };
    });

    if (this.state.cascade) {
      PickerCol = (
        <Cascader
          prefixCls={prefixCls}
          pickerPrefixCls={pickerPrefixCls}
          data={data}
          value={this.state.value}
          cols={this.props.cols}
          displayMember={displayMember}
          valueMember={valueMember}
          onChange={v => this.onValueChange(v)}
          />
      );
    } else {
      PickerCol = (
        <ColumnGroup
          className={className}
          prefixCls={prefixCls}
          pickerPrefixCls={pickerPrefixCls}
          displayMember={displayMember}
          valueMember={valueMember}
          selectedValue={value}
          onValueChange={v => this.onValueChange(v)} >
          {cols}
        </ColumnGroup>
      );
    }

    const display = () => {
      if (this.state.cascade) {
        if (value.length) {
          const treeChildren = arrayTreeFilter(this.props.dataSource, (item, level) => {
            return item[valueMember] === value[level];
          });

          return treeChildren.map((v) => {
            return v[displayMember];
          }).join(format);
        }

        return value.join(format) || placeholder;
      }
      return value.join(format) || placeholder;
    };

    return (
      <div className="ui-picker" onClick={() => this.handleClick()}>
        <div className={inputCls}>
          {display()}
        </div>
        <div className={classes} onClick={e => onContainerClick(e)}>
          <div className="ui-picker-mask" onClick={() => this.onMaskClick()} />
          <div className="ui-picker-inner">
            <div className="ui-picker-header">
              <div className="ui-picker-cancel" onClick={() => this.onCancel()}>{cancelText}</div>
              <div className="ui-picker-title">{title}</div>
              <div className="ui-picker-submit" onClick={() => this.onOk()}>{okText}</div>
            </div>
            <div className="ui-picker-mask-top">
              <div className="ui-picker-mask-bottom">
                {PickerCol}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Picker.propTypes = {
  visible: PropTypes.bool,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  dataSource: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])).isRequired,
  cols: PropTypes.number,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onMaskClick: PropTypes.func,
  prefixCls: PropTypes.string,
  pickerPrefixCls: PropTypes.string,
  displayMember: PropTypes.string,
  valueMember: PropTypes.string,
};

Picker.defaultProps = {
  visible: false,
  placeholder: '请选择',
  title: '请选择',
  cancelText: '取消',
  okText: '确定',
  format: '',
  disabled: false,
  dataSource: [],
  cols: 3,
  value: [],
  onClick: () => {},
  onChange: () => {},
  onOk: () => {},
  onCancel: () => {},
  onMaskClick: () => {},
  prefixCls: 'ui-picker-column-group',
  pickerPrefixCls: 'ui-cascaderpicker',
  displayMember: 'label',
  valueMember: 'value',
};

export default Picker;
