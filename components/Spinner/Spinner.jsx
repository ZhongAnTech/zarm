import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Progress from '../Progress';

class Spinner extends PureComponent {

  render() {
    const { prefixCls, className, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      rotate360: true,
    });

    return (
      <Progress className={cls} {...others} />
    );
  }
}

Spinner.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  percent: PropTypes.number,

};

Spinner.defaultProps = {
  prefixCls: 'ui-spinner',
  className: null,
  percent: 15,
};

export default Spinner;
