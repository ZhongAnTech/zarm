import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

const DIAMETER = 62;

function Circular({
  prefixCls,
  className,
  size,
  percent,
  strokeWidth,
  loading,
  style,
}: ActivityIndicatorProps) {
  const cls = classnames(className, prefixCls, {
    [`${prefixCls}--${size}`]: !!size,
    [`${prefixCls}--circular`]: loading,
  });

  const half = DIAMETER / 2;
  const r = half - (strokeWidth as number) / 2;

  if (loading) {
    return (
      <span className={cls} style={style}>
        <svg viewBox={`${DIAMETER / 2} ${DIAMETER / 2} ${DIAMETER} ${DIAMETER}`}>
          <circle cx={DIAMETER} cy={DIAMETER} r={r} fill="none" style={{ strokeWidth }} />
        </svg>
      </span>
    );
  }

  const round = 2 * Math.PI * r;
  const lineStyle = {
    strokeDasharray: `${(round * (percent as number)) / 100} ${round}`,
    strokeWidth,
  };

  return (
    <span className={cls} style={style}>
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
    </span>
  );
}

function Spinner({
  prefixCls,
  className,
  size,
  style,
}: Pick<ActivityIndicatorProps, 'prefixCls' | 'className' | 'size' | 'style'>) {
  const cls = classnames(prefixCls, `${prefixCls}--spinner`, className, {
    [`${prefixCls}--${size}`]: !!size,
  });
  const spinner: React.ReactChild[] = [];

  for (let i = 0; i < 12; i++) {
    spinner.push(<div key={i} />);
  }

  return (
    <div className={cls} style={style}>
      {spinner}
    </div>
  );
}

export interface ActivityIndicatorProps extends PropsType {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
}

export default function ActivityIndicator({
  prefixCls = 'za-activity-indicator',
  strokeWidth = 5,
  percent = 20,
  type = 'circular',
  loading = true,
}: ActivityIndicatorProps) {
  const props = { prefixCls, strokeWidth, percent, type, loading };
  return type !== 'spinner' ? <Circular {...props} /> : <Spinner {...props} />;
}
