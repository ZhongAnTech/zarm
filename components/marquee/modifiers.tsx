import { DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN } from './constants';

const getHorizontal = (distance, key) => {
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

const getVertical = (distance, key) => {
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

const directionLeft = (distance, key) => {
  return getHorizontal(-distance, key);
};

const directionRight = (distance, key) => {
  return getHorizontal(distance, key);
};

const directionUp = (distance, key) => {
  return getVertical(-distance, key);
};

const directionDown = (distance, key) => {
  return getVertical(distance, key);
};

const animationModifier = (duration, loop, delay, key) => {
  const infinite = loop ? 'infinite' : 1;
  return `${duration}ms ${key} ${delay}ms linear ${infinite}`;
};

const getKeyFrameModifier = (direction) => {
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
