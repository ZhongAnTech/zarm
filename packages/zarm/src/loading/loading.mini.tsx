import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseLoadingProps, LoadingCssVars } from './interface';



export type LoadingProps = BaseLoadingProps &
  HTMLProps<LoadingCssVars> & {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  };

const Circular = React.forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  const { className, size, percent, strokeWidth, loading, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('loading', { prefixCls });

  const strokeWidthSty = strokeWidth ? { '--strokeWidth': `${ strokeWidth / 2}px` } : props.style;

  const cls = bem([
    {
      circular: loading,
      [`${size}`]: !!size,
    },
    className,
  ]);

  return (
    <div className={cls} {...restProps} ref={ref} style={strokeWidthSty as React.CSSProperties} />
  );
});

Circular.displayName = 'Circular';

const Spinner = React.forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  const { className, size, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('loading', { prefixCls });

  const cls = bem([
    {
      spinner: true,
      [`${size}`]: !!size,
    },
    className,
  ]);

  const spinner: React.ReactElement[] = [];

  for (let i = 0; i < 9; i++) {
    spinner.push(<div key={i} />);
  }

  return (
    <div ref={ref} className={cls} {...restProps}>
      {spinner}
    </div>
  );
});

Spinner.displayName = 'Spinner';

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  if (props.type !== 'spinner') {
    const { type, ...restProps } = props;
    return <Circular ref={ref} {...restProps} />;
  }
  const { strokeWidth, percent, loading, type, ...restProps } = props;
  return <Spinner ref={ref} {...restProps} />;
});

Loading.defaultProps = {
  type: 'circular',
  loading: true,
  strokeWidth: 5,
  percent: 20,
};

Loading.displayName = 'Loading';

export default Loading;
