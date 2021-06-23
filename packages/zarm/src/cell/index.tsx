import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import BaseCellProps from './interface';

export type HTMLDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export interface CellProps extends HTMLDivProps, BaseCellProps {
  prefixCls?: string;
  className?: string;
}

const Cell = React.forwardRef<unknown, CellProps>((props, ref)=>{
  
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
} = props;


const wrapperRef = (ref as any) || React.createRef<HTMLElement>();

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
const helpRender = help && <div className={`${prefixCls}__help`}>{help}</div>;

return (
  <div ref={wrapperRef} className={cls} onClick={onClick} onTouchStart={() => {}} {...others}>
    <div className={`${prefixCls}__inner`}>
      <div className={`${prefixCls}__header`}>{iconRender}</div>
      <div className={`${prefixCls}__body`}>
        {titleRender}
        {contentRender}
      </div>
      <div className={`${prefixCls}__footer`}>{description}</div>
      {arrowRender}
    </div>
    {helpRender}
  </div>
);
})

Cell.displayName = 'Cell';

Cell.defaultProps = {
  prefixCls: 'za-cell',
  hasArrow: false,
  disabled: false,
}


export default Cell