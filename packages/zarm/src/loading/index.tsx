import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseLoadingProps } from './interface';

export interface LoadingCssVars {
  '--size'?: React.CSSProperties['width' | 'height'];
  '--size-large'?: React.CSSProperties['width' | 'height'];
  '--stroke-color'?: React.CSSProperties['stroke'];
  '--stroke-active-color'?: React.CSSProperties['stroke'];
  '--spinner-item-color'?: React.CSSProperties['color'];
  '--spinner-item-width'?: React.CSSProperties['width'];
  '--spinner-item-height'?: React.CSSProperties['height'];
  '--spinner-item-border-radius'?: React.CSSProperties['borderRadius'];
}

export type LoadingProps = BaseLoadingProps &
  HTMLProps<LoadingCssVars> & {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  };

const DIAMETER = 62;

const Circular = React.forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  const { className, size, percent, strokeWidth, loading, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('loading', { prefixCls });

  const cls = bem([
    {
      circular: loading,
      [`${size}`]: !!size,
    },
    className,
  ]);

  const half = DIAMETER / 2;
  const r = half - (strokeWidth as number) / 2;

  if (loading) {
    return (
      <div className={cls} {...restProps} ref={ref}>
        <svg viewBox={`${DIAMETER / 2} ${DIAMETER / 2} ${DIAMETER} ${DIAMETER}`}>
          <circle cx={DIAMETER} cy={DIAMETER} r={r} fill="none" style={{ strokeWidth }} />
        </svg>
      </div>
    );
  }

  const round = 2 * Math.PI * r;
  const lineStyle = {
    strokeDasharray: `${(round * (percent as number)) / 100} ${round}`,
    strokeWidth,
  };

  return (
    <div className={cls} {...restProps} ref={ref}>
      <svg viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}>
        <circle
          className={bem('stroke')}
          cx={half}
          cy={half}
          r={r}
          fill="none"
          style={{ strokeWidth }}
        />
        <circle className={bem('line')} cx={half} cy={half} r={r} fill="none" style={lineStyle} />
      </svg>
    </div>
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
