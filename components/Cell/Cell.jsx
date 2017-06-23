import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Cell extends PureComponent {

  render() {
    const { prefixCls, type, theme, icon, title, description, help, children, className, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-${type}`]: true,
      [`theme-${theme}`]: !!theme,
      [className]: !!className,
    });

    const iconRender = icon
      ? <div className={`${prefixCls}-icon`}>{icon}</div>
      : null;

    const titleRender = title
      ? <div className={`${prefixCls}-title`}>{title}</div>
      : null;

    const contentRender = children
      ? <div className={`${prefixCls}-content`}>{children}</div>
      : null;

    const helpRender = help
      ? (
        <div className={`${prefixCls}-explain`}>
          <div className={`${prefixCls}-explain-text`}>{help}</div>
        </div>
      )
      : null;

    return (
      <div onTouchStart={() => {}} className={cls} {...others}>
        <div className={`${prefixCls}-inner`}>
          <div className={`${prefixCls}-header`}>
            {iconRender}
          </div>
          <div className={`${prefixCls}-body`}>
            {titleRender}
            {contentRender}
          </div>
          <div className={`${prefixCls}-footer`}>
            {description}
          </div>
        </div>
        {helpRender}
      </div>
    );
  }
}

Cell.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['normal', 'link', 'select']),
};

Cell.defaultProps = {
  prefixCls: 'ui-cell',
  className: null,
  type: 'normal',
};

export default Cell;
