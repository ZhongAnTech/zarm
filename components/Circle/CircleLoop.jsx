import React, { Component } from 'react';
import classnames from 'classnames';

class CircleLoop extends Component {

  render() {
    const { className, ...others } = this.props;

    const cls = classnames({
      'ui-circle-loop': true,
      [className]: !!className,
    });

    return (
      <div className={cls} {...others} >
        <div className="ui-circle-loop-inner" />
      </div>
    );
  }

}

export default CircleLoop;
