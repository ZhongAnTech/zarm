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
    const { prefixCls, type, isBlock, isRadius, isDisabled, theme, size, className, children } = this.props;

    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element, {
        key: index,
        type,
        onChange: () => this.onRadioChange(element.props.value),
        checked: (this.state.value === element.props.value),
      });
    });

    const cls = classnames({
      [`${prefixCls}`]: true,
      block: ('block' in props || isBlock),
      radius: ('radius' in props || isRadius),
      disabled: ('disabled' in props || isDisabled),
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [className]: !!className,
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
  type: PropTypes.oneOf(['default', 'button']),
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  prefixCls: 'ui-radio-group',
  type: 'default',
  onChange: () => {},
};

export default RadioGroup;
