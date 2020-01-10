import React, { CSSProperties, PureComponent } from 'react';
import classnames from 'classnames';
import ProgressProps, { KnownSize } from './PropsType';

type WeightMap = {
  [weight in KnownSize]: number;
};

export default class Progress extends PureComponent<ProgressProps, any> {
  static defaultProps: ProgressProps = {
    prefixCls: 'za-progress',
    theme: 'primary',
    shape: 'line',
    size: 'md',
    percent: 0,
    strokeShape: 'round',
    text: (percent) => `${percent}%`,
  };

  // 线条粗细表
  static strokeWeights: WeightMap = {
    lg: 10,
    md: 8,
    sm: 4,
  };

  private progressElement;

  constructor(props) {
    super(props);
    this.state = {
      svgStrokeWidth: this.strokeWidth,
    };
  }

  componentDidMount() {
    if (this.useSVG) {
      this.resetSVGStrokeWidth();
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (prevProps.strokeWidth !== props.strokeWidth) {
      this.resetSVGStrokeWidth();
    }
  }

  get useSVG() {
    const { props } = this;
    return props.shape === 'semi-circle' || props.shape === 'circle';
  }

  get strokeWidth() {
    const { strokeWidth, size } = this.props;
    const { strokeWeights } = Progress;
    const backup = strokeWeights[(size && (size in strokeWeights)) ? size : 'md'];
    return Math.max(1, strokeWidth || backup);
  }

  resetSVGStrokeWidth() {
    const baseWidth = 32;
    const { clientWidth } = this.progressElement;

    this.setState({
      svgStrokeWidth: (baseWidth / clientWidth) * this.strokeWidth,
    });
  }

  render() {
    const { theme, percent, strokeShape, shape, size, style, prefixCls, className, children, text: format } = this.props;
    const { state } = this;
    const strokeWidth = this.useSVG ? state.svgStrokeWidth : this.strokeWidth;
    const hasKnownSize = size && (size in Progress.strokeWeights);

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--${theme}`]: !!theme,
      [`${prefixCls}--${size}`]: hasKnownSize,
    });

    const sizeStyle: CSSProperties = {};
    if (!hasKnownSize) {
      sizeStyle.width = size;
      if (shape === 'circle') {
        sizeStyle.height = size;
      }
      if (shape === 'semi-circle') {
        if (typeof size === 'number') {
          sizeStyle.height = `${size / 2}px`;
        } else if (typeof size === 'string') {
          sizeStyle.height = size.replace(/^(\d+)(.+)$/, (...$) => parseFloat($[1]) / 2 + $[2]);
        }
      }
    }

    const diameter = 32;
    const radius = diameter / 2;
    const extendRadius = radius + strokeWidth / 2;
    const strokeLinecap = strokeShape === 'round' ? 'round' : 'butt';

    const viewBox = shape === 'circle'
      ? `0 0 ${diameter + strokeWidth} ${diameter + strokeWidth}`
      : `0 0 ${diameter + strokeWidth} ${(diameter + strokeWidth) / 2}`;

    const path = shape === 'circle'
      ? `
        M${extendRadius}, ${extendRadius}
        m0 ${-radius}
        a${radius} ${radius} 0 1 1 0 ${diameter}
        a${radius} ${radius} 0 1 1 0 ${-diameter}`
      : `
        M${extendRadius}, ${extendRadius}
        m${-radius} 0
        a${radius} ${radius} 0 0 1 ${diameter} 0`;

    const dasharray = shape === 'circle'
      ? Math.PI * diameter
      : (Math.PI * diameter) / 2;

    const borderRadius = strokeShape === 'round' ? `${this.strokeWidth}px` : '0';
    const lineTrackStyle = { height: `${strokeWidth}`, borderRadius };
    const lineThumbStyle = { width: `${percent}%`, height: `${strokeWidth}px`, borderRadius };
    const formattedPercent = format ? format(percent || 0) : null;
    const hasIndicator = children || formattedPercent;

    const roundInner = (shape === 'circle' || shape === 'semi-circle') && (
      <>
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
            strokeDashoffset={(dasharray * (100 - percent!)) / 100}
          />
        </svg>
        {hasIndicator && <div className={`${prefixCls}__text`}>{children || formattedPercent}</div>}
      </>
    );

    const rectInner = (
      shape === 'line'
      && (
        <div className={`${prefixCls}__outer`}>
          <div className={`${prefixCls}__track`} style={lineTrackStyle}>
            <div className={`${prefixCls}__thumb`} style={lineThumbStyle} />
          </div>
          {hasIndicator && <div className={`${prefixCls}__text`}>{children || formattedPercent}</div>}
        </div>
      )
    );

    return (
      <div
        className={cls}
        style={{ ...sizeStyle, ...style }}
        ref={(ele) => { this.progressElement = ele; }}
      >
        {shape === 'line' ? rectInner : roundInner}
      </div>
    );
  }
}
