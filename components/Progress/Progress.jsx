import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spinner from '../Spinner';

class Progress extends PureComponent {
  render() {
    const { prefixCls, className, theme, strokeWidth, percent, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    return (
      <div className={cls} {...others}>
        <Spinner theme={theme} strokeWidth={strokeWidth} percent={percent} />
        <div className={`${prefixCls}-text`}>{children}</div>
      </div>
    );
  }
}

Progress.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: Spinner.propTypes.theme,
  strokeWidth: Spinner.propTypes.strokeWidth,
  percent: Spinner.propTypes.percent,

};

Progress.defaultProps = {
  prefixCls: 'zax-progress',
  className: null,
  theme: Spinner.defaultProps.theme,
  strokeWidth: Spinner.defaultProps.strokeWidth,
  percent: Spinner.defaultProps.percent,
};

export default Progress;
