import React, { PureComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

const DIAMETER = 62;

export interface ActivityIndicatorProps extends PropsType {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
}

const Circular = (props: ActivityIndicatorProps) => {
  const { prefixCls, className, size, percent, strokeWidth, loading, style } = props;
  const cls = classnames(className, prefixCls, {
    [`${prefixCls}--${size}`]: !!size,
    [`${prefixCls}--circular`]: loading,
  });

  const half = DIAMETER / 2;
  const r = half - (strokeWidth as number / 2);
  const round = 2 * Math.PI * r;
  const lineStyle = {
    strokeDasharray: `${(round * (percent as number)) / 100} ${round}`,
    strokeWidth,
  };

  if (loading) {
    return (
      <span className={cls} style={style}>
        <svg viewBox={`${DIAMETER / 2} ${DIAMETER / 2} ${DIAMETER} ${DIAMETER}`}>
          <circle cx={DIAMETER} cy={DIAMETER} r={r} fill="none" style={{ strokeWidth }} />
        </svg>
      </span>
    );
  }

  return (
    <span className={cls} style={style}>
      <svg viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}>
        <circle className={`${prefixCls}__path`} cx={half} cy={half} r={r} fill="none" style={{ strokeWidth }} />
        <circle className={`${prefixCls}__line`} cx={half} cy={half} r={r} fill="none" style={lineStyle} />
      </svg>
    </span>
  );
};

const Spinner = (props: ActivityIndicatorProps) => {
  const { prefixCls, className, size, style } = props;
  const cls = classnames(prefixCls, `${prefixCls}--spinner`, className, {
    [`${prefixCls}--${size}`]: !!size,
  });
  const spinner: any[] = [];

  for (let i = 0; i < 12; i++) {
    spinner.push(<div key={i} />);
  }

  return (
    <div className={cls} style={style}>{spinner}</div>
  );
};

export default class ActivityIndicator extends PureComponent<ActivityIndicatorProps, any> {
  static defaultProps = {
    prefixCls: 'za-activity-indicator',
    strokeWidth: 5,
    percent: 20,
    type: 'circular',
    loading: true,
  };

  render() {
    const { type } = this.props;
    return (type !== 'spinner' ? <Circular {...this.props} /> : <Spinner {...this.props} />);
  }
}
