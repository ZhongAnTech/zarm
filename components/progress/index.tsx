import React, { PureComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import PropsType, { ProgressWeight, ProgressSize } from './PropsType';

export interface ProgressProps extends PropsType {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
}

type WeightMap = {
  [weight in ProgressWeight]: number;
};

type SizeToWeight = {
  [size in ProgressSize]: ProgressWeight
};

export default class Progress extends PureComponent<ProgressProps, any> {
  static defaultProps: ProgressProps = {
    theme: 'default',
    size: 'md',
    percent: 0,
    type: 'line',
    shape: 'round',
    prefixCls: 'za-progress',
  };

  // 线条粗细表
  static weights: WeightMap = {
    bold: 10,
    normal: 8,
    thin: 4,
  };

  // 尺寸到线条粗细的映射表
  // 使用size是因为它的可描述范围更广
  // 保留weight是因为需要兼容以前的API
  static sizeToWeight: SizeToWeight = {
    lg: 'bold',
    md: 'normal',
    sm: 'thin',
  };

  private static cssVariablesPicked = false;

  // 线条的宽度，共有两处配置
  // e.g.  --progress-weight-lg && Progress.weights.bold
  // 策略就是，当有Progress在BOM中渲染了后，如果BOM中有window.getComputedStyle这个API，就会把配置从css往js里拷一遍
  // 根据奥卡姆剃刀定律，这就是最佳策略
  static syncVariablesFromStyles(): void {
    if (Progress.cssVariablesPicked) return;
    Object.keys(Progress.weights).forEach((size) => {
      const weightValue = Progress.pickVariable(`--progress-weight-${size}`);
      if (weightValue) {
        const weightName = Progress.sizeToWeight[size];
        Progress.weights[weightName] = weightValue;
      }
    });
    Progress.cssVariablesPicked = true;
  }

  static pickVariable(name: string): string {
    return window!.getComputedStyle(document!.querySelector(':root') as Element)!.getPropertyValue(name);
  }

  private progressElement;

  constructor(props) {
    super(props);
    this.state = {
      strokeWidth: this.strokeWeight,
    };
  }

  componentDidMount() {
    const { type } = this.props;
    if (type === 'circle' || type === 'semi-circle') {
      this.resetStrokeWidth();
    }
  }

  componentDidUpdate(prevProps) {
    const { weight } = this.props;
    if (prevProps.weight !== weight) {
      // preferWeight change only weight changed.
      this.resetStrokeWidth();
    }
  }

  get preferWeight() {
    const { weight, size } = this.props;
    return weight || (Progress.sizeToWeight[size || 'md'] as ProgressWeight);
  }

  // 线条宽度系数 (weight 不同 width)
  get strokeWeight() {
    return Progress.weights[this.preferWeight];
  }

  resetStrokeWidth() {
    const baseWidth = 32;
    const { clientWidth } = this.progressElement;

    this.setState({
      strokeWidth: (baseWidth / clientWidth) * this.strokeWeight,
    });
  }

  render() {
    const { theme, percent, shape, type, size, style, prefixCls, className, children } = this.props;
    const weight = this.preferWeight;
    const { strokeWidth } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${type}`]: !!type,
      [`${prefixCls}--${theme}`]: !!theme,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--${weight}`]: !!weight,
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
      : (Math.PI * diameter) / 2;

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
            strokeDashoffset={(dasharray * (100 - percent!)) / 100}
          />
        </svg>
      );

    const borderRadius = shape === 'round' ? `${this.strokeWeight}px` : '0';
    const lineThumbStyle = { width: `${percent}%`, borderRadius };

    const rectInner = (
      type === 'line'
      && (
        <div className={`${prefixCls}__track`}>
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
