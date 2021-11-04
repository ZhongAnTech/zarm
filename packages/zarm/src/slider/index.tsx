import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useDrag } from '@use-gesture/react';
import BaseSliderProps from './interface';
import Events from '../utils/events';
import Tooltip from '../tooltip';
import ensureValuePrecision from './utils/ensureValuePrecision';
import getValue from './utils/getValue';
import { ConfigContext } from '../n-config-provider';
import { isObject } from '../utils/validate';

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>,
    BaseSliderProps {}

const Slider = React.forwardRef<unknown, SliderProps>((props, ref) => {
  const container = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = `${globalPrefixCls}-slider`;
  const {
    className,
    disabled,
    min,
    max,
    vertical,
    showMark,
    value,
    marks,
    onChange,
    defaultValue,
    style,
  } = props;
  const [tooltip, setTooltip] = useState(false);
  const [currentValue, setCurrentValue] = React.useState(getValue(props, 0));

  const lineRef = React.useRef<HTMLDivElement>(null);

  const getMaxOffset = () => {
    const divRect = lineRef?.current?.getBoundingClientRect();
    return (vertical ? divRect?.height : divRect?.width) || 0;
  };

  const getOffsetByValue = (val: number): number => {
    const maxOffset = getMaxOffset();
    const range = max! - min!;

    return vertical ? maxOffset * ((max! - val) / range) : maxOffset * ((val - min!) / range);
  };

  const getValueByOffset = (offset: number): number => {
    const maxOffset = getMaxOffset();
    const percent = offset / maxOffset;

    const val = vertical
      ? (1 - percent) * (max! - min!) + min!
      : Math.round(min! + (max! - min!) * percent);

    return ensureValuePrecision(val, props);
  };

  const offsetStart = useRef(0);
  useEffect(() => {
    const val = getValue(
      {
        defaultValue,
        value,
      },
      0,
    );
    setCurrentValue(val);
  }, [defaultValue, value]);

  const bind = useDrag(
    (state) => {
      const [offsetX, offsetY] = [state.xy[0] - state.initial[0], state.xy[1] - state.initial[1]];

      state.event.stopPropagation();
      if (state.first) {
        offsetStart.current = getOffsetByValue(currentValue);
        setTooltip(true);
      }
      Tooltip.updateAll();
      let offset = vertical ? offsetY : offsetX;
      offset += offsetStart.current;
      const maxOffset = getMaxOffset();
      offset = Math.min(maxOffset, Math.max(offset, 0));
      setCurrentValue(getValueByOffset(offset));

      if (state.last) {
        setTooltip(false);
        if (typeof onChange === 'function') {
          onChange(currentValue);
        }
      }
    },
    {
      enabled: !props.disabled,
      axis: vertical ? 'y' : 'x',
      preventDefault: !Events.supportsPassiveEvents,
    },
  );

  const renderMark = () => {
    const isEmptyMarks = !isObject(marks) || JSON.stringify(marks) === '{}';

    if (showMark && isEmptyMarks) {
      console.error('请输入有效的 marks');
      return null;
    }
    // 判断是否为空对象
    if (isEmptyMarks) {
      return null;
    }

    const markKeys = Object.keys(marks || {});

    const lineDot = markKeys.map((item) => {
      const dotStyle = classnames(`${prefixCls}__line__dot`, {
        [`${prefixCls}__line__dot--active`]: currentValue >= +item,
      });

      const markStyle: React.CSSProperties = {
        [`${vertical ? 'bottom' : 'left'}`]: `${item}%`,
      };

      return <span key={item} className={dotStyle} style={markStyle} />;
    });

    if (!showMark) {
      return lineDot;
    }

    const marksElement = markKeys.map((item) => {
      const markStyle: React.CSSProperties = {
        [`${vertical ? 'bottom' : 'left'}`]: `${item}%`,
      };

      return (
        <span key={item} className={`${prefixCls}__mark`} style={markStyle}>
          {marks?.[+item]}
        </span>
      );
    });

    return (
      <>
        {lineDot}
        <div className={`${prefixCls}__marks`}>{marksElement}</div>
      </>
    );
  };

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--vertical`]: vertical,
    [`${prefixCls}--marked`]: showMark,
  });

  const ratio = (currentValue - min!) / (max! - min!);
  const offset = `${ratio * 100}%`;

  const handleStyle: React.CSSProperties = {
    [`${vertical ? 'bottom' : 'left'}`]: offset || 0,
  };

  const lineBg: React.CSSProperties = {
    [`${vertical ? 'height' : 'width'}`]: offset || 0,
  };

  return (
    <div className={cls} ref={container} style={style}>
      <div className={`${prefixCls}__content`}>
        <div className={`${prefixCls}__line`} ref={lineRef}>
          <div className={`${prefixCls}__line__bg`} style={lineBg} />
          {renderMark()}
        </div>
        <div
          className={`${prefixCls}__handle`}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          style={handleStyle}
          {...bind()}
        >
          <Tooltip trigger="manual" arrowPointAtCenter visible={tooltip} content={currentValue}>
            <div className={`${prefixCls}__handle__shadow`} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';
Slider.defaultProps = {
  disabled: false,
  showMark: false,
  vertical: false,
  step: 1,
  min: 0,
  max: 100,
  marks: {},
};

export default Slider;
