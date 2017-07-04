import React, { Component } from 'react';
import classnames from 'classnames';

class CircleQuarter extends Component {

  render() {
    const { className, ...others } = this.props;

    const cls = classnames({
      'ui-circle-quarter': true,
      [className]: !!className,
    });

    return (
      <div className={cls} {...others} />
    );
  }

}

export default CircleQuarter;
