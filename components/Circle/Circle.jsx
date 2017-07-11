
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import CircleRainbow from './CircleRainbow';
import CircleQuarter from './CircleQuarter';
import CircleLoop from './CircleLoop';
import CircleProcess from './CircleProcess';

const AllComp = {
  rainbow: CircleRainbow,
  quarter: CircleQuarter,
  loop: CircleLoop,
  process: CircleProcess,
};

class Circle extends Component {

  render() {
    const { className, type = 'quarter', ...others } = this.props;

    const cls = classnames({
      'ui-circle': true,
      [className]: !!className,
    });

    const Comp = AllComp[type];

    return (
      <div className={cls}>
        <Comp {...others} />
      </div>
    );
  }

}

Circle.propTypes = {
  type : PropTypes.oneOf(['quarter', 'loop', 'rainbow', 'process']),
};

Circle.defaultProps = {
  type : 'quarter',
};

export default Circle;
