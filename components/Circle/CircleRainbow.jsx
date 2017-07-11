import React, { Component } from 'react';
import classnames from 'classnames';

class CircleRainbow extends Component {

  render() {
    const { className, ...others } = this.props;

    const cls = classnames({
      'ui-circle-rainbow': true,
      [className]: !!className,
    });

    return (
      <div className={cls} {...others}>
        <div className="ui-circle-rainbow-inner" />
      </div>
    );
  }

}

export default CircleRainbow;
