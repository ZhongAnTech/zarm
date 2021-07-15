import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import type { BaseCellProps } from './interface';

type HTMLDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export type CellProps = HTMLDivProps & BaseCellProps;

const Cell = React.forwardRef<unknown, CellProps>((props, ref) => {
  const {
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

  const cellRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-cell`;

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
    <div ref={cellRef} className={cls} onClick={onClick} onTouchStart={() => {}} {...others}>
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
});

Cell.displayName = 'Cell';

Cell.defaultProps = {
  hasArrow: false,
  disabled: false,
};

export default Cell;
