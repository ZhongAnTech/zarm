
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import Picker from './Picker';

class PickerGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      value: props.value || props.defaultValue || [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      value: nextProps.value.concat()
    });
  }

  render () {
    const { dataSource, value, format, valueMember, placeholder, className, title, cancelText, okText, onMaskClick, onCancel, onOk, onClick, children, ...others } = this.props;
    const pickers = this.getOptions(dataSource, 0);

    const classes = classnames({
      'ui-picker-container' : true,
      'ui-picker-hidden'    : !this.state.visible,
      [className]           : !!className,
    });

    const inputCls = classnames({
      'ui-picker-placeholder': !value.join(format)
    });

    return (
      <div className="ui-picker-group" onClick={() => this.toggle()}>
        <div className={inputCls}>{value.join(format) || placeholder}</div>
        <div {...others} className={classes} onClick={(e) => this.onContainerClick(e)}>
          <div className="ui-picker-mask" onClick={onMaskClick}></div>
          <div className="ui-picker-inner">
            <div className="ui-picker-header">
              <div className="ui-picker-cancel" onClick={() => this.onCancel()}>{cancelText}</div>
              <div className="ui-picker-title">{title}</div>
              <div className="ui-picker-submit" onClick={() => this.onOk()}>{okText}</div>
            </div>
            <div className="ui-picker-mask-top">
              <div className="ui-picker-mask-bottom">
                <div className="ui-picker-body">
                  <div className="ui-picker-selected"></div>
                  {pickers}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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

  // 获取选择器组
  getOptions(dataSource, level) {
    const { valueMember, displayMember } = this.props;

    let pickers = this.pickers || [];
    let selected = dataSource.filter(item => item[valueMember] === this.state.value[level])[0] || dataSource[0] || {};

    if (selected.children && selected.children.length > 0) {
      pickers = this.getOptions(selected.children, level + 1);
    }

    pickers.unshift(<Picker key={level} valueMember={valueMember} displayMember={displayMember} dataSource={dataSource} value={selected[valueMember]} onChange={(value) => {
      this.onpickerChange(dataSource, level, value);
    }} />);

    // console.log('pickers', pickers, ' pickers.length', pickers.length);
    return pickers;
  }

  // 选择器选值
  onpickerChange(dataSource, level, value) {
    const { valueMember } = this.props;

    let values = this.state.value.concat();
    let item = null;

    console.log('dataSource: ', dataSource, ' level: ', level, ' value: ', value);

    for (let i = level; i < values.length; i++) {
      item = dataSource.filter(item => item[valueMember] === value)[0]

      console.log('item: ', item);
      values[i] = item && item[valueMember];

      dataSource = item
                 ? item.children
                 : [];
      value = dataSource[0]
            ? dataSource[0][valueMember]
            : undefined;
    }

    this.setState({
      value: values
    });
  }

  // getSelected(d, val) {
  //   let children = d.filter(item => item[this.props.valueMember] == val)[0].children;
  //   return children && children[0]
  // }

  // 取消
  onCancel() {
    const { onCancel } = this.props;
    onCancel && onCancel();
  }

  // 确定
  onOk() {
    const { onOk } = this.props;
    const value = this.state.value.concat();

    this.setState({
      value
    });
    onOk && onOk(value);
  }
}

PickerGroup.propTypes = {
  visible       : PropTypes.bool,
  title         : PropTypes.string,
  cancelText    : PropTypes.string,
  okText        : PropTypes.string,
  onMaskClick   : PropTypes.func,
  valueMember   : PropTypes.string,
  displayMember : PropTypes.string,
};

PickerGroup.defaultProps = {
  visible       : false,
  cancelText    : '取消',
  okText        : '确定',
  onMaskClick   : () => {},
  valueMember   : 'value',
  displayMember : 'label',
  cascade       : true
};

export default PickerGroup;

