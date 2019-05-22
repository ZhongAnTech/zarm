import React, { PureComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

export interface ProgressProps extends PropsType {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
}

export default class Progress extends PureComponent<ProgressProps, any> {
  static defaultProps = {
    theme: 'default',
    percent: 0,
    type: 'line',
    shape: 'round',
    weight: 'normal',
    prefixCls: 'za-progress',
  };

  private progressElement;

  constructor(props) {
    super(props);
    const { weight } = this.props;
    this.state = {
      strokeWidth: this.getBaseStrokeWidth(weight),
    };
  }

  componentDidMount() {
    const { type, weight } = this.props;
    if (type === 'circle' || type === 'semi-circle') {
      this.resetStrokeWidth(weight);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { weight } = nextProps;
    this.resetStrokeWidth(weight);
  }

  getBaseStrokeWidth = (weight) => {
    return weight === 'normal' ? 8 : 4;
  };

  resetStrokeWidth(weight) {
    const baseWidth = 32;
    const { clientWidth } = this.progressElement;
    const baseStrokeWidth = this.getBaseStrokeWidth(weight);
    this.setState({
      strokeWidth: baseWidth / clientWidth * baseStrokeWidth,
    });
  }

  render() {
    const { theme, percent, shape, type, weight, style, prefixCls, className, children } = this.props;
    const { strokeWidth } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${type}`]: !!type,
      [`${prefixCls}--${theme}`]: !!theme,
    });

    const diameter = 32;
    const radius = diameter / 2;
    const extendRadius = radius + strokeWidth / 2;
    const strokeLinecap = shape === 'round' ? 'round' : 'butt';

    const viewBox = type === 'circle'
      ? `0 0 ${diameter + strokeWidth} ${diameter + strokeWidth}`
      : `0 0 ${diameter + strokeWidth} ${(diameter + strokeWidth) / 2}`;

    const path = type === 'circle'
      ? `
        M${extendRadius}, ${extendRadius}
        m0 ${-radius}
        a${radius} ${radius} 0 1 1 0 ${diameter}
        a${radius} ${radius} 0 1 1 0 ${-diameter}`
      : `
        M${extendRadius}, ${extendRadius}
        m${-radius} 0
        a${radius} ${radius} 0 0 1 ${diameter} 0`;

    const dasharray = type === 'circle'
      ? Math.PI * diameter
      : Math.PI * diameter / 2;

    const roundInner = (type === 'circle' || type === 'semi-circle')
      && (
        <svg viewBox={viewBox}>
          <path
            className={`${prefixCls}__track`}
            d={path}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
          />
          <path
            className={`${prefixCls}__thumb`}
            d={path}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeDasharray={dasharray}
            strokeDashoffset={dasharray * (100 - percent!) / 100}
          />
        </svg>
      );

    const lineStrokeWidth = this.getBaseStrokeWidth(weight);
    const borderRadius = shape === 'round' ? `${lineStrokeWidth}px` : '0';
    const lineTrackStyle = { height: `${lineStrokeWidth}px`, borderRadius };
    const lineThumbStyle = { width: `${percent}%`, borderRadius };

    const rectInner = (
      type === 'line'
      && (
        <div className={`${prefixCls}__track`} style={lineTrackStyle}>
          <div className={`${prefixCls}__thumb`} style={lineThumbStyle} />
        </div>
      )
    );

    return (
      <div
        className={cls}
        style={style}
        ref={(ele) => { this.progressElement = ele; }}
      >
        {type === 'line' ? rectInner : roundInner}
        {children && <div className={`${prefixCls}__text`}>{children}</div>}
      </div>
    );
  }
}
