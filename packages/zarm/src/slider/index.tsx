import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createBEM } from '@zarm-design/bem';
import { useDrag } from '@use-gesture/react';
import isPlainObject from 'lodash/isPlainObject';
import BaseSliderProps from './interface';
import Events from '../utils/events';
import Tooltip from '../tooltip';
import ensureValuePrecision from './utils/ensureValuePrecision';
import getValue from './utils/getValue';
import { ConfigContext } from '../n-config-provider';

export interface SliderCssVars {
  '--line-size'?: React.CSSProperties['width' | 'height'];
  '--line-border-radius'?: React.CSSProperties['borderRadius'];
  '--line-background'?: React.CSSProperties['background'];
  '--line-active-background'?: React.CSSProperties['background'];
  '--dot-size'?: React.CSSProperties['width' | 'height'];
  '--dot-background'?: React.CSSProperties['background'];
  '--dot-border-color'?: React.CSSProperties['borderColor'];
  '--dot-border-width'?: React.CSSProperties['borderWidth'];
  '--dot-active-border-color'?: React.CSSProperties['borderColor'];
  '--knob-size'?: React.CSSProperties['width' | 'height'];
  '--knob-size-small'?: React.CSSProperties['width' | 'height'];
  '--knob-background'?: React.CSSProperties['background'];
  '--knob-box-shadow'?: React.CSSProperties['boxShadow'];
  '--mark-font-size'?: React.CSSProperties['fontSize'];
  '--mark-text-color'?: React.CSSProperties['color'];
  '--mark-spacing'?: React.CSSProperties['left' | 'top'];
}

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>,
    BaseSliderProps {}

const Slider = React.forwardRef<unknown, SliderProps>((props, ref) => {
  const container = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('slider', { prefixCls });

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
    onSlideChange,
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

  const trackClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (disabled) return;
      const line = lineRef.current;
      if (!line) return;
      const { left, top } = line.getBoundingClientRect();
      const offset = vertical ? event.clientY - top : event.clientX - left;
      let current = getValueByOffset(offset);
      current = Math.min(max!, Math.max(min!, current));
      setCurrentValue(current);
      if (typeof onChange === 'function') {
        onChange(current);
      }
    },
    [onChange, max, min],
  );

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
      const current = getValueByOffset(offset);
      setCurrentValue(current);
      if (typeof onSlideChange === 'function' && state.dragging && !state.first) {
        onSlideChange(current);
      }
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
    const isEmptyMarks = !isPlainObject(marks) || JSON.stringify(marks) === '{}';

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
      const dotStyle = bem('dot', [
        {
          active: currentValue >= +item,
        },
      ]);

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
        <span key={item} className={bem('mark')} style={markStyle}>
          {marks?.[+item]}
        </span>
      );
    });

    return (
      <>
        {lineDot}
        <div className={bem('marks')}>{marksElement}</div>
      </>
    );
  };

  const cls = bem([
    className,
    {
      disabled,
      vertical,
      marked: showMark,
    },
  ]);

  const ratio = (currentValue - min!) / (max! - min!);
  const offset = `${ratio * 100}%`;

  const knobStyle: React.CSSProperties = {
    [`${vertical ? 'bottom' : 'left'}`]: offset || 0,
  };

  const lineBg: React.CSSProperties = {
    [`${vertical ? 'height' : 'width'}`]: offset || 0,
  };

  return (
    <div className={cls} ref={container} style={style}>
      <div className={bem('content')}>
        <div className={bem('line')} ref={lineRef} onClick={trackClick}>
          <div className={bem('line__bg')} style={lineBg} />
          {renderMark()}
        </div>
        <div
          className={bem('knob')}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          style={knobStyle}
          {...bind()}
        >
          <Tooltip trigger="manual" arrowPointAtCenter visible={tooltip} content={currentValue}>
            <div className={bem('knob__shadow')} />
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
