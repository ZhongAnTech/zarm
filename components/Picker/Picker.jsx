import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { arrayTreeFilter, formatToInit } from './utils';
import ColumnGroup from './ColumnGroup';
import Cascader from './Cascader';

// 阻止选择器区域的默认事件
function onContainerClick(e) {
  e.stopPropagation();
}

class Picker extends Component {
  constructor(props) {
    super(props);

    let _data = null;
    const initValue = props.defaultValue || props.value
    let _value = null;

    if (Object.prototype.toString.call(props.dataSource[0]) !== '[object Array]' && !Object.prototype.hasOwnProperty.call(props.dataSource[0], 'children')) {
      _data = [props.dataSource];
      _value = Object.prototype.toString.call(initValue) === '[object Array]' ? initValue : [initValue];
    } else {
      _data = props.dataSource;
      _value = initValue;
    }

    this.state = {
      visible: props.visible || false,
      value: _value,
      data: _data,
      cascade: Object.prototype.toString.call(props.dataSource[0]) !== '[object Array]' && Object.prototype.hasOwnProperty.call(props.dataSource[0], 'children'),
    };

    this.tempValue = _value;
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if ('value' in nextProps) {
      let _value = null;
      let _data = null;


      if (Object.prototype.toString.call(nextProps.dataSource[0]) !== '[object Array]' && !Object.prototype.hasOwnProperty.call(nextProps.dataSource[0], 'children')) {
        _value = Object.prototype.toString.call(nextProps.value) === '[object Array]' ? nextProps.value : [nextProps.value];
        _data = [nextProps.dataSource];
      } else {
        _value = nextProps.value;
        _data = nextProps.dataSource;
      }

      this.setState({
        value: _value,
        data: _data,
        cascade: Object.prototype.toString.call(nextProps.dataSource[0]) !== '[object Array]' && Object.prototype.hasOwnProperty.call(nextProps.dataSource[0], 'children'),
      });
    }
  }

  onValueChange(value) {
    this.setState({
      value,
    });
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
    let _value = null;

    _value = value.length === 1 ? value[0] : value;

    onOk && onOk(_value);
  }

  onMaskClick() {
    const { onMaskClick } = this.props;
    this.onCancel();
    onMaskClick && onMaskClick();
  }

  getInitValue() {
    const data = this.state.data;
    const { valueMember, displayMember } = this.props;

    const { value } = this.state;

    if (!value || !value.length) {
      if (this.state.cascade) {
        return formatToInit(data[0], valueMember, this.props.cols);
        // const _value = [];
        // for (let i = 0; i < this.props.cols; i += 1) {
        //   if (data && data.length) {
        //     _value[i] = data[0][valueMember];
        //     data = data[0].children;
        //   }
        // }
        // return _value;
      }
      return data.map(d => (d[0][valueMember]));
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

      let treeChildren2 = this.props.dataSource.reduce((a, b) => {
        return a.concat(b);
      }, []);
      treeChildren2 = treeChildren2.filter((item) => { return ~value.indexOf(item[valueMember]); });

      return treeChildren2.map((v) => {
        return v[displayMember];
      }).join(format) || placeholder;

      // return value.join(format) || placeholder;
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
