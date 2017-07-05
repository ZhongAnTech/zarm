import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class PickerStack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      value: props.value,
      errorMsg: ''
    };
  }

  componentDidMount() {
    this.reposition();
  }

  componentWillReceiveProps({ value, validate }) {
    this.setState({ value, errorMsg: validate(value) });
  }

  componentDidUpdate() {
    this.reposition();
  }

  change(index, cVal) {
    let { cols, validate, onOk } = this.props,
      value = this.state.value.slice(0, index),
      errorMsg;

    cVal && (value[index] = cVal);
    errorMsg = validate(value);

    if (index === cols - 1 && !errorMsg) {
      this.hide();
      onOk(value);
    } else {
      this.setState({ value, errorMsg });
    }
  }

  show() {
    let { value, validate } = this.props;

    this.setState({ visible: true, value, errorMsg: validate(value) });
  }

  hide() {
    this.setState({ visible: false });
  }

  stopPropagation(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  labelCompile(data) {
    let { labelCompile } = this.props;

    if (data && typeof labelCompile === 'function') {
      return labelCompile(data);
    } else {
      return '';
    }
  }

  reposition() {
    let { dataSource, valueMember, disabled, displayItem, itemHeight } = this.props;

    if (disabled) return;

    this.state.value.reduce((data, item, index) => {

      let value = item[valueMember],
        valIndex = data.map(dataItem => dataItem[valueMember]).indexOf(value);

      if (~valIndex) {
        let target = this.refs[`column${ index }`],
          position = target.scrollTop;

        if (position < ((valIndex - displayItem + 1) * itemHeight) || position > (valIndex * itemHeight)) {
          target.scrollTop = valIndex * itemHeight;
        }

        return data[valIndex].children || [];
      }

      return [];

    }, dataSource)
  }

  render() {
    const { className, value: bVal, title, dataSource, placeholder, disabled, crumbAddon } = this.props,
      { visible, errorMsg, value } = this.state,
      labelItem = this.labelCompile(bVal[bVal.length - 1]),
      labelCls = classnames({
        'ui-picker-placeholder': !labelItem,
        'ui-picker-disabled': disabled
      }),
      wrapperCls = classnames({
        'ui-picker-container': true,
        'ui-picker-hidden': !visible,
        [className]: !!className
      });

    return (
      <div className="ui-picker">
        <div className={ labelCls } onClick={ () => !disabled && this.show() }>{ labelItem || placeholder }</div>
        {
          disabled ?
          null :
          <div className={ wrapperCls }>
            <div className="ui-picker-mask" onClick={ () => this.hide() }></div>
            <div className="ui-picker-inner">
              <div className="ui-picker-header">
                <div className="ui-picker-cancel" onClick={ () => this.hide() }>取消</div>
                <div className="ui-picker-title">{ title }</div>
                <div className="ui-picker-submit"></div>
              </div>
              <div className="ui-picker-crumbs">
                <p>选择：{ value.map((item, index) => <span key={ index } className="ui-picker-crumb" data-crumb-addon={ crumbAddon }>{ this.labelCompile(item) }</span>) }</p>
                { errorMsg ? <p className="ui-picker-error">{ errorMsg }</p> : null }
              </div>
              <div className="ui-picker-stack-group">{ this.renderGroup(dataSource, value) }</div>
            </div>
          </div>
        }
      </div>
    )
  }

  renderGroup(dataSource, value) {
    let { valueMember, cols } = this.props,
      group = [],
      i = 0;

    while(dataSource && i < cols) {
      let colVal = value[i];

      group.push(this.renderColumn(dataSource, i, colVal || { [valueMember]: '' }));

      dataSource = ((colVal ? dataSource.filter(item => item[valueMember] === colVal[valueMember])[0] : dataSource[0]) || {}).children;

      i++;
    }

    return group;
  }

  renderColumn(list, colIndex, data) {
    let { valueMember } = this.props,
      sVal = data[valueMember],
      cls = classnames({
        'ui-picker-stack-column': true,
        'lower-hidden': !sVal
      });

    return (
      <div
        key={ colIndex }
        className={ cls }
        onClick={ () => this.change(colIndex - 1) }
      >
        <div
          className="ui-picker-stack-column-wrapper"
          ref={ `column${ colIndex }` }
          onClick={ this.stopPropagation }
        >
          {
            list.map((item, index) => (
              <div
                key={ index }
                className={
                  classnames({
                    'ui-picker-stack-item': true,
                    'active': item[valueMember] === sVal
                  })
                }
                onClick={ () => this.change(colIndex, item) }
              >
                { this.labelCompile(item) }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

PickerStack.propTypes = {
  value: PropTypes.array,
  valueMember: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  dataSource: PropTypes.array,
  cols: PropTypes.number,
  crumbAddon: PropTypes.string,
  displayItem: PropTypes.number,
  itemHeight: PropTypes.number,
  onOk: PropTypes.func,
  labelCompile: PropTypes.func,
  validate: PropTypes.func
}

PickerStack.defaultProps = {
  value: [],
  valueMember: 'value',
  title: '',
  placeholder: '',
  disabled: false,
  dataSource: [],
  cols: 3,
  crumbAddon: ' > ',
  displayItem: 8,
  itemHeight: 30,
  onOk: () => {},
  labelCompile: data => data.label,
  validate: data => ''
}

export default PickerStack
