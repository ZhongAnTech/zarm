import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from '../Cell';

class CellForm extends PureComponent {
  render() {
    const { prefixCls, className, help, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}-form`]: true,
      [className]: !!className,
    });

    return (
      <div className={cls} {...others}>
        <Cell {...others} />
        <div className={`${prefixCls}-explain`}>
          <div className={`${prefixCls}-text`}>{help}</div>
        </div>
      </div>
    );
  }
}

CellForm.propTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.oneOf(['normal', 'link', 'select']),
  className: PropTypes.string,
};

CellForm.defaultProps = {
  prefixCls: 'za-cell',
  type: 'normal',
  className: null,
};

export default CellForm;
