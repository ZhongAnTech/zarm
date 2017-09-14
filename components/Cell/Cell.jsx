import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Cell extends PureComponent {

  render() {
    const { prefixCls, className, theme, hasArrow, icon, title, description, help, disabled, onClick, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      disabled,
      'is-link': !disabled && !!onClick,
      'has-icon': !!icon,
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

    const arrowRender = hasArrow
      ? <div className={`${prefixCls}-arrow`} />
      : null;

    const helpRender = help
      ? (
        <div className={`${prefixCls}-help`}>
          {help}
        </div>
      )
      : null;

    return (
      <div className={cls} onClick={onClick} onTouchStart={() => {}} {...others}>
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
          {arrowRender}
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
  disabled: PropTypes.bool,
};

Cell.defaultProps = {
  prefixCls: 'za-cell',
  hasArrow: false,
  disabled: false,
};

export default Cell;
