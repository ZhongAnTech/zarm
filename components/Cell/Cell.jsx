
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Cell extends Component {

  render () {
    const props = this.props;
    const { type, theme, icon, title, description, help, children, className, ...others } = props;

    const cls = classnames({
      'ui-cell'          : true,
      [`ui-cell-${type}`]: true,
      [`theme-${theme}`] : !!theme,
      [className]        : !!className,
    });

    const iconRender = icon
                     ? <div className="ui-cell-icon">{icon}</div>
                     : null;

    const titleRender = title
                     ? <div className="ui-cell-title">{title}</div>
                     : null;

    const contentRender = children
                        ? <div className="ui-cell-content">{children}</div>
                        : null;

    const helpRender = help
                     ? (
                        <div className="ui-cell-explain">
                          <div className="ui-cell-explain-text">{help}</div>
                        </div>
                      )
                     : null;
    return (
      <div className={cls} {...others}>
        <div className="ui-cell-inner">
          <div className="ui-cell-header">
            {iconRender}
          </div>
          <div className="ui-cell-body">
            {titleRender}
            {contentRender}
          </div>
          <div className="ui-cell-footer">
            {description}
          </div>
        </div>
        {helpRender}
      </div>
    );
  }
}

Cell.propTypes = {
  type      : PropTypes.oneOf(['normal', 'link', 'select']),
  className : PropTypes.string,
};

Cell.defaultProps = {
  type      : 'normal',
  className : null,
};

export default Cell;
