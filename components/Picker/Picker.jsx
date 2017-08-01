import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { arrayTreeFilter, formatToInit, formatBackToObject } from './utils';
import ColumnGroup from './ColumnGroup';
import Cascader from './Cascader';
import { Popup } from '../../components';


// 阻止选择器区域的默认事件
function onContainerClick(e) {
  e.stopPropagation();
}

class Picker extends Component {
  constructor(props) {
    super(props);

    let _data = null;
    let _value = null;

    if (Object.prototype.toString.call(props.dataSource[0]) !== '[object Array]' && !Object.prototype.hasOwnProperty.call(props.dataSource[0], 'children')) {
      _data = [props.dataSource];
      _value = props.value.length ? [props.value] : props.value;
    } else {
      _data = props.dataSource;
      _value = props.value;
    }

    this.state = {
      visible: props.visible || false,
      value: _value,
      data: _data,
      cascade: Object.prototype.toString.call(props.dataSource[0]) !== '[object Array]' && Object.prototype.hasOwnProperty.call(props.dataSource[0], 'children'),
    };

    this.tempValue = props.value;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      let _value = null;
      let _data = null;


      if (Object.prototype.toString.call(nextProps.dataSource[0]) !== '[object Array]' && !Object.prototype.hasOwnProperty.call(nextProps.dataSource[0], 'children')) {
        _value = nextProps.value ? [nextProps.value] : [];
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
    const { onOk, valueMember, cols } = this.props;
    const { data, cascade } = this.state;
    const value = this.getInitValue();

    this.tempValue = value;
    this.toggle();
    let _value = null;
    // _value = value.length === 1 ? value.toString() : value;
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

  render() {
    const { prefixCls, format, disabled, className, cancelText, okText, title, placeholder, displayMember, valueMember } = this.props;
    const { data, value } = this.state;

    let PickerCol = null;

    const classes = classnames({
      [`${prefixCls}-container`]: true,
      [className]: !!className,
    });

    const inputCls = classnames({
      [`${prefixCls}-input`]: true,
      [`${prefixCls}-placeholder`]: !value.join(format),
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
      <div className={`${prefixCls}`} onClick={() => this.handleClick()}>
        <div className={inputCls}>
          <input type="hidden" value={this.state.value} />
          {display()}
        </div>
        <div className={classes} onClick={e => onContainerClick(e)}>
          <Popup
            className="ui-popup-inner"
            visible={this.state.visible}
            onMaskClick={() => this.close('visible')}>
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
  format: PropTypes.string,
  disabled: PropTypes.bool,
  dataSource: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])).isRequired,
  cols: PropTypes.number,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onMaskClick: PropTypes.func,
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
  format: '',
  disabled: false,
  dataSource: [],
  value: [],
  onClick: () => {},
  onChange: () => {},
  onOk: () => {},
  onCancel: () => {},
  onMaskClick: () => {},
  prefixCls: 'ui-picker',
  displayMember: 'label',
  valueMember: 'value',
};

export default Picker;
