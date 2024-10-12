import { createBEM } from '@zarm-design/bem';
import { useControllableValue, useUnmountedRef } from 'ahooks';
import {} from 'keen-slider';
import { TrackDetails, useKeenSlider } from 'keen-slider/react';
import isEqual from 'lodash/isEqual';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { resolvedFieldNames } from '../picker-view/utils';
import { toArray } from '../utils';
import { HTMLProps } from '../utils/utilityTypes';
import { BaseWheelProps } from './interface';

export interface WheelCssVars {
  '--text-color': React.CSSProperties['color'];
  '--disabled-text-color': React.CSSProperties['color'];
  '--item-height': React.CSSProperties['height'];
  '--item-rows': number;
  '--item-font-size': React.CSSProperties['fontSize'];
}

export type WheelProps = BaseWheelProps & HTMLProps<WheelCssVars>;

const Wheel: React.FC<WheelProps> = (props) => {
  const { className, defaultValue, dataSource, loop, disabled, itemRender } = props;
  const [value, setValue] = useControllableValue(props, {
    defaultValue,
  });

  const fieldNames = resolvedFieldNames(props.fieldNames);
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('wheel', { prefixCls });
  const unmounted = useUnmountedRef();

  const initial = React.useMemo(() => {
    return dataSource.findIndex((item) => item[fieldNames.value] === value);
  }, []);

  const itemSize = 15;
  const degree = 360 / itemSize;
  const perView = loop ? 9 : 1;
  const size = React.useRef(0);
  const [radius, setRadius] = React.useState(0);
  const [sliderState, setSliderState] = React.useState<TrackDetails>(null);
  const [sliderRef, slider] = useKeenSlider({
    initial,
    selector: `${bem('item')}`,
    mode: 'free-snap',
    vertical: true,
    rubberband: !loop,
    loop,
    slides: {
      number: dataSource.length,
      origin: loop ? 'center' : 'auto',
      perView,
    },
    dragSpeed: (val) => {
      const height = size.current;
      return val * (height / ((height / 2) * Math.tan(degree * (Math.PI / 180))) / perView);
    },
    created: (s) => {
      size.current = s.size;
    },
    updated: (s) => {
      size.current = s.size;
    },
    detailsChanged: (s) => {
      if (unmounted.current) return;
      if (isEqual(sliderState, s.track.details)) return;

      setSliderState(s.track.details);
      setValue?.(dataSource?.[s.track.details.rel]?.value);
    },
  });

  React.useEffect(() => {
    if (slider.current) setRadius(slider.current.size / 2);
  }, [slider]);

  const items = React.useMemo(() => {
    if (!sliderState) return [];
    return toArray(sliderState.slides).map((state, index) => {
      const offset = loop ? 1 / 2 - 1 / perView / 2 : 0;
      const distance = sliderState ? (state.distance - offset) * perView : 0;

      const rotate = Math.abs(distance) > itemSize / 2 ? 180 : distance * (360 / itemSize) * -1;
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };

      return { style, option: dataSource[index] };
    });
  }, [dataSource, sliderState]);

  return (
    <div ref={sliderRef} className={bem([className])}>
      <div className={bem('top')} />
      <div className={bem('content')}>
        <div className={bem('items')}>
          {items.map((item, index) => (
            <div
              key={+index}
              onClick={() => {
                slider.current.moveToIdx(index);
              }}
              className={bem('item', [
                {
                  selected: value === item[fieldNames.value!],
                  disabled,
                },
              ])}
              style={item.style}
            >
              {itemRender?.(item.option) || item.option?.[fieldNames.label]}
            </div>
          ))}
        </div>
      </div>
      <div className={bem('bottom')} />
    </div>
  );
};

export default Wheel;
