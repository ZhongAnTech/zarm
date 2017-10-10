import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const diameter = 62;

class Spinner extends PureComponent {

  render() {
    const { prefixCls, className, theme, size, percent, strokeWidth } = this.props;

    const cls = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
    });

    const half = diameter / 2;
    const r = half - (strokeWidth / 2);
    const round = 2 * Math.PI * r;
    const style = {
      strokeDasharray: `${(round * percent) / 100} ${round}`,
      strokeWidth,
    };

    return (
      <svg className={`${cls}`} viewBox={`0 0 ${diameter} ${diameter}`}>
        <circle className={`${prefixCls}-path`} cx={half} cy={half} r={r} fill="none" style={{ strokeWidth }} />
        <circle className={`${prefixCls}-line`} cx={half} cy={half} r={r} fill="none" style={style} />
      </svg>
    );
  }
}

Spinner.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['lg']),
  strokeWidth: PropTypes.number,
  percent: PropTypes.number,
};

Spinner.defaultProps = {
  prefixCls: 'za-spinner',
  theme: 'primary',
  strokeWidth: 5,
  percent: 15,
};

export default Spinner;
