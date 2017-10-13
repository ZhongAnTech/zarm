import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { arrayTreeFilter, formatToInit, formatBackToObject, isArray, hasChildrenObject } from './utils';
import ColumnGroup from './ColumnGroup';
import Cascader from './Cascader';
import Popup from '../Popup';


// 阻止选择器区域的默认事件
function onContainerClick(e) {
  e.stopPropagation();
}

class Picker extends Component {
  constructor(props) {
    super(props);

    const initValue = props.value || props.defaultValue || [];
    const { dataSource } = props;
    let _data = null;
    let _value = null;

    // 针对单列数据源，转换为[[{}]]
    if (dataSource.length && !isArray(dataSource[0]) && !hasChildrenObject(dataSource[0])) {
      _data = [props.dataSource];
      _value = isArray(initValue) ? initValue : [initValue];
    } else {
      _data = dataSource;
      _value = initValue;
    }

    this.state = {
      visible: props.visible || false,
      value: _value,
      data: _data,
      cascade: dataSource.length && !isArray(dataSource[0]) && hasChildrenObject(dataSource[0]),
    };

    this.tempValue = _value;
  }

  componentWillReceiveProps(nextProps) {
    if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
      const { dataSource } = nextProps;
      let _data = null;

      if (dataSource.length && !isArray(dataSource[0]) && !hasChildrenObject(dataSource[0])) {
        _data = [nextProps.dataSource];
      } else {
        _data = nextProps.dataSource;
      }

      this.setState({
        data: _data,
        cascade: dataSource.length && !isArray(dataSource[0]) && hasChildrenObject(dataSource[0]),
      });
    }

    if ('value' in nextProps && nextProps.value !== this.props.value) {
      let _value = null;
      const { dataSource } = nextProps;

      if (dataSource.length && !isArray(dataSource[0]) && !hasChildrenObject(dataSource[0])) {
        _value = isArray(nextProps.value) ? nextProps.value : [nextProps.value];
      } else {
        _value = nextProps.value;
      }

      this.setState({
        value: _value,
        cascade: dataSource.length && !isArray(dataSource[0]) && hasChildrenObject(dataSource[0]),
      });
      this.tempValue = _value;
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
    const { onOk, valueMember, cols } = this.props;
    const { data, cascade } = this.state;
    const value = this.getInitValue();
    this.setState({
      value,
    });
    this.tempValue = value;
    this.toggle();
    let _value = null;
    _value = formatBackToObject(data, value, cascade, valueMember, cols);
    onOk && onOk(_value);
  }

  onMaskClick() {
    const { onMaskClick } = this.props;
    this.onCancel();
    onMaskClick && onMaskClick();
  }

  getInitValue() {
    const data = this.state.data;
    const { valueMember } = this.props;

    const { value } = this.state;

    if (!value || !value.length) {
      if (this.state.cascade) {
        return formatToInit(data[0], valueMember, this.props.cols);
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

  close(key) {
    this.setState({
      [`${key}`]: false,
    });
  }

  _displayRender(data) {
    const { displayRender, displayMember, displayAddon } = this.props;

    if (typeof displayRender === 'function') {
      return displayRender(data);
    }
    return data.map((v) => {
      return v[displayMember];
    }).join(displayAddon);
  }

  render() {
    const { prefixCls, disabled, className, cancelText, okText, title, placeholder, valueMember, displayMember, displayAddon } = this.props;
    const { data, value } = this.state;

    let PickerCol = null;

    const classes = classnames({
      [`${prefixCls}-container`]: true,
      [className]: !!className,
    });

    const inputCls = classnames({
      [`${prefixCls}-input`]: true,
      [`${prefixCls}-placeholder`]: !value.join(displayAddon),
      [`${prefixCls}-disabled`]: !!disabled,
    });

    const cols = data.map((d) => {
      return { props: { children: d } };
    });

    if (this.state.cascade) {
      PickerCol = (
        <Cascader
          prefixCls={prefixCls}
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

          return this._displayRender(treeChildren);
        }
      }

      const treeChildren2 = data.map((d, index) => {
        if (value[index]) {
          return d.filter(obj => value[index] === obj[valueMember])[0];
        }
        return undefined;
      }).filter(t => !!t);
      return this._displayRender(treeChildren2);
    };

    return (
      <div className={`${prefixCls}`} onClick={() => this.handleClick()}>
        <div className={inputCls}>
          <input type="hidden" value={this.state.value} />
          {display() || placeholder}
        </div>
        <div className={classes} onClick={e => onContainerClick(e)}>
          <Popup
            className="za-popup-inner"
            visible={this.state.visible}
            onMaskClick={() => this.onMaskClick()}>
            <div className={`${prefixCls}-wrapper`}>
              <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-cancel`} onClick={() => this.onCancel()}>{cancelText}</div>
                <div className={`${prefixCls}-title`}>{title}</div>
                <div className={`${prefixCls}-submit`} onClick={() => this.onOk()}>{okText}</div>
              </div>
              <div className={`${prefixCls}-mask-top`}>
                <div className={`${prefixCls}-mask-bottom`}>
                  {PickerCol}
                </div>
              </div>
            </div>
          </Popup>
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
  displayAddon: PropTypes.string,
  disabled: PropTypes.bool,
  dataSource: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])).isRequired,
  cols: PropTypes.number,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onMaskClick: PropTypes.func,
  displayRender: PropTypes.func,
  prefixCls: PropTypes.string,
  displayMember: PropTypes.string,
  valueMember: PropTypes.string,
};

Picker.defaultProps = {
  visible: false,
  placeholder: '请选择',
  title: '请选择',
  cancelText: '取消',
  okText: '确定',
  displayAddon: '',
  disabled: false,
  dataSource: [],
  onClick: () => {},
  onChange: () => {},
  onOk: () => {},
  onCancel: () => {},
  onMaskClick: () => {},
  prefixCls: 'za-picker',
  displayMember: 'label',
  valueMember: 'value',
};

export default Picker;
