import PropsType from './PropsType';

import { DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN } from './constants';

const getHorizontal = (distance: number, key: string) => {
  return `@-webkit-keyframes ${key} {
      100% {
        -webkit-transform: translate3d(${distance}px, 0, 0);
        transform: translate3d(${distance}px, 0, 0);
      }
    }
    @keyframes ${key} {
      100% {
        -webkit-transform: translate3d(${distance}px, 0, 0);
        transform: translate3d(${distance}px, 0, 0);
      }
    }`;
};

const getVertical = (distance: number, key: string) => {
  return `@-webkit-keyframes ${key} {
    100% {
      -webkit-transform: translate3d(0, ${distance}px, 0);
      transform: translate3d(0, ${distance}px, 0);
    }
  }
  @keyframes ${key} {
    100% {
      -webkit-transform: translate3d(0, ${distance}px, 0);
      transform: translate3d(0, ${distance}px, 0);
    }
  }`;
};

const directionLeft = (distance: number, key: string) => {
  return getHorizontal(-distance, key);
};

const directionRight = (distance: number, key: string) => {
  return getHorizontal(distance, key);
};

const directionUp = (distance: number, key: string) => {
  return getVertical(-distance, key);
};

const directionDown = (distance: number, key: string) => {
  return getVertical(distance, key);
};

const animationModifier = (duration: number, loop: boolean, delay: number, key: string) => {
  const infinite = loop ? 'infinite' : 1;
  return `${duration}ms ${key} ${delay}ms linear ${infinite}`;
};

const getKeyFrameModifier = (direction: PropsType['direction']) => {
  const dir = direction.toLowerCase();
  switch (dir) {
    case DIRECTION_LEFT:
      return directionLeft;
    case DIRECTION_RIGHT:
      return directionRight;
    case DIRECTION_UP:
      return directionUp;
    case DIRECTION_DOWN:
      return directionDown;
    default:
      return directionLeft;
  }
};

export { getKeyFrameModifier, animationModifier };
