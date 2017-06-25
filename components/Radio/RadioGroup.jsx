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
    const props = this.props;
    const { prefixCls, className, theme, size, shape, type, isBlock, isDisabled, children } = this.props;

    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element, {
        key: index,
        type,
        theme,
        onChange: () => this.onRadioChange(element.props.value),
        checked: (this.state.value == element.props.value),
      });
    });

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [`shape-${shape}`]: !!shape,
      block: ('block' in props || isBlock),
      disabled: ('disabled' in props || isDisabled),
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
  type: PropTypes.oneOf(['cell']),
  shape: PropTypes.oneOf(['radius', 'round']),
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  prefixCls: 'ui-radio-group',
  className: null,
  theme: 'info',
  type: null,
  shape: null,
  onChange: () => {},
};

export default RadioGroup;
