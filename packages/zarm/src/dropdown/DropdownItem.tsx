import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import {ArrowDown} from "@zarm-design/icons";
import classNames from "classnames";
import { ConfigContext } from '../config-provider';
import type { BaseDropdownItemProps } from './interface';

export interface DropdownItemProps extends BaseDropdownItemProps {
  className?: string;
}

const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>((props, ref) => {
  const dropdownItemRef = (ref as any) || React.createRef<HTMLDivElement>();
  const {
    children,
    active,
    onClick,
    ...restProps
  } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('dropdown', { prefixCls });

  const cls = bem('trigger', [
    {
      active,
    },
  ]);

  return (
    <div className={cls} onClick={onClick} ref={dropdownItemRef}>
      <div className={`${cls}-title`}>
        <span className={`${cls}-title-text`}>{props.title}</span>
        <span
          className={classNames(`${cls}-title-arrow`, {
            [`${cls}-title-arrow-active`]: props.active,
          })}
        >
          {props.arrow === undefined ? <ArrowDown /> : props.arrow}
        </span>
      </div>
    </div>
  )
})

type DropdownItemChildrenWrapProps = {
  onClick?: () => void
} & Pick<
  DropdownItemProps,
  'active' | 'children'
>

export const ItemChildrenWrap = React.forwardRef<HTMLLIElement, DropdownItemChildrenWrapProps>((props, ref) => {
  const contentRef = (ref as any) || React.createRef<HTMLDivElement>();
  const {
    children,
    active,
    ...restProps
  } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('dropdown', { prefixCls });

  const cls = bem('content', [
    {
      active,
    },
  ]);

  return (
    <div ref={contentRef} className={cls} {...restProps}>
      {children}
    </div>
  );
});

DropdownItem.displayName = 'DropdownItem';

DropdownItem.defaultProps = {
};

export default DropdownItem;
