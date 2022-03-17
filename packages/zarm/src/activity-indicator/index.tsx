import React, { HTMLAttributes } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import type { BaseActivityIndicatorProps } from './interface';

export interface ActivityIndicatorCssVars {
  '--size'?: React.CSSProperties['width' | 'height'];
  '--size-large'?: React.CSSProperties['width' | 'height'];
  '--stroke-color'?: React.CSSProperties['stroke'];
  '--stroke-active-color'?: React.CSSProperties['stroke'];
  '--spinner-item-color'?: React.CSSProperties['color'];
  '--spinner-item-width'?: React.CSSProperties['width'];
  '--spinner-item-height'?: React.CSSProperties['height'];
  '--spinner-item-border-radius'?: React.CSSProperties['borderRadius'];
}

const DIAMETER = 62;

const Circular = React.forwardRef(
  (
    { className, size, percent, strokeWidth, loading, ...htmlAttributes }: ActivityIndicatorProps,
    ref: any,
  ) => {
    const { prefixCls } = React.useContext(ConfigContext);
    const bem = createBEM('activity-indicator', { prefixCls });

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
        <div className={cls} {...htmlAttributes} ref={ref}>
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
      <div className={cls} {...htmlAttributes} ref={ref}>
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
  },
);

Circular.displayName = 'Circular';

type HTMLDivElementAttributeKeys = keyof HTMLAttributes<HTMLDivElement>;
const Spinner = React.forwardRef(
  (
    {
      className,
      size,
      ...htmlAttributes
    }: Pick<ActivityIndicatorProps, 'className' | 'size' | HTMLDivElementAttributeKeys>,
    ref: any,
  ) => {
    const { prefixCls } = React.useContext(ConfigContext);
    const bem = createBEM('activity-indicator', { prefixCls });

    const cls = bem([
      {
        spinner: true,
        [`${size}`]: !!size,
      },
      className,
    ]);

    const spinner: React.ReactElement[] = [];

    for (let i = 0; i < 12; i++) {
      spinner.push(<div key={i} />);
    }

    return (
      <div className={cls} {...htmlAttributes} ref={ref}>
        {spinner}
      </div>
    );
  },
);

Spinner.displayName = 'Spinner';

export type ActivityIndicatorProps = BaseActivityIndicatorProps & HTMLAttributes<HTMLDivElement>;

const ActivityIndicator = React.forwardRef<unknown, ActivityIndicatorProps>((props, ref) => {
  if (props.type !== 'spinner') {
    const { type, ...rest } = props;
    return <Circular {...rest} ref={ref} />;
  }
  const { strokeWidth, percent, loading, type, ...rest } = props;
  return <Spinner {...rest} ref={ref} />;
});

ActivityIndicator.defaultProps = {
  type: 'circular',
  loading: true,
  strokeWidth: 5,
  percent: 20,
};

ActivityIndicator.displayName = 'ActivityIndicator';

export default ActivityIndicator;
