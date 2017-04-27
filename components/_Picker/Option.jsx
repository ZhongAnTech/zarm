
import React, { Component } from 'react';

class Option extends Component {
  render () {
    const { children, ...others } = this.props;
    return <li {...others}>{children}</li>;
  }
}

export default Option;