import { createBEM } from '@zarm-design/bem';
import React, { useImperativeHandle, useRef } from 'react';
import { ConfigContext } from '../config-provider';
import { HTMLProps } from '../utils/utilityTypes';
import { BasePanelProps } from './interface';

export interface PanelCssVars {
  '--header-padding'?: React.CSSProperties['padding'];
  '--header-font-size'?: React.CSSProperties['fontSize'];
  '--header-color'?: React.CSSProperties['color'];
  '--body-background'?: React.CSSProperties['color'];
  '--body-font-size'?: React.CSSProperties['fontSize'];
  '--body-color'?: React.CSSProperties['color'];
  '--body-border-radius'?: React.CSSProperties['borderRadius'];
  '--spacing-padding-horizontal'?: React.CSSProperties['padding'];
}

export type PanelProps = Omit<React.ComponentPropsWithRef<'div'>, keyof BasePanelProps> &
  Partial<BasePanelProps> &
  HTMLProps<PanelCssVars>;

const Panel = React.forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { className, title, more, spacing, bordered, children, ...restProps } = props;

  const panelRef = useRef<HTMLDivElement>();
  useImperativeHandle(ref, () => panelRef.current);

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('panel', { prefixCls });

  const cls = bem([{ spacing, bordered }, className]);

  return (
    <div className={cls} ref={panelRef} {...restProps}>
      {(title || more) && (
        <div className={bem('header')}>
          {title && <div className={bem('header__title')}>{title}</div>}
          {more && <div className={bem('header__more')}>{more}</div>}
        </div>
      )}
      <div className={bem('body')}>{children}</div>
    </div>
  );
});

Panel.displayName = 'Panel';
Panel.defaultProps = {
  bordered: true,
  spacing: false,
};

export default Panel;
