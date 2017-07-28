import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const diameter = 100;

class Spinner extends PureComponent {
  render() {
    const { prefixCls, className, theme, percent, strokeWidth, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
    });

    const half = diameter / 2;
    const r = half - strokeWidth;
    const round = 2 * Math.PI * r;

    const style = {
      strokeDasharray: `${(round * percent) / 100} ${round}`,
      strokeWidth,
    };

    return (
      <svg className={`${cls}`} viewBox={`0 0 ${diameter} ${diameter}`} {...others}>
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
  strokeWidth: PropTypes.number,
  percent: PropTypes.number,
};

Spinner.defaultProps = {
  prefixCls: 'ui-spinner',
  className: null,
  theme: 'primary',
  strokeWidth: 4,
  percent: 15,
};

export default Spinner;
