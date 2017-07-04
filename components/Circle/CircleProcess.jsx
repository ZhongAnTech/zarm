import React, { Component } from 'react';
import classnames from 'classnames';

const num = 62;
const width = 4;
const half = num / 2;
const r = half - width;
const l = half * Math.PI * 2;

class CircleProcess extends Component {

  render() {
    const { className, percent = 0, ...others } = this.props;

    const cls = classnames({
      'ui-circle-process': true,
      [className]: !!className,
    });

    const style = {
      strokeDashoffset: l * (100 - percent) / 100,
    };

    return (
      <div className={cls} {...others}>
        <svg className="circle-svg" width={num} height={num} viewBox="0 0 62 62">
          <circle cx={half} cy={half} r={r} fill="none" stroke="#e6e6e6" strokeWidth="4" />
          <circle style={style} className="circle-bar" cx={half} cy={half} r={r} fill="none" stroke="#86bcfc" strokeWidth="4" />
        </svg>
      </div>
    );
  }

}

export default CircleProcess;
