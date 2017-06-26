import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Cell extends PureComponent {

  render() {
    const { prefixCls, className, theme, hasArrow, icon, title, description, help, onClick, children } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      'is-link': !!onClick,
      'has-arrow': hasArrow,
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
      <div className={cls} onTouchStart={() => {}} onClick={onClick}>
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
  hasArrow: PropTypes.bool,
};

Cell.defaultProps = {
  prefixCls: 'ui-cell',
  className: null,
  hasArrow: false,
};

export default Cell;
