import React, { Component, PropTypes, cloneElement } from 'react';
import arrayTreeFilter from './array-tree-filter';
import MultiPicker from './MultiPicker';
import Cascader from './Cascader';
import classnames from 'classnames';

class CascaderPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || false,
    };
  }

  getValue() {
    const value = this.props.value || [];
    let treeChildren;

    if(this.props.cascade) {
      if(this.props.value){
        treeChildren = arrayTreeFilter(this.props.data, (c, level) => {
          return c.value === value[level];
        });
      } else {
        treeChildren = this.props.data;
      }

      console.log("treeChildren =>", treeChildren);
    }else{
      return value.join(format) || placeholder
    }

    return treeChildren.map((v) => {
      console.log(v);
        return v.label;
    });

  }

  render() {
    const { value, prefixCls, format, pickerPrefixCls, cascade, className, cancelText, okText, title, data, placeholder } = this.props;
    let Picker = null;

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

    if(cascade) {
      Picker = (
        <Cascader
          prefixCls={prefixCls}
          pickerPrefixCls={pickerPrefixCls}
          data={data}
          cols={this.props.cols}
          onChange={this.onValueChange.bind(this)}
          displayMember="label"
        />
      );
    } else{
      Picker = (
        <MultiPicker
          className={className}
          prefixCls={prefixCls}
          pickerPrefixCls={pickerPrefixCls}
          selectedValue={value}
          onValueChange={this.onValueChange.bind(this)}
        >
          {cols}
        </MultiPicker>
      )
    }

    let display = () => {

      if(cascade) {
        let treeChildren;

        treeChildren = arrayTreeFilter(this.props.data, (c, level) => {
          return c.value === value[level];
        });

        return treeChildren.map((v) => {
            return v.label;
        }).join(format);

      }else{
        return value.join(format) || placeholder
      }
    }


    return (
      <div className="ui-picker-group" onClick={() => this.toggle()}>
        <div className={inputCls}>
          {display()}
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
                {Picker}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  onValueChange(value, index) {

    this.props.onChange(value);

  };

  // 阻止选择器区域的默认事件
  onContainerClick(e) {
    e.stopPropagation();
  }

  // 切换显示状态
  toggle() {
    if(this.props.disabled) {
      return;
    }
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
    this.setState({ visible: false });
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