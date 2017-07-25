import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const diameter = 100;

class Progress extends PureComponent {
  render() {
    const { prefixCls, className, theme, percent, strokeWidth, children } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
    });

    const half = diameter / 2;
    const r = half - (strokeWidth / 2);
    const round = 2 * Math.PI * r;

    const style = {
      strokeDasharray: `${(round * percent) / 100} ${round}`,
      strokeWidth,
    };

    return (
      <div className={cls}>
        <svg className={`${prefixCls}-svg`} viewBox={`0 0 ${diameter} ${diameter}`}>
          <circle className={`${prefixCls}-path`} cx={half} cy={half} r={r} fill="none" style={{ strokeWidth }} />
          <circle className={`${prefixCls}-line`} cx={half} cy={half} r={r} fill="none" style={style} />
        </svg>
        <div className={`${prefixCls}-text`}>{children}</div>
      </div>
    );
  }
}

Progress.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  strokeWidth: PropTypes.number,
  percent: PropTypes.number,

};

Progress.defaultProps = {
  prefixCls: 'ui-progress',
  className: null,
  theme: 'info',
  strokeWidth: 4,
  percent: 0,
};

export default Progress;
