import React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import Popper from '../popper';
import type { BaseTooltipProps } from './interface';
import type { PopperPlacement, PopperTrigger } from '../popper/PropsType';

export type TooltipProps = BaseTooltipProps & React.InputHTMLAttributes<HTMLInputElement>;

export type TooltipPlacement = PopperPlacement;

export type TooltipTrigger = PopperTrigger;

const Tooltip = (props: TooltipProps) => {
  const { children, content, className, ...others } = props;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-tooltip`;
  const cls = classnames(prefixCls, className);

  return !(content === '' || content === null || content === undefined) ? (
    <Popper content={content} prefixCls={prefixCls} className={cls} {...others}>
      {children}
    </Popper>
  ) : (
    <>{children}</>
  );
};

Tooltip.defaultProps = {
  direction: 'top' as TooltipPlacement,
  hasArrow: true,
  onVisibleChange: () => {},
};

Tooltip.updateAll = () => Popper.update();

export default Tooltip;
