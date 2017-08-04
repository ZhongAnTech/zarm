import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Popup from '../Popup';

const stopEventPropagation = (e) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

class PickerStack extends Component {

  constructor(props) {
    super(props);

    const resolvedProps = this.resolveProps(props, props.value); // 解决 value PropType定义的eslint报错

    this.columns = {};

    this.state = {
      visible: false,
      ...resolvedProps,
    };
  }

  componentDidMount() {
    this.reposition();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.resolveProps(nextProps));
  }

  componentDidUpdate() {
    this.reposition();
  }

  resolveProps({ value, dataSource, validate }) {
    const resolveValue = [];

    value.reduce((list, item) => {
      const valueItem = this.obtainItem(list, item);

      if (valueItem) {
        resolveValue.push(valueItem);

        return valueItem.children || [];
      }

      return [];
    }, dataSource);

    return {
      value: resolveValue,
      valueBackups: [...resolveValue],
      errorMsg: validate(value),
    };
  }

  obtainItem(list, value) {
    const { valueMember } = this.props;

    return list.filter(item => item[valueMember] === value)[0];
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
    this.setState({ visible: true });
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
      const childrenData = ((colVal ? this.obtainItem(dataSource, colVal[valueMember]) : dataSource[0]) || {}).children;

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
    const { valueMember, prefixCls, itemCompile } = this.props;
    const pickVal = data[valueMember];
    const cls = classnames({
      [`${prefixCls}-stack-column`]: true,
      'lower-hidden': !pickVal,
    });

    return (
      <div
        key={colIndex}
        className={cls}
        onClick={() => this.change(colIndex - 1)}>
        <div
          className={`${prefixCls}-stack-column-wrapper`}
          ref={(ref) => { this.columns[`column${colIndex}`] = ref; }}
          onClick={stopEventPropagation}>
          {
            list.map((item, index) => (
              <div
                key={+index}
                className={
                  classnames({
                    [`${prefixCls}-stack-item`]: true,
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
    const { className, value: curVal, title, dataSource, placeholder, disabled, labelAddon, prefixCls, displayCompile, itemCompile } = this.props;
    const { visible, errorMsg, value, valueBackups } = this.state;
    const displayLabel = displayCompile(valueBackups);
    const labelCls = classnames({
      [`${prefixCls}-placeholder`]: !displayLabel,
      [`${prefixCls}-disabled`]: disabled,
    });
    const wrapperCls = classnames({
      [`${prefixCls}-container`]: true,
      [`${prefixCls}-hidden`]: !visible,
      [className]: !!className,
    });

    return (
      <div className={prefixCls}>
        <div className={labelCls} onClick={() => !disabled && this.show()}>{ displayLabel || placeholder }</div>
        <input type="hidden" value={curVal} />
        {
          disabled ?
          null :
          <div className={wrapperCls} onClick={stopEventPropagation}>
            <Popup
              visible={visible}
              onMaskClick={() => this.close(true)}>
              <div className={`${prefixCls}-wrapper`}>
                <div className={`${prefixCls}-header`}>
                  <div className={`${prefixCls}-cancel`} onClick={() => this.close(true)}>取消</div>
                  <div className={`${prefixCls}-title`}>{ title }</div>
                  <div className={`${prefixCls}-submit`} />
                </div>
                <div className={`${prefixCls}-crumbs`}>
                  <p>选择：{ value.map(item => itemCompile(item)).join(labelAddon) }</p>
                  { errorMsg ? <p className={`${prefixCls}-crumbs-error`}>{ errorMsg }</p> : null }
                </div>
                <div className={`${prefixCls}-stack-group`}>{ this.renderGroup(dataSource, value) }</div>
              </div>
            </Popup>
          </div>
        }
      </div>
    );
  }
}

PickerStack.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number)]),
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
  prefixCls: 'za-picker',
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
  onOk() {},
  onCancel() {},
  displayCompile: data => data.map(({ label }) => label).join(''),
  itemCompile: data => data.label,
  validate() {},
};

export default PickerStack;
