import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function getCheckedValue(children) {
  let checkedValue = null;
  React.Children.forEach(children, (radio) => {
    if (radio.props && radio.props.checked) {
      checkedValue = radio.props.value;
    }
  });
  return checkedValue;
}

class RadioGroup extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || getCheckedValue(props.children),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || getCheckedValue(nextProps.children),
      });
    }
  }

  onRadioChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    const { prefixCls, className, theme, shape, type, block, disabled, gather, children } = this.props;

    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element, {
        key: index,
        type,
        theme,
        block: block || element.props.block,
        disabled: disabled || element.props.disabled,
        onChange: () => this.onRadioChange(element.props.value),
        // use '==' because the result will fail when the value's typeof is Number
        checked: (this.state.value == element.props.value), // eslint-disable-line
      });
    });

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`shape-${shape}`]: !!shape,
      'is-gather': gather,
      block,
      disabled,
    });

    return (
      <div className={cls}>
        {items}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  type: PropTypes.oneOf(['button', 'cell']),
  shape: PropTypes.oneOf(['radius', 'round']),
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  gather: PropTypes.bool,
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  prefixCls: 'ui-radio-group',
  className: null,
  theme: 'info',
  type: null,
  shape: null,
  block: false,
  disabled: false,
  gather: false,
  onChange() {},
};

export default RadioGroup;
