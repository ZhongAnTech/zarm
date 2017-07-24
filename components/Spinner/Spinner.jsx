import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const num = 62;

class Spinner extends PureComponent {

  render() {
    const { prefixCls, className, theme, percent, strokeWidth} = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
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
      <div className={cls}>
        <svg className={`${prefixCls}-svg`} width={num} height={num}>
          <circle cx={half} cy={half} r={r} fill="none" stroke="#e6e6e6" strokeWidth={strokeWidth} />
          <circle style={style} className={`${prefixCls}-bar`} cx={half} cy={half} r={r} fill="none" stroke="#86bcfc" />
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
