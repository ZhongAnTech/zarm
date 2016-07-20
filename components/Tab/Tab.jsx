
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Tab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || props.defaultSelected,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('selected' in nextProps) {
      this.setState({
        selected: !!nextProps.selected
      });
    }
  }

  render () {
    const props = this.props;
    const { className, children, ...others } = props;

    const cls = classnames({
      'ui-tab-body-item'       : true,
      'ui-tab-body-item-active': this.state.selected,
      [className]              : !!className,
    })

    return (
      <div {...others} className={cls}>
        {children}
      </div>
    );
  }
}

Tab.propTypes = {
  isDisabled    : PropTypes.bool,
};

Tab.defaultProps = {
  isDisabled    : false,
};

export default Tab;