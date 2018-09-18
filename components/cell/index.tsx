import React, { PureComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import { Omit } from '../utils/types';

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
      disabled,
      'is-link': !disabled && !!onClick,
      'has-arrow': hasArrow,
    });

    const iconRender = icon && <div className={`${prefixCls}-icon`}>{icon}</div>;
    const titleRender = title && <div className={`${prefixCls}-title`}>{title}</div>;
    const contentRender = children && <div className={`${prefixCls}-content`}>{children}</div>;
    const arrowRender = hasArrow && <div className={`${prefixCls}-arrow`} />;
    const helpRender = help && (
      <div className={`${prefixCls}-help`}>
        {help}
      </div>
    );

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
