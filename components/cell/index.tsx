import React, { PureComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

export type HTMLDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
>;

export interface CellProps extends HTMLDivProps, PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Cell extends PureComponent<CellProps, {}> {
  static defaultProps = {
    prefixCls: 'za-cell',
    hasArrow: false,
    disabled: false,
  };

  render() {
    const {
      prefixCls,
      className,
      hasArrow,
      icon,
      title,
      description,
      help,
      disabled,
      onClick,
      children,
      ...others
    } = this.props;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--link`]: !disabled && !!onClick,
      [`${prefixCls}--arrow`]: hasArrow,
    });

    const titleCls = classnames(`${prefixCls}__title`, {
      [`${prefixCls}__title--label`]: !!children,
    });

    const iconRender = icon && <div className={`${prefixCls}__icon`}>{icon}</div>;
    const titleRender = title && <div className={titleCls}>{title}</div>;
    const contentRender = children && <div className={`${prefixCls}__content`}>{children}</div>;
    const arrowRender = hasArrow && <div className={`${prefixCls}__arrow`} />;
    const helpRender = help && (
      <div className={`${prefixCls}__help`}>
        {help}
      </div>
    );

    return (
      <div className={cls} onClick={onClick} onTouchStart={() => {}} {...others}>
        <div className={`${prefixCls}__inner`}>
          <div className={`${prefixCls}__header`}>
            {iconRender}
          </div>
          <div className={`${prefixCls}__body`}>
            {titleRender}
            {contentRender}
          </div>
          <div className={`${prefixCls}__footer`}>
            {description}
          </div>
          {arrowRender}
        </div>
        {helpRender}
      </div>
    );
  }
}
