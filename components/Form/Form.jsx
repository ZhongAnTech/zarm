
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Form extends Component {

  render () { 
    const { type, className, children, ...others } = this.props;

    const cls = classnames({
      'ui-form'          : true,
      [`ui-form-${type}`]: ('type' in this.props),
      [className]        : !!className,
    });

    return (
      <div className={cls} {...others}>
        {children}
      </div>
    );
  }

}

Form.propTypes = {
  type      : PropTypes.oneOf(['horizontal', 'inline']),
  className : PropTypes.string,
};

Form.defaultProps = {
  className : null,
};

export default Form;