import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Swipeout from './Swipeout';

class SwipeAction extends Component {

  render() {
    const { className, prefixCls, right, children } = this.props;

    return (right) ? (
      <div>
        <Swipeout
          prefixCls={prefixCls}
          right={right}>
          {children}
        </Swipeout>
      </div>
    ) : (
      <div>{children}</div>
    );
  }
}

export default SwipeAction;
