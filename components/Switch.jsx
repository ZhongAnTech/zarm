
import React, { Component, PropTypes, Children } from 'react';
import classnames from 'classnames';

class Switch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  _onClick() {
    this.setState({
      active: !this.state.active,
    });
    this.props.onChange(!this.state.active);
  }

  render() {
    const { name, ...others } = this.props;
    const cls = classnames({
      'ui-switch': true,
      'active'   : this.state.active,
    });

    return (
      <div className={cls} onClick={() => this._onClick()} {...others}></div>
    );
  }
}

Switch.propTypes = {
  defaultValue : PropTypes.bool,
  onChange     : PropTypes.func,
};

Switch.defaultProps = {
  defaultValue : false,
  onChange     : function () {},
};

export default Switch;