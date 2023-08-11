export function getTransformPropValue(v: any) {
  return {
    transform: v,
    WebkitTransform: v,
    MozTransform: v,
  };
}

export function getPxStyle(value: number | string, unit = 'px', vertical = false) {
  value = vertical ? `0px, ${value}${unit}, 0px` : `${value}${unit}, 0px, 0px`;
  return `translate3d(${value})`;
}

export function caclLineSizePos({ count, isVertical, scrollable, itemWidth = 0, value }) {
  const pos = scrollable ? value * itemWidth : 100 * value;

  const size = scrollable ? `${itemWidth}px` : `${100 / count}%`;
  const transformValue = scrollable
    ? getPxStyle(pos, 'px', isVertical)
    : getPxStyle(pos, '%', isVertical);
  const styleUl = getTransformPropValue(transformValue);
  const itemSize = isVertical ? { height: `${size}` } : { width: `${size}` };

  return {
    ...styleUl,
    ...itemSize,
  };
}
