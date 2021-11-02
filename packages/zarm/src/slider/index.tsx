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
  const lineRef = React.createRef<HTMLDivElement>();

  const getMaxOffset = useCallback(() => {
    const divRect = lineRef?.current?.getBoundingClientRect();
    return (vertical ? divRect?.height : divRect?.width) || 0;
  }, [vertical, lineRef]);

  const getOffsetByValue = useCallback(
    (val: number): number => {
      const maxOffset = getMaxOffset();
      const range = max - min;

      return vertical ? maxOffset * ((max - val) / range) : maxOffset * ((val - min) / range);
    },
    [getMaxOffset, max, min, vertical],
  );

  const getValueByOffset = (offset: number): number => {
    const maxOffset = getMaxOffset();
    const percent = offset / maxOffset;

    const val = vertical
      ? (1 - percent) * (max - min) + min
      : Math.round(min + (max - min) * percent);

    return ensureValuePrecision(val, props);
  };

  const offsetStart = useRef(0);

  const val = getValue(props, 0);
  // offsetStart.current = getOffsetByValue(val);
  // console.log(offsetStart)
  // useEffect(() => {
  //   setCurrentValue(val);
  // }, [props, val]);

  const init = useCallback(() => {
    offsetStart.current = getOffsetByValue(val);
  }, []);

  useEffect(() => {
    Events.on(window, 'resize', init);
    return () => {
      Events.off(window, 'resize', init);
    };
  }, [init]);

  useEffect(() => {
    init();
  }, []);

  const bind = useDrag(
    (state) => {
      //  console.log(offsetStart);
      // state.event.stopPropagation();
      const [offsetX, offsetY] = state.distance;
      // console.error(state)

      if (state.dragging) {
        // if(state.first) {
        //   console.log('fffff')
        //   setTooltip(true);
        // }
        // Tooltip.updateAll()
        let offset = vertical
          ? offsetStart.current + (offsetY || 0)
          : offsetStart.current + (offsetX || 0);

        // console.log(offset)

        const maxOffset = getMaxOffset();
        offset = Math.min(maxOffset, Math.max(offset, 0));

        // if (offset < 0) {
        //   offset = 0;
        //   const newValue = getValueByOffset(offset);
        //   setCurrentValue(newValue);
        //   // return false;
        // }

        // const maxOffset = getMaxOffset();
        // if (offset > maxOffset) {
        //   offset = maxOffset;
        //   const newValue = getValueByOffset(offset);
        //   setCurrentValue(newValue);
        //   // return false;
        // }
        // console.log(getValueByOffset(offset), offset);

        console.error(getValueByOffset(offset), offset);
        setCurrentValue(getValueByOffset(offset));
      } else {
        /// console.log('fffffff')
        // setTooltip(false);
        const offsetVal = vertical ? offsetY : offsetX;
        // // console.log(offsetVal, '------------------------------>')
        offsetStart.current += offsetVal;

        // if (typeof onChange === 'function') {
        //   onChange(currentValue);
        // }
      }
    },
    {
      enabled: !props.disabled,
      axis: vertical ? 'y' : 'x',
      // preventDefault: !Events.supportsPassiveEvents,
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

  // console.error(currentValue, '-------------------->')
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
