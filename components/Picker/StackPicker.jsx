import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popup } from '../../components';

const stopEventPropagation = (e) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

class PickerStack extends Component {

  constructor(props) {
    super(props);

    this.columns = {};

    this.state = {
      visible: false,
      value: props.value,
      errorMsg: '',
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

  change(index, cVal, isLast) {
    const { validate, onOk } = this.props;
    const value = this.state.value.slice(0, index);
    let errorMsg = null;

    cVal && (value[index] = cVal);

    errorMsg = validate(value);

    if (isLast && !errorMsg) {
      this.close();
      onOk(value);
    } else {
      this.setState({ value, errorMsg });
    }
  }

  show() {
    const { value, validate } = this.props;

    this.setState({ visible: true, value, errorMsg: validate(value) });
  }

  close(isCancel) {
    const { onCancel } = this.props;

    this.setState({ visible: false });

    isCancel && onCancel();
  }

  reposition() {
    const { dataSource, valueMember, disabled, displayItems, itemHeight, cols } = this.props;

    if (disabled) return;

    this.state.value.reduce((data, item, index) => {
      const value = item[valueMember];
      const valIndex = data.map(dataItem => dataItem[valueMember]).indexOf(value);

      if (index < cols && ~valIndex) {
        const target = this.columns[`column${index}`];
        const position = target.scrollTop;
        const viewTopIndex = valIndex - displayItems;

        if (position < ((viewTopIndex + 1) * itemHeight) || position > (valIndex * itemHeight)) {
          target.scrollTop = valIndex * itemHeight;
        }

        return data[valIndex].children || [];
      }

      return [];
    }, dataSource);
  }

  renderGroup(dataSource, value) {
    const { valueMember, cols } = this.props;
    const group = [];
    let i = 0;

    while (dataSource) {
      const colVal = value[i];
      const childrenData = ((colVal ? dataSource.filter(item => item[valueMember] === colVal[valueMember])[0] : dataSource[0]) || {}).children;

      if (childrenData && childrenData.length && (i < (cols - 1))) {
        group.push(this.renderColumn(dataSource, i, colVal || { [valueMember]: '' }));
        dataSource = childrenData;
      } else {
        group.push(this.renderColumn(dataSource, i, colVal || { [valueMember]: '' }, true));
        dataSource = null;
      }

      i += 1;
    }

    return group;
  }

  renderColumn(list, colIndex, data, isLast) {
    const { valueMember, itemCompile } = this.props;
    const pickVal = data[valueMember];
    const cls = classnames({
      'ui-picker-stack-column': true,
      'lower-hidden': !pickVal,
    });

    return (
      <div
        key={colIndex}
        className={cls}
        onClick={() => this.change(colIndex - 1)}>
        <div
          className="ui-picker-stack-column-wrapper"
          ref={(ref) => { this.columns[`column${colIndex}`] = ref; }}
          onClick={stopEventPropagation}>
          {
            list.map((item, index) => (
              <div
                key={index}
                className={
                  classnames({
                    'ui-picker-stack-item': true,
                    active: item[valueMember] === pickVal,
                  })
                }
                onClick={() => this.change(colIndex, item, isLast)}>
                { itemCompile(item) }
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  render() {
    const { className, value: baseVal, title, dataSource, placeholder, disabled, labelAddon, displayCompile, itemCompile } = this.props;
    const { visible, errorMsg, value } = this.state;
    const displayLabel = displayCompile(baseVal);
    const labelCls = classnames({
      'ui-picker-placeholder': !displayLabel,
      'ui-picker-disabled': disabled,
    });
    const wrapperCls = classnames({
      'ui-picker-container': true,
      'ui-picker-hidden': !visible,
      [className]: !!className,
    });

    return (
      <div className="ui-picker">
        <div className={labelCls} onClick={() => !disabled && this.show()}>{ displayLabel || placeholder }</div>
        {
          disabled ?
          null :
          <div className={wrapperCls} onClick={stopEventPropagation}>
            <Popup
              className="ui-popup-inner"
              visible={visible}
              onMaskClick={() => this.close(true)}>
              <div className="ui-picker-header">
                <div className="ui-picker-cancel" onClick={() => this.close(true)}>取消</div>
                <div className="ui-picker-title">{ title }</div>
                <div className="ui-picker-submit" />
              </div>
              <div className="ui-picker-crumbs">
                <p>选择：{ value.map(item => itemCompile(item)).join(labelAddon) }</p>
                { errorMsg ? <p className="ui-picker-crumbs-error">{ errorMsg }</p> : null }
              </div>
              <div className="ui-picker-stack-group">{ this.renderGroup(dataSource, value) }</div>
            </Popup>
          </div>
        }
      </div>
    );
  }
}

PickerStack.propTypes = {
  valueMember: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  cols: PropTypes.number,
  labelAddon: PropTypes.string,
  displayItems: PropTypes.number,
  itemHeight: PropTypes.number,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  displayCompile: PropTypes.func,
  itemCompile: PropTypes.func,
  validate: PropTypes.func,
};

PickerStack.defaultProps = {
  value: [],
  valueMember: 'value',
  title: '',
  placeholder: '',
  disabled: false,
  dataSource: [],
  cols: 3,
  labelAddon: ' > ',
  displayItems: 8,
  itemHeight: 30,
  onOk: () => {},
  onCancel: () => {},
  displayCompile: data => data.map(({ label }) => label).join(''),
  itemCompile: data => data.label,
  validate: () => '',
};

export default PickerStack;
