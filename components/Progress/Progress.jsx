import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spinner from '../Spinner';

class Progress extends PureComponent {

  render() {
    const { prefixCls, className, theme, type, strokeWidth, percent, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [`theme-${theme}`]: !!theme,
      [`${prefixCls}-${type}`]: !!type,
      [className]: !!className,
    });

    const innerRender = type === 'circle'
      ? <div className={`${prefixCls}-inner`}><Spinner theme={theme} strokeWidth={strokeWidth} percent={percent} /></div>
      : <div className={`${prefixCls}-inner`} style={{ height: strokeWidth }}><div className={`${prefixCls}-bg`} style={{ width: `${percent}%` }} /></div>
      ;

    return (
      <div className={cls} {...others}>
        {innerRender}
        {children ? <div className={`${prefixCls}-text`}>{children}</div> : null}
      </div>
    );
  }
}

Progress.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: Spinner.propTypes.theme,
  type: PropTypes.oneOf(['line', 'circle']),
  strokeWidth: Spinner.propTypes.strokeWidth,
  percent: Spinner.propTypes.percent,

};

Progress.defaultProps = {
  prefixCls: 'za-progress',
  className: null,
  theme: Spinner.defaultProps.theme,
  type: 'line',
  strokeWidth: Spinner.defaultProps.strokeWidth,
  percent: Spinner.defaultProps.percent,
};

export default Progress;
