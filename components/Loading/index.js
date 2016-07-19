
import React, { Component, PropTypes } from 'react';
import Toast from '../Toast';

class Loading extends Component {

  render () {
    const { ...others } = this.props;

    return (
      <Toast {...others}>
        <div className="loading-leaf loading-leaf-0"></div>
        <div className="loading-leaf loading-leaf-1"></div>
        <div className="loading-leaf loading-leaf-2"></div>
        <div className="loading-leaf loading-leaf-3"></div>
        <div className="loading-leaf loading-leaf-4"></div>
        <div className="loading-leaf loading-leaf-5"></div>
        <div className="loading-leaf loading-leaf-6"></div>
        <div className="loading-leaf loading-leaf-7"></div>
        <div className="loading-leaf loading-leaf-8"></div>
        <div className="loading-leaf loading-leaf-9"></div>
        <div className="loading-leaf loading-leaf-10"></div>
        <div className="loading-leaf loading-leaf-11"></div>
      </Toast>
    );
  }
}

export default Loading;