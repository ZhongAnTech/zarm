
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

class Cell extends Component {

  render () {
    const props = this.props;
    const { type, icon, title, description, children, className, ...others } = props;

    const cls = classnames({
      'ui-cell'          : true,
      [`ui-cell-${type}`]: true,
      [className]        : !!className,
    });
 
    const iconRender = icon
                     ? <div className="ui-cell-icon">{icon}</div>
                     : null;

    const contentRender = children
                        ? <div className="ui-cell-content">{children}</div>
                        : null;

    return (
      <div className={cls} {...others}>
        <div className="ui-cell-header">
          {iconRender}
        </div>
        <div className="ui-cell-body">
          <div className="ui-cell-title">{title}</div>
          <div className="ui-cell-content">{children}</div>
        </div>
        <div className="ui-cell-footer">
          {description}
        </div>
      </div>
    );
  }
}

Cell.propTypes = {
  type      : PropTypes.oneOf(['form', 'link']),
  className : PropTypes.string,
};

Cell.defaultProps = {
  type      : 'form',
  className : null,
};

export default Cell;