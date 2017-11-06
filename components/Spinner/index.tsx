import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

const DIAMETER = 62;

export interface SpinnerProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Spinner extends PureComponent<SpinnerProps, any> {
  static defaultProps = {
    prefixCls: 'za-spinner',
    theme: 'primary',
    strokeWidth: 5,
    percent: 15,
  };

  render() {
    const { prefixCls, className, theme, size, percent, strokeWidth } = this.props;

    const cls = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
    });

    const half = DIAMETER / 2;
    const r = half - (strokeWidth as number / 2);
    const round = 2 * Math.PI * r;
    const style = {
      strokeDasharray: `${(round * (percent as number)) / 100} ${round}`,
      strokeWidth,
    };

    return (
      <svg className={`${cls}`} viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}>
        <circle className={`${prefixCls}-path`} cx={half} cy={half} r={r} fill="none" style={{ strokeWidth }} />
        <circle className={`${prefixCls}-line`} cx={half} cy={half} r={r} fill="none" style={style} />
      </svg>
    );
  }
}
