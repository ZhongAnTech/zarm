import { raf, cancelRaf } from '../../utils/raf';

let scrollLeftRafId: number;

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


export function scrollLeftTo(
  scroller: HTMLElement,
  to: number,
  duration: number,
) {
  cancelRaf(scrollLeftRafId);

  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);
  function animate() {
    scroller.scrollLeft += (to - from) / frames;
    count += 1;
    if (count < frames) {
      scrollLeftRafId = raf(animate);
    }
  }

  animate();
}
