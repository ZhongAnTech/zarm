import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const num = 62;

class CircleProcess extends Component {
  render() {
    const { className, percent = 0, strokeWidth = 4, ...others } = this.props;

    const cls = classnames({
      'ui-circle-process': true,
      [className]: !!className,
    });

    const half = num / 2;
    const r = half - strokeWidth;
    const l = half * Math.PI * 2;

    let strokeDashoffset = l * (100 - percent);
    strokeDashoffset /= 100;

    const style = {
      strokeDashoffset,
      strokeWidth,
    };

    return (
      <div className={cls} {...others}>
        <svg className="circle-svg" width={num} height={num} viewBox="0 0 62 62">
          <circle cx={half} cy={half} r={r} fill="none" stroke="#e6e6e6" strokeWidth={strokeWidth} />
          <circle style={style} className="circle-bar" cx={half} cy={half} r={r} fill="none" stroke="#86bcfc" />
        </svg>
      </div>
    );
  }
}

CircleProcess.propTypes = {
  strokeWidth: PropTypes.number,
  percent: PropTypes.number,
};

CircleProcess.defaultProps = {
  strokeWidth: 4,
  percent: 0,
};

export default CircleProcess;
