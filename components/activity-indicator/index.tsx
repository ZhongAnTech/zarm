import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

const DIAMETER = 62;

export interface ActivityIndicatorProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class ActivityIndicator extends PureComponent<ActivityIndicatorProps, any> {
  static defaultProps = {
    prefixCls: 'za-activity-indicator',
    strokeWidth: 5,
    percent: 20,
  };

  render() {
    const { prefixCls, className, size, percent, strokeWidth } = this.props;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${size}`]: !!size,
    });

    const half = DIAMETER / 2;
    const r = half - (strokeWidth as number / 2);
    const round = 2 * Math.PI * r;
    const style = {
      strokeDasharray: `${(round * (percent as number)) / 100} ${round}`,
      strokeWidth,
    };

    return (
      <svg className={cls} viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}>
        <circle className={`${prefixCls}__path`} cx={half} cy={half} r={r} fill="none" style={{ strokeWidth }} />
        <circle className={`${prefixCls}__line`} cx={half} cy={half} r={r} fill="none" style={style} />
      </svg>
    );
  }
}
