import { raf, cancelRaf } from '../../utils/raf';

let scrollRafId: number;

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

export function scrollTo(
  scroller: HTMLElement,
  top: number,
  left: number,
  duration: number,
) {
  cancelRaf(scrollRafId);

  let count = 0;
  const fromLeft = scroller.scrollLeft;
  const fromTop = scroller.scrollTop;
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);
  function animate() {
    scroller.scrollLeft += (left - fromLeft) / frames;
    scroller.scrollTop += (top - fromTop) / frames;
    count += 1;
    if (count < frames) {
      scrollRafId = raf(animate);
    }
  }

  animate();
}
