import React, { Component, PropTypes, cloneElement } from 'react';
import MultiPicker from './MultiPicker';
import classnames from 'classnames';

class CascaderPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || false,
    };
  }

  render() {
    const { value, prefixCls, format, pickerPrefixCls, rootNativeProps, className, cancelText, okText, title, data, placeholder } = this.props;

    const classes = classnames({
      'ui-picker-container' : true,
      'ui-picker-hidden'    : !this.state.visible,
      [className]           : !!className,
    });

    const inputCls = classnames({
      'ui-picker-placeholder': !value.join(format)
    });

    const cols = data.map(d => {
      return { props: { children: d } };
    });

    return (
      <div className="ui-picker-group" onClick={() => this.toggle()}>
        <div className={inputCls}>
          {value.join(format) || placeholder}
        </div>
        <div className={classes} onClick={(e) => this.onContainerClick(e)}>
          <div className="ui-picker-mask" onClick={this.onMaskClick.bind(this)}></div>
          <div className="ui-picker-inner">
            <div className="ui-picker-header">
              <div className="ui-picker-cancel" onClick={() => this.onCancel()}>{cancelText}</div>
              <div className="ui-picker-title">{title}</div>
              <div className="ui-picker-submit" onClick={() => this.onOk()}>{okText}</div>
            </div>
            <div className="ui-picker-mask-top">
              <div className="ui-picker-mask-bottom">
                <div className="ui-picker-body">
                  <MultiPicker
                    rootNativeProps={rootNativeProps}
                    className={className}
                    prefixCls={prefixCls}
                    pickerPrefixCls={pickerPrefixCls}
                    selectedValue={value}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    {cols}
                  </MultiPicker>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  onValueChange(value, index) {

    console.log(value);
    this.props.onChange(value);

  }

  // 阻止选择器区域的默认事件
  onContainerClick(e) {
    e.stopPropagation();
  }

  // 切换显示状态
  toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }

  onCancel() {
    const { onCancel } = this.props;
    this.toggle();
    onCancel && onCancel();
  }

  onOk() {
    const { onOk } = this.props;
    this.toggle();
    onOk && onOk(value);
  }


  onMaskClick() {
    this.setState({ visible: false })
  }
}

CascaderPicker.propTypes = {
  visible       : PropTypes.bool,
  title         : PropTypes.string,
  cancelText    : PropTypes.string,
  okText        : PropTypes.string,
  mode          : PropTypes.string,
  onMaskClick   : PropTypes.func,
};

CascaderPicker.defaultProps = {
  visible       : false,
  cancelText    : '取消',
  okText        : '确定',
  onMaskClick   : () => {},
  cols          : 3,
  cascade       : true,
  value         : []
};

export default CascaderPicker;