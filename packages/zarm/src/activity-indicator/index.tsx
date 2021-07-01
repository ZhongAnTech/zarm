import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import type { BaseActivityIndicatorProps } from './interface';

const DIAMETER = 62;

const Circular = React.forwardRef(
  (
    {
      prefixCls,
      className,
      size,
      percent,
      strokeWidth,
      loading,
      ...htmlAttributes
    }: ActivityIndicatorProps,
    ref: any,
  ) => {
    const cls = classnames(className, prefixCls, {
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--circular`]: loading,
    });

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
            className={`${prefixCls}__path`}
            cx={half}
            cy={half}
            r={r}
            fill="none"
            style={{ strokeWidth }}
          />
          <circle
            className={`${prefixCls}__line`}
            cx={half}
            cy={half}
            r={r}
            fill="none"
            style={lineStyle}
          />
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
      prefixCls,
      className,
      size,
      ...htmlAttributes
    }: Pick<
      ActivityIndicatorProps,
      'prefixCls' | 'className' | 'size' | HTMLDivElementAttributeKeys
    >,
    ref: any,
  ) => {
    const cls = classnames(prefixCls, `${prefixCls}--spinner`, className, {
      [`${prefixCls}--${size}`]: !!size,
    });
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

export interface ActivityIndicatorProps
  extends BaseActivityIndicatorProps,
    HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
}

const ActivityIndicator = React.forwardRef<unknown, ActivityIndicatorProps>((props, ref) => {
  if (props.type !== 'spinner') {
    const { type, ...rest } = props;
    return <Circular {...rest} ref={ref} />;
  }
  const { strokeWidth, percent, loading, type, ...rest } = props;
  return <Spinner {...rest} ref={ref} />;
});

ActivityIndicator.defaultProps = {
  prefixCls: 'za-activity-indicator',
  strokeWidth: 5,
  percent: 20,
  type: 'circular',
  loading: true,
};

ActivityIndicator.displayName = 'ActivityIndicator';

export default ActivityIndicator;
