
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import Selector from './Selector';
import Option from './Option';

class SelectorGroup extends Component {

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
    const { visible, dataSource, value, format, valueMember, placeholder, className, title, cancelText, okText, onMaskClick, onCancel, onOk, onClick, children, ...others } = this.props;
    const selectors = this.getOptions(dataSource, 0);

    const classes = classnames({
      'ui-selector-container' : true,
      'ui-selector-hidden'    : !this.state.visible,
      [className]             : !!className,
    });

    const inputCls = classnames({
      'ui-selector-placeholder': !value.join(format)
    });

    return (
      <div className="ui-selector-group" onClick={() => this.toggle()}>
        <div className={inputCls}>{value.join(format) || placeholder}</div>
        <div {...others} className={classes} onClick={(e) => this.onContainerClick(e)}>
          <div className="ui-selector-mask" onClick={onMaskClick}></div>
          <div className="ui-selector-inner">
            <div className="ui-selector-header">
              <div className="ui-selector-cancel" onClick={() => this.onCancel()}>{cancelText}</div>
              <div className="ui-selector-title">{title}</div>
              <div className="ui-selector-submit" onClick={() => this.onOk()}>{okText}</div>
            </div>
            <div className="ui-selector-mask-top">
              <div className="ui-selector-mask-bottom">
                <div className="ui-selector-body">
                  <div className="ui-selector-selected"></div>
                  {selectors}
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

    let selectors = this.selectors || [],
        selected = dataSource.filter(item => item[valueMember] == this.state.value[level])[0] || dataSource[0] || {};

    if (selected.children && selected.children.length > 0) {
      selectors = this.getOptions(selected.children, level + 1);
    }

    selectors.unshift(<Selector key={level} valueMember={valueMember} displayMember={displayMember} dataSource={dataSource} value={selected[valueMember]} onChange={(value) => {
      this.onSelectorChange(dataSource, level, value);
    }} />);

    return selectors;
  }

  // 选择器选值
  onSelectorChange(dataSource, level, value) {
    const { valueMember } = this.props;

    let values = this.state.value.concat(),
        item

    for (var i = level; i < values.length; i++) {
      item = dataSource.filter(item => item[valueMember] == value)[0]
      values[i] = item && item[valueMember]
      dataSource = item
                 ? item.children
                 : []
      value = dataSource[0]
            ? dataSource[0][valueMember]
            : undefined
    }

    this.setState({
      value: values
    });
  }

  getSelected(d, val) {
    let children = d.filter(item => item[this.props.valueMember] == val)[0].children;
    return children && children[0]
  }

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

SelectorGroup.propTypes = { 
  visible       : PropTypes.bool,
  title         : PropTypes.string,
  cancelText    : PropTypes.string,
  okText        : PropTypes.string,
  onMaskClick   : PropTypes.func,
  valueMember   : PropTypes.string,
  displayMember : PropTypes.string,
};

SelectorGroup.defaultProps = {
  visible       : false,
  cancelText    : '取消',
  okText        : '确定',
  onMaskClick   : () => {},
  valueMember   : 'value',
  displayMember : 'label',
};

export default SelectorGroup;

