import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const diameter = 62;

class Spinner extends PureComponent {

  render() {
    const { prefixCls, className, theme, percent, strokeWidth} = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
    });

    const radius = diameter / 2;
    const r = radius - strokeWidth / 2;
    const round = (radius + strokeWidth / 2) * Math.PI * 2;

    let strokeDashoffset = round * (100 - percent);
    strokeDashoffset /= 100;

    const style = {
      strokeDashoffset,
      strokeWidth,
    };

    return (
      <div className={cls}>
        <svg className={`${prefixCls}-svg`} width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
          <circle cx={radius} cy={radius} r={r} fill="none" stroke="#e6e6e6" strokeWidth={strokeWidth} />
          <circle style={style} className={`${prefixCls}-bar`} cx={radius} cy={radius} r={r} fill="none" stroke="#86bcfc" />
        </svg>
      </div>
    );
  }
}

Spinner.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  strokeWidth: PropTypes.number,
  percent: PropTypes.number,

};

Spinner.defaultProps = {
  prefixCls: 'ui-spinner',
  className: null,
  theme: 'info',
  strokeWidth: 4,
  percent: 0,
};

export default Spinner;
