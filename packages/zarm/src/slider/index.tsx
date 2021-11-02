import React, { useState, useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { useDrag } from '@use-gesture/react';
import BaseSliderProps from './interface';
import Events from '../utils/events';
import Tooltip from '../tooltip';
import ensureValuePrecision from './utils/ensureValuePrecision';
import getValue from './utils/getValue';
import { ConfigContext } from '../n-config-provider';
import preventDefault from './utils/preventDefault';

import { isObject } from '../utils/validate';
import { start } from 'repl';

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
    min = 0,
    max = 100,
    vertical,
    showMark,
    value,
    marks,
    onChange,
    style,
  } = props;
  const [tooltip, setTooltip] = useState(false);
  const [currentValue, setCurrentValue] = React.useState(getValue(props, 0));

  const prevValue = useRef(currentValue);

  const lineRef = React.useRef<HTMLDivElement>(null);

  const getMaxOffset = () => {
    const divRect = lineRef?.current?.getBoundingClientRect();
    return (vertical ? divRect?.height : divRect?.width) || 0;
  };

  const getOffsetByValue = (val: number): number => {
    const maxOffset = getMaxOffset();
    const range = max - min;

    return vertical ? maxOffset * ((max - val) / range) : maxOffset * ((val - min) / range);
  };

  const getValueByOffset = (offset: number): number => {
    const maxOffset = getMaxOffset();
    const percent = offset / maxOffset;

    const val = vertical
      ? (1 - percent) * (max - min) + min
      : Math.round(min + (max - min) * percent);

    return ensureValuePrecision(val, props);
  };

  const offsetStart = useRef(0);

  // offsetStart.current = getOffsetByValue(val);
  // console.log(offsetStart)
  useEffect(() => {
    const val = getValue(
      {
        defaultValue: props.defaultValue,
        value: props.value,
      },
      0,
    );
    setCurrentValue(val);
  }, [props.defaultValue, props.value]);

  // const init = useCallback(() => {
  //   offsetStart.current = getOffsetByValue(val);
  // }, []);

  // useEffect(() => {
  //   Events.on(window, 'resize', init);
  //   return () => {
  //     Events.off(window, 'resize', init);
  //   };
  // }, [init]);

  const bind = useDrag(
    (state) => {
      if (state.first) {
        offsetStart.current = getOffsetByValue(currentValue);
      }
      const [offsetX, offsetY] = state.offset;

      console.error(state.offset[0]);

      state.event.stopPropagation();
      // if(state.first) {
      //   console.log('fffff')
      //   setTooltip(true);
      // }
      // Tooltip.updateAll()
      let offset = vertical ? offsetY : offsetX;
      offset = offsetStart.current + offset;
      // console.log(offset)

      const maxOffset = getMaxOffset();
      console.log(lineRef.current);
      offset = Math.min(maxOffset, Math.max(offset, 0));

      // console.log(prevValue.current, '---------------------->')
      // console.error(getValueByOffset(offset));
      console.log(offset, 'offset');
      setCurrentValue(getValueByOffset(offset));

      if (state.last) {
        if (typeof onChange === 'function') {
          console.warn(currentValue);
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
        [`${prefixCls}__line__dot--active`]: Number(value) >= +item,
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

  const ratio = (currentValue - min) / (max - min);
  const offset = `${ratio * 100}%`;

  const handleStyle: React.CSSProperties = {
    [`${vertical ? 'bottom' : 'left'}`]: offset || 0,
  };

  const lineBg: React.CSSProperties = {
    [`${vertical ? 'height' : 'width'}`]: offset || 0,
  };

  // const containerRef = useRef<HTMLDivElement | null>();
  // const handleRef = (divRef: HTMLDivElement) => {
  //   container.current = divRef;
  //   const nextContainer = divRef;
  //   const prevContainer = containerRef;

  //   if (prevContainer.current !== nextContainer) {
  //     if (prevContainer.current) {
  //       prevContainer?.current?.removeEventListener('touchstart', preventDefault);
  //     }
  //     if (nextContainer) {
  //       nextContainer.addEventListener('touchstart', preventDefault, { passive: false });
  //     }
  //   }
  //   containerRef.current = nextContainer;
  // };

  return (
    <div className={cls} ref={container} style={style}>
      <div className={`${prefixCls}__content`}>
        <div className={`${prefixCls}__line`} ref={lineRef}>
          <div className={`${prefixCls}__line__bg`} style={lineBg} />

          {renderMark()}
        </div>

        {/* <Drag onDragStart={onDragStart} onDragMove={onDragMove} onDragEnd={onDragEnd}> */}
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
          {/* <Tooltip trigger="manual" arrowPointAtCenter visible={tooltip} content={currentValue}>
              <div className={`${prefixCls}__handle__shadow`} />
            </Tooltip> */}
        </div>
        {/* </Drag> */}
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
